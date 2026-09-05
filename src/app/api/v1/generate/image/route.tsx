import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { ImageResponse } from "@vercel/og";
import { SocialFlyer } from "@/templates/image/SocialFlyer";
import { SquarePitchFlyer } from "@/templates/image/SquarePitchFlyer";
import { VotesphereContestantFlyer } from "@/templates/image/VotesphereContestantFlyer";
import { validateApiKey } from "@/lib/api-auth";
import { after } from "next/server";
import { db } from "@/db";
import { generatedAsset } from "@/db/schema";
import { eq } from "drizzle-orm";
import { uploadToImageKit } from "@/lib/imagekit";

export const runtime = 'edge';

// Memory cache for Edge runtime to avoid fetching fonts repeatedly
let cachedFontBold: ArrayBuffer | null = null;
let cachedFontRegular: ArrayBuffer | null = null;

async function hashPayload(payload: any) {
  const sortKeys = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(sortKeys);
    return Object.keys(obj).sort().reduce((acc: any, key) => {
      acc[key] = sortKeys(obj[key]);
      return acc;
    }, {});
  };

  const str = JSON.stringify(sortKeys(payload));
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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

    // 1. Hash the deterministic payload
    const payloadHash = await hashPayload({ template_id, branding, data });

    // 2. Check Database for Cache Hit
    const [cached] = await db.select().from(generatedAsset).where(eq(generatedAsset.payloadHash, payloadHash)).limit(1);
    if (cached) {
      return NextResponse.redirect(cached.cdnUrl, 302);
    }

    // 3. Cache Miss - Generate Image
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
        cachedFontBold = await fetch(new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")).then(res => res.arrayBuffer());
        cachedFontRegular = cachedFontBold;
      }
    }

    const imageResponse = new ImageResponse(element, {
      width,
      height,
      fonts: [
        { name: "Inter", data: cachedFontBold!, weight: 700, style: "normal" },
        { name: "Inter", data: cachedFontRegular!, weight: 400, style: "normal" },
      ],
    });

    // 4. Asynchronously upload to ImageKit and save to DB
    after(async () => {
      try {
        const clone = imageResponse.clone();
        const buffer = await clone.arrayBuffer();
        const fileName = `asset_${payloadHash}.png`;
        const cdnUrl = await uploadToImageKit(buffer, fileName);
        
        await db.insert(generatedAsset).values({
          id: crypto.randomUUID(),
          payloadHash,
          cdnUrl,
          format: 'image'
        });
      } catch (err) {
        console.error("Background upload failed:", err);
      }
    });

    return imageResponse;

  } catch (error: unknown) {
    console.error("Image Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
