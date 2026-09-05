import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { ImageResponse } from "@vercel/og";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";
import { VotesphereContestantFlyer } from "@/templates/image/VotesphereContestantFlyer";
import { validateApiKey } from "@/lib/api-auth";

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const authError = await validateApiKey(req);
    if (authError) return authError;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
