"use server";

import { db } from "@/db";
import { apiKey } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export async function createApiKey(name: string) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const rawKey = `af_${uuidv4().replace(/-/g, "")}`;
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  await db.insert(apiKey).values({
    id: uuidv4(),
    userId: session.user.id,
    keyHash,
    name,
  });

  return rawKey; // Return the raw key once so the user can copy it
}

export async function getApiKeys() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const keys = await db.select({
    id: apiKey.id,
    name: apiKey.name,
    createdAt: apiKey.createdAt,
    lastUsedAt: apiKey.lastUsedAt,
  }).from(apiKey).where(eq(apiKey.userId, session.user.id));

  return keys;
}

export async function revokeApiKey(id: string) {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await db.delete(apiKey).where(eq(apiKey.id, id));
}
