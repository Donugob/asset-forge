import { NextResponse } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";



export async function POST(req: Request) {
  try {
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
      element = <VerticalPitchFlyer data={data} branding={branding} />;
      width = 1080;
      height = 1080;
    } else {
      element = <SocialFlyer data={data} branding={branding} />;
      width = 1080;
      height = 1080;
    }

    const fs = require('fs');
    const path = require('path');
    
        const fontPathBold = path.join(process.cwd(), 'public/fonts/Montserrat-Bold.ttf');
    const fontPathRegular = path.join(process.cwd(), 'public/fonts/Montserrat-Regular.ttf');
    let fontDataBold, fontDataRegular;
    try {
      fontDataBold = fs.readFileSync(fontPathBold);
      fontDataRegular = fs.readFileSync(fontPathRegular);
    } catch (e) {
      fontDataBold = await fetch(
        new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")
      ).then((res) => res.arrayBuffer());
      fontDataRegular = fontDataBold;
    }

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
