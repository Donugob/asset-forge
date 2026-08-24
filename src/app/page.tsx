"use client";

import React, { useState, useEffect, useRef } from "react";

const defaultPayload = {
  template_id: "modern_classic_cert",
  format: "pdf",
  branding: {
    primary_color: "#10B981",
    background_color: "#111827",
  },
  data: {
    title: "Certificate of Excellence",
    recipient_name: "Jane Doe",
    description: "For winning 1st Place in the Tech Innovation Category.",
    event_name: "Global Hackathon 2026",
    date: "August 24, 2026",
  },
};

export default function Home() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultPayload, null, 2));
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("preview");
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const generateAsset = async (payloadString: string) => {
    try {
      setIsGenerating(true);
      setError(null);
      const payload = JSON.parse(payloadString);
      
      const endpoint = payload.format === "image" ? "/api/v1/generate/image" : "/api/v1/generate/pdf";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate asset");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid JSON payload");
      setPreviewUrl(null);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      generateAsset(jsonInput);
    }, 800); 

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [jsonInput]);

  return (
    <main className="flex flex-col h-screen bg-neutral-950 text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center font-bold text-neutral-950">AF</div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-100 leading-tight">Asset Forge</h1>
            <div className="text-xs text-emerald-400 font-mono">Developer Playground</div>
          </div>
        </div>
        
        {/* Mobile Tab Toggles */}
        <div className="flex sm:hidden bg-neutral-800 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab("editor")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === "editor" ? "bg-neutral-700 text-white shadow" : "text-neutral-400"}`}
          >
            Payload
          </button>
          <button 
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${activeTab === "preview" ? "bg-neutral-700 text-white shadow" : "text-neutral-400"}`}
          >
            Preview
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden flex-col sm:flex-row">
        
        {/* Left Panel: JSON Editor */}
        <div className={`${activeTab === "editor" ? "flex" : "hidden"} sm:flex flex-col w-full sm:w-1/3 lg:w-[400px] border-b sm:border-b-0 sm:border-r border-neutral-800 bg-neutral-950 relative h-full`}>
          <div className="flex-none p-3 border-b border-neutral-800 bg-neutral-900/30 flex justify-between items-center">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Payload Editor</span>
            {error && <span className="text-xs text-red-400 truncate max-w-[150px] bg-red-400/10 px-2 py-0.5 rounded" title={error}>{error}</span>}
          </div>
          <textarea
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm leading-relaxed text-emerald-100/80 resize-none focus:outline-none focus:bg-neutral-900/20 transition-colors placeholder:text-neutral-700"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Right Panel: Live Preview */}
        <div className={`${activeTab === "preview" ? "flex" : "hidden"} sm:flex flex-col flex-1 bg-neutral-900 relative h-full pattern-dots`}>
          <div className="flex-none p-3 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur flex justify-between items-center z-10">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-amber-400 animate-pulse' : error ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
              Live Preview
            </span>
            <div className="flex items-center gap-3">
               {isGenerating && <span className="text-xs text-neutral-400 animate-pulse hidden sm:inline-block">Rendering...</span>}
               {previewUrl && (
                 <a href={previewUrl} download={`asset.${jsonInput.includes('"format": "image"') ? 'png' : 'pdf'}`} className="text-xs font-medium bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition-colors">
                   Download
                 </a>
               )}
            </div>
          </div>
          
          <div className="flex-1 w-full h-full flex items-center justify-center p-4 sm:p-8 relative overflow-auto">
            {previewUrl ? (
              jsonInput.includes('"format": "image"') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain shadow-2xl rounded-sm ring-1 ring-white/10" />
              ) : (
                <iframe src={previewUrl} className="w-full h-full max-w-4xl shadow-2xl rounded-sm border border-neutral-800 bg-white" />
              )
            ) : (
              <div className="text-neutral-500 font-mono text-sm flex flex-col items-center gap-3 bg-neutral-950/50 p-6 rounded-xl border border-neutral-800/50">
                {error ? (
                  <>
                    <svg className="w-8 h-8 text-red-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Fix payload to generate preview</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <span>Building layout...</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Global CSS for dot pattern */}
      <style dangerouslySetInnerHTML={{__html: `
        .pattern-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}} />
    </main>
  );
}
