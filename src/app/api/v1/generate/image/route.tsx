import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { ImageResponse } from "@vercel/og";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";
import { VotesphereContestantFlyer } from "@/templates/image/VotesphereContestantFlyer";
import { validateApiKey } from "@/lib/api-auth";

export const runtime = 'edge';

// Memory cache for Edge runtime to avoid fetching fonts repeatedly
let cachedFontBold: ArrayBuffer | null = null;
let cachedFontRegular: ArrayBuffer | null = null;

export async function POST(req: NextRequest) {
  try {
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

    // Load fonts (Edge compatible)
    if (!cachedFontBold || !cachedFontRegular) {
      const origin = req.nextUrl.origin;
      const [boldRes, regularRes] = await Promise.all([
        fetch(`${origin}/fonts/Montserrat-Bold.ttf`),
        fetch(`${origin}/fonts/Montserrat-Regular.ttf`)
      ]);
      
      if (boldRes.ok && regularRes.ok) {
        cachedFontBold = await boldRes.arrayBuffer();
        cachedFontRegular = await regularRes.arrayBuffer();
      } else {
        // Fallback to github if local fetch fails for any reason
        cachedFontBold = await fetch(new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")).then(res => res.arrayBuffer());
        cachedFontRegular = cachedFontBold;
      }
    }

    return new ImageResponse(element, {
      width,
      height,
      fonts: [
        {
          name: "Inter",
          data: cachedFontBold!,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: cachedFontRegular!,
          weight: 400,
          style: "normal",
        },
      ],
    });

  } catch (error: unknown) {
    console.error("Image Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
