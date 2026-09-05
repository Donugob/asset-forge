import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { ImageResponse } from "@vercel/og";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";
import { VotesphereContestantFlyer } from "@/templates/image/VotesphereContestantFlyer";
import { validateApiKey } from "@/lib/api-auth";
import { montserratBoldBase64, montserratRegularBase64 } from "@/lib/fonts";
import { Buffer } from "node:buffer";

export const runtime = 'edge';

// Convert base64 to precise ArrayBuffer safely
function getFontBuffer(base64: string): ArrayBuffer {
  const buf = Buffer.from(base64, 'base64');
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

// Statically instantiated outside request handler (happens during cold boot initialization)
const fontBold = getFontBuffer(montserratBoldBase64);
const fontRegular = getFontBuffer(montserratRegularBase64);

export async function POST(req: NextRequest) {
  try {
    // Note: Database API key validation can take 3-5 seconds if Neon PostgreSQL is sleeping (cold start).
    const authError = await validateApiKey(req);
    if (authError) return authError;

    const json = await req.json();
    
    // Strict Payload Validation
    const result = generatePayloadSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid payload", details: result.error.issues }, { status: 400 });
    }

    const { template_id, branding, data } = result.data;

    let element;
    let width = 1080;
    let height = 1080;

    if (template_id === "vertical_pitch") {
      element = <SquarePitchFlyer data={data} branding={branding} />;
    } else if (template_id === "votesphere_contestant") {
      element = <VotesphereContestantFlyer data={data} branding={branding} />;
    } else {
      element = <SocialFlyer data={data} branding={branding} />;
    }

    const imageResponse = new ImageResponse(element, {
      width,
      height,
      fonts: [
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
      ],
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    });

    return imageResponse;

  } catch (error: unknown) {
    console.error("Image Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
