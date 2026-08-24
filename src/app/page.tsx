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
    } catch (err: any) {
      setError(err.message || "Invalid JSON payload");
      setPreviewUrl(null);
    } finally {
      setIsGenerating(false);
    }
  };

  // Debounce effect
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      generateAsset(jsonInput);
    }, 800); // 800ms debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [jsonInput]);

  return (
    <main className="flex h-screen flex-col bg-gray-950 text-white overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
        <h1 className="text-xl font-bold tracking-tight text-emerald-400">Asset Forge</h1>
        <div className="text-xs text-gray-500 font-mono">Open Source Edition</div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: JSON Editor */}
        <div className="w-1/3 flex flex-col border-r border-gray-800 bg-gray-950">
          <div className="p-3 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payload Editor</span>
            {error && <span className="text-xs text-red-400 truncate max-w-[200px]">{error}</span>}
          </div>
          <textarea
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Right Panel: Live Preview */}
        <div className="w-2/3 flex flex-col bg-[#0d1117] relative">
          <div className="p-3 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Live Preview</span>
            {isGenerating && <span className="text-xs text-emerald-400 animate-pulse">Generating...</span>}
          </div>
          
          <div className="flex-1 w-full flex items-center justify-center p-8 relative">
            {previewUrl ? (
              jsonInput.includes('"format": "image"') ? (
                <img src={previewUrl} alt="Preview" className="max-h-full object-contain shadow-2xl rounded-sm" />
              ) : (
                <iframe src={previewUrl} className="w-full h-full shadow-2xl rounded-sm border border-gray-800 bg-white" />
              )
            ) : (
              <div className="text-gray-600 font-mono text-sm">
                {error ? "Waiting for valid payload..." : "Generating preview..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
