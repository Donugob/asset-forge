import { NextResponse } from "next/server";
import { generatePayloadSchema } from "@/lib/schema";
import { renderToStream } from "@react-pdf/renderer";
import { ModernClassicCert } from "@/templates/pdf/ModernClassicCert";
import React from "react";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    
    // Strict Payload Validation
    const result = generatePayloadSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid payload", details: result.error.issues }, { status: 400 });
    }

    const { branding, data } = result.data;

    // React-PDF expects a valid React element to render
    const doc = React.createElement(ModernClassicCert as any, { data, branding });

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
