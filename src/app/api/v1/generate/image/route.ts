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
      return NextResponse.json({ error: "Invalid payload", details: result.error.errors }, { status: 400 });
    }

    const { branding, data } = result.data;

    // TODO: Dynamic template selection based on template_id
    const element = SocialFlyer({ data, branding });

    // Load a font (we'd dynamically load this from Google Fonts in a real scenario)
    // For now, we'll try to use a local or fallback font
    // In Satori, you MUST provide at least one font.
    // Since we don't have a local font file yet, we will fetch one from a public URL.
    const fontData = await fetch(
      new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")
    ).then((res) => res.arrayBuffer());

    // 1. Render React to SVG
    const svg = await satori(element, {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: "Roboto",
          data: fontData,
          weight: 400,
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
    return new NextResponse(pngBuffer, {
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
