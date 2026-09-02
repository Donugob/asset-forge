import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";
import { VotesphereContestantFlyer } from "@/templates/image/VotesphereContestantFlyer";
import { validateApiKey } from "@/lib/api-auth";

import fs from 'fs';
import path from 'path';

// Module-level cache to ensure fonts are loaded into memory exactly ONCE per serverless lambda instance.
// This completely eliminates disk I/O and network requests on subsequent generations, reducing latency to ~0ms.
let cachedFontBold: Buffer | ArrayBuffer | null = null;
let cachedFontRegular: Buffer | ArrayBuffer | null = null;

async function loadFonts() {
  if (cachedFontBold && cachedFontRegular) {
    return { fontDataBold: cachedFontBold, fontDataRegular: cachedFontRegular };
  }

  const fontPathBold = path.join(process.cwd(), 'public/fonts/Montserrat-Bold.ttf');
  const fontPathRegular = path.join(process.cwd(), 'public/fonts/Montserrat-Regular.ttf');
  
  try {
    cachedFontBold = fs.readFileSync(fontPathBold);
    cachedFontRegular = fs.readFileSync(fontPathRegular);
  } catch (e) {
    console.warn("Local fonts not found, falling back to GitHub fetch (this will be slow!).");
    cachedFontBold = await fetch(
      new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")
    ).then((res) => res.arrayBuffer());
    cachedFontRegular = cachedFontBold;
  }

  return { fontDataBold: cachedFontBold, fontDataRegular: cachedFontRegular };
}

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
      width = 1080;
      height = 1080;
    } else if (template_id === "votesphere_contestant") {
      element = <VotesphereContestantFlyer data={data} branding={branding} />;
      width = 1080;
      height = 1080;
    } else {
      element = <SocialFlyer data={data} branding={branding} />;
      width = 1080;
      height = 1080;
    }

    // Load fonts (sub-millisecond if cached)
    const { fontDataBold, fontDataRegular } = await loadFonts();

    // 1. Render React to SVG
    const svg = await satori(element, {
      width,
      height,
            fonts: [
        {
          name: "Inter",
          data: fontDataBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontDataRegular,
          weight: 400,
          style: "normal",
        },
      ],
    });

    // 2. Render SVG to PNG
    const resvg = new Resvg(svg, {
      background: branding?.background_color || "#111827",
      fitTo: { mode: "width", value: width },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // 3. Return the raw image buffer
    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });

  } catch (error: unknown) {
    console.error("Image Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({ error: errorMessage, stack: errorStack }, { status: 500 });
  }
}
