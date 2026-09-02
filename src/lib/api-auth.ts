import { db } from "@/db";
import { apiKey } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

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
  
  // Hash the incoming token
  const keyHash = crypto.createHash("sha256").update(token).digest("hex");

  // Query DB
  const [keyRecord] = await db.select().from(apiKey).where(eq(apiKey.keyHash, keyHash)).limit(1);

  if (!keyRecord || keyRecord.isRevoked) {
    return NextResponse.json({ error: "Invalid or revoked API key" }, { status: 401 });
  }

  // Update last used at in background (not awaiting to avoid slowing down generation)
  db.update(apiKey).set({ lastUsedAt: new Date() }).where(eq(apiKey.id, keyRecord.id)).execute().catch(() => {});

  return null; // Valid
}
