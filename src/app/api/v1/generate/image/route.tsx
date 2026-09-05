import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { ImageResponse } from "@vercel/og";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";
import { VotesphereContestantFlyer } from "@/templates/image/VotesphereContestantFlyer";
import { validateApiKey } from "@/lib/api-auth";

export const runtime = 'edge';
export const preferredRegion = 'cle1'; // Cleveland (closest to Neon us-east-2 DB)

// Vercel Edge automatically bundles these local assets via Webpack when using import.meta.url
// We start the fetch globally so it happens during cold boot and is instantly available to the handler
const fontBoldPromise = fetch(new URL('../../../../../../public/fonts/Montserrat-Bold.ttf', import.meta.url)).then(res => res.arrayBuffer()).catch(() => null);
const fontRegularPromise = fetch(new URL('../../../../../../public/fonts/Montserrat-Regular.ttf', import.meta.url)).then(res => res.arrayBuffer()).catch(() => null);

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

    // Await the globally bundled fonts (resolves instantly if already fetched during worker boot)
    let cachedFontBold = await fontBoldPromise;
    let cachedFontRegular = await fontRegularPromise;

    if (!cachedFontBold || !cachedFontRegular) {
        // Absolute fallback (almost never hit)
        cachedFontBold = await fetch(new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")).then(res => res.arrayBuffer());
        cachedFontRegular = cachedFontBold;
    }

    const imageResponse = new ImageResponse(element, {
      width,
      height,
      fonts: [
        { name: "Inter", data: cachedFontBold!, weight: 700, style: "normal" },
        { name: "Inter", data: cachedFontRegular!, weight: 400, style: "normal" },
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
