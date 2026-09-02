import Link from "next/link";
import { ArrowRight, Layers, Zap, Database } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      <nav className="flex flex-col md:flex-row items-center justify-between px-6 py-6 border-b border-white/10 gap-4 md:gap-0">
        <div className="flex items-center gap-2">
          <Layers className="w-6 h-6 text-emerald-500" />
          <span className="font-bold text-lg tracking-tight">Asset Forge</span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm font-medium">
          <Link href="/playground" className="text-neutral-400 hover:text-white transition-colors">Playground</Link>
          <Link href="/docs" className="text-neutral-400 hover:text-white transition-colors">API Docs</Link>
          <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/auth/login" className="bg-white text-black px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors">
            Sign In
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs md:text-sm font-medium mb-8 border border-emerald-500/20">
          <Zap className="w-4 h-4" />
          Zero-Storage On-The-Fly Generation
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
          Generate Dynamic Graphics<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            At The Edge.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12">
          The ultimate API for generating social flyers, certificates, and tickets. No storage limits, no database bloat. Just blazing fast rendering.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/playground" className="flex items-center justify-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-emerald-400 transition-colors w-full sm:w-auto">
            Try the Playground <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docs" className="flex items-center justify-center gap-2 bg-white/5 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors border border-white/10 w-full sm:w-auto">
            View API Docs
          </Link>
        </div>
      </main>

      <section className="border-t border-white/10 bg-white/[0.02] py-24">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Zap className="w-8 h-8 text-emerald-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Blazing Fast</h3>
            <p className="text-neutral-400 leading-relaxed">Powered by Rust and Satori, Asset Forge generates images in milliseconds, not seconds. No headless browsers involved.</p>
          </div>
          <div>
            <Database className="w-8 h-8 text-cyan-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Zero Storage</h3>
            <p className="text-neutral-400 leading-relaxed">Images are generated on the fly and streamed directly to your users. Never pay for CDN storage or manage stale assets again.</p>
          </div>
          <div>
            <Layers className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Dynamic Templates</h3>
            <p className="text-neutral-400 leading-relaxed">Pass a simple JSON payload and get beautifully structured flyers, certificates, and pitch cards.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
