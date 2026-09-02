import Link from "next/link";
import { Layers } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-500" />
          <span className="font-bold text-lg tracking-tight">Asset Forge</span>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl font-black mb-4">API Documentation</h1>
        <p className="text-neutral-400 text-base md:text-lg mb-8 md:mb-12">Generate flyers and certificates dynamically using our fast API.</p>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold border-b border-white/10 pb-2 mb-6">Authentication</h2>
          <p className="text-neutral-300 mb-4 text-sm md:text-base">All API requests must be authenticated via a Bearer token. You can generate an API key from your dashboard.</p>
          <div className="bg-white/5 p-4 rounded-lg font-mono text-xs md:text-sm border border-white/10 text-emerald-400 overflow-x-auto break-all md:break-normal">
            Authorization: Bearer af_1234567890abcdef
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold border-b border-white/10 pb-2 mb-6">Endpoints</h2>
          
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-3 flex-wrap">
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-sm">POST</span>
              /api/v1/generate/image
            </h3>
            <p className="text-neutral-400 mb-4">Generates a high-quality PNG image from a template.</p>
            
            <h4 className="font-semibold mb-2 text-neutral-300">Request Body (JSON)</h4>
            <pre className="bg-neutral-900 p-4 rounded-lg border border-white/10 overflow-x-auto text-sm text-neutral-300">
{`{
  "template_id": "votesphere_contestant",
  "format": "image",
  "branding": {
    "primary_color": "#2563eb",
    "background_color": "#050505"
  },
  "data": {
    "recipient_name": "Amina Bello",
    "title": "Icon of the Year",
    "event_name": "LAWSAN SE MERIT AWARDS",
    "avatar_url": "https://example.com/avatar.jpg",
    "logo_url": "https://example.com/logo.png",
    "brand_name": "Votesphere"
  }
}`}
            </pre>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-sm">POST</span>
              /api/v1/generate/pdf
            </h3>
            <p className="text-neutral-400 mb-4">Generates a vector-based PDF document.</p>
            <pre className="bg-neutral-900 p-4 rounded-lg border border-white/10 overflow-x-auto text-sm text-neutral-300">
{`{
  "template_id": "luxury_gold",
  "format": "pdf",
  "data": {
    "recipient_name": "John Doe",
    "title": "Certificate of Completion",
    "description": "For outstanding achievement.",
    "signature_1_name": "Jane Smith"
  }
}`}
            </pre>
          </div>
        </section>

      </main>
    </div>
  );
}
