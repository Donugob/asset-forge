import { db } from "@/db";
import { apiKey } from "@/db/schema";
import { eq } from "drizzle-orm";

import { NextRequest, NextResponse } from "next/server";

// In-memory cache for Edge and Node runtimes
const keyCache = new Map<string, { expiresAt: number, record: any }>();
const CACHE_TTL_MS = 60000; // 60 seconds

export async function validateApiKey(req: NextRequest) {
  // Allow unauthenticated requests from the Playground UI
  const referer = req.headers.get("referer") || "";
  const origin = req.headers.get("origin") || "";
  
  const isPlaygroundRequest = 
    referer.includes("localhost:3000") || 
    origin.includes("localhost:3000") ||
    referer.includes("assetforge.votesphere.com.ng") ||
    origin.includes("assetforge.votesphere.com.ng");

  if (isPlaygroundRequest) {
    return null; // Bypass authentication for the public playground
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  
  // Hash the incoming token using Web Crypto API for Edge compatibility
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Check in-memory cache first
  const cached = keyCache.get(keyHash);
  if (cached && cached.expiresAt > Date.now()) {
    if (cached.record.isRevoked) {
      return NextResponse.json({ error: "Invalid or revoked API key" }, { status: 401 });
    }
    return null; // Valid from cache
  }

  // Query DB
  const [keyRecord] = await db.select().from(apiKey).where(eq(apiKey.keyHash, keyHash)).limit(1);

  if (!keyRecord || keyRecord.isRevoked) {
    // Cache the rejection too so we don't get spammed by invalid keys
    keyCache.set(keyHash, { expiresAt: Date.now() + CACHE_TTL_MS, record: { isRevoked: true } });
    return NextResponse.json({ error: "Invalid or revoked API key" }, { status: 401 });
  }

  // Cache the valid key
  keyCache.set(keyHash, { expiresAt: Date.now() + CACHE_TTL_MS, record: keyRecord });

  // Update last used at in background (not awaiting to avoid slowing down generation)
  // Note: Edge runtime might kill background promises, but this is a best-effort metric.
  db.update(apiKey).set({ lastUsedAt: new Date() }).where(eq(apiKey.id, keyRecord.id)).execute().catch(() => {});

  return null; // Valid
}
