import { NextResponse, NextRequest } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { renderToStream } from "@react-pdf/renderer";
import { ModernClassicCert } from "@/templates/pdf/ModernClassicCert";
import { LuxuryGoldCert } from "@/templates/pdf/LuxuryGoldCert";
import { CorporateElegantCert } from "@/templates/pdf/CorporateElegantCert";
import { validateApiKey } from "@/lib/api-auth";
import React from "react";

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

    const { template_id, branding, features, data } = result.data;
    
    const host = req.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    let doc;
    // eslint-disable-next-line react-hooks/error-boundaries
    if (template_id === "luxury_gold") {
      doc = <LuxuryGoldCert data={data} branding={branding} features={features} origin={origin} />;
    } else if (template_id === "corporate_elegant") {
      doc = <CorporateElegantCert data={data} branding={branding} features={features} origin={origin} />;
    } else {
      doc = <ModernClassicCert data={data} branding={branding} features={features} origin={origin} />;
    }

    // Render directly to a Node stream
    const stream = await renderToStream(doc);

    // Convert Node stream to Web stream for NextResponse
    const webStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(webStream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="certificate.pdf"`,
      },
    });

  } catch (error: unknown) {
    console.error("PDF Generation Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    return NextResponse.json({ error: errorMessage, stack: errorStack }, { status: 500 });
  }
}
