import { NextResponse } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { SocialFlyer } from "@/templates/image/SocialFlyer";



export async function POST(req: Request) {
  try {
    const json = await req.json();
    
    // Strict Payload Validation
    const result = generatePayloadSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid payload", details: result.error.issues }, { status: 400 });
    }

    const { branding, data } = result.data;

    // TODO: Dynamic template selection based on template_id
    // eslint-disable-next-line react-hooks/error-boundaries
    const element = <SocialFlyer data={data} branding={branding} />;

    const fs = require('fs');
    const path = require('path');
    
    const fontPath = path.join(process.cwd(), 'public/fonts/Montserrat-Bold.ttf');
    let fontData;
    try {
      fontData = fs.readFileSync(fontPath);
    } catch (e) {
      // Fallback if file isn't available
      fontData = await fetch(
        new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")
      ).then((res) => res.arrayBuffer());
    }

    // 1. Render React to SVG
    const svg = await satori(element, {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: "Inter", // mapping to Inter for the font-family in template
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    });

    // 2. Render SVG to PNG
    const resvg = new Resvg(svg, {
      background: branding?.background_color || "#111827",
      fitTo: { mode: "width", value: 1080 },
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
