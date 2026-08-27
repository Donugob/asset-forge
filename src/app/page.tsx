"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [format, setFormat] = useState("pdf");
  const [templateId, setTemplateId] = useState("geometric_horizon");
  
  // Branding state
  const [primaryColor, setPrimaryColor] = useState("#3a8ac0");
  const [backgroundColor, setBackgroundColor] = useState("#0d2c44");
  
  // Data state
  const [title, setTitle] = useState("CERTIFICATE");
  const [recipientName, setRecipientName] = useState("Charlotte Newman");
  const [description, setDescription] = useState("The participant has demonstrated dedication, commitment, and a strong willingness to learn throughout the program.");
  const [eventName, setEventName] = useState("OF ACHIEVEMENT");
  const [signature1, setSignature1] = useState("Hannah Porter");
  const [signature2, setSignature2] = useState("Callum Price");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // Feature Toggles
  const [showCornerShapes, setShowCornerShapes] = useState(true);
  const [showDotGrid, setShowDotGrid] = useState(true);
  const [showRibbonBadge, setShowRibbonBadge] = useState(true);
  const [showSignatures, setShowSignatures] = useState(true);

  // Template presets
  useEffect(() => {
    if (templateId === "luxury_gold") {
      setPrimaryColor("#111111");
      setBackgroundColor("#d8c3a5");
      setTitle("CERTIFICATE");
      setEventName("OF RECOGNITION");
      setRecipientName("Harumi Kobayashi");
      setSignature1("NAME");
      setSignature2("NAME");
      setDescription("In recognition of her great performance during the month of November 2023. As a tribute for her loyalty and efforts.");
    } else if (templateId === "corporate_elegant") {
      setPrimaryColor("#bf953f");
      setBackgroundColor("#ffffff");
      setTitle("CERTIFICATE");
      setEventName("OF ACHIEVEMENT");
      setRecipientName("Harumi Kobayashi");
      setSignature1("Kimberly Nguyen");
      setSignature2("Rufus Stewart");
      setDescription("Awarded with great honor and appreciation for exceptional performance, dedication, and valuable contributions. This achievement reflects determination, passion, and a strong commitment to success. Your hard work and perseverance have made this accomplishment truly well-deserved and inspiring.");
    } else if (templateId === "geometric_horizon") {
      setPrimaryColor("#3a8ac0");
      setBackgroundColor("#0d2c44");
      setTitle("CERTIFICATE");
      setEventName("OF ACHIEVEMENT");
      setRecipientName("Charlotte Newman");
      setSignature1("Hannah Porter");
      setSignature2("Callum Price");
      setDescription("The participant has demonstrated dedication, commitment, and a strong willingness to learn throughout the program.");
    } else if (templateId === "social_flyer") {
      setFormat("image");
      setPrimaryColor("#3b82f6");
      setBackgroundColor("#0a0a0a");
      setTitle("NOMINATED FOR");
      setEventName("BEST STARTUP 2026");
      setRecipientName("Jane Doe");
      setAvatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop");
      setLogoUrl("");
    }
  }, [templateId]);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("preview");
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const generateAsset = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      const payload = {
        template_id: templateId,
        format,
        branding: {
          primary_color: primaryColor,
          background_color: backgroundColor,
        },
        features: {
          show_corner_shapes: showCornerShapes,
          show_dot_grid: showDotGrid,
          show_ribbon_badge: showRibbonBadge,
          show_signatures: showSignatures,
        },
        data: {
          title,
          recipient_name: recipientName,
          description,
          event_name: eventName,
          signature_1_name: signature1,
          signature_2_name: signature2,
          avatar_url: avatarUrl,
          logo_url: logoUrl,
        },
      };
      
      const endpoint = format === "image" ? "/api/v1/generate/image" : "/api/v1/generate/pdf";

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
      setError(err instanceof Error ? err.message : "Generation failed");
      setPreviewUrl(null);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      generateAsset();
    }, 800); 

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, templateId, primaryColor, backgroundColor, title, recipientName, description, eventName, signature1, signature2, avatarUrl, logoUrl, showCornerShapes, showDotGrid, showRibbonBadge, showSignatures]);

  return (
    <main className="flex flex-col h-[100dvh] bg-neutral-50 text-neutral-900 font-sans overflow-hidden">
      <header className="flex-none flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-neutral-200 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm">AF</div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 leading-tight">Asset Forge</h1>
            <div className="text-[10px] sm:text-xs text-neutral-500 font-medium">Interactive Playground</div>
          </div>
        </div>
        
        <div className="flex sm:hidden bg-neutral-100 rounded-lg p-1 border border-neutral-200">
          <button 
            onClick={() => setActiveTab("editor")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "editor" ? "bg-white text-emerald-700 shadow-sm ring-1 ring-neutral-200/50" : "text-neutral-500 hover:text-neutral-700"}`}
          >
            Configure
          </button>
          <button 
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === "preview" ? "bg-white text-emerald-700 shadow-sm ring-1 ring-neutral-200/50" : "text-neutral-500 hover:text-neutral-700"}`}
          >
            Preview
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col sm:flex-row relative">
        <div className={`${activeTab === "editor" ? "flex" : "hidden"} sm:flex flex-col w-full sm:w-1/3 lg:w-[450px] bg-white border-r border-neutral-200 z-10 h-full overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)]`}>
          <div className="p-4 sm:p-6 space-y-6 pb-24">
            
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2">Output Settings</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Format</label>
                  <select 
                    value={format} 
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="image">PNG Image</option>
                  
                    <option value="corporate_elegant">Corporate Elegant</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Template</label>
                  <select 
                    value={templateId} 
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  >
                    <option value="geometric_horizon">Geometric Horizon</option>
                    <option value="luxury_gold">Luxury Gold</option>
                    <option value="social_flyer">Social Flyer (Image)</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2">Branding</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <input 
                      type="text" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-800 font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Background</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={backgroundColor} 
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <input 
                      type="text" 
                      value={backgroundColor} 
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-800 font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2">Features & Elements</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showCornerShapes} onChange={(e) => setShowCornerShapes(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {templateId === "luxury_gold" ? "Gold Waves" : templateId === "corporate_elegant" ? "Top Banner" : "Corner Shapes"}
                  </span>
                </label>
                
                {templateId === "geometric_horizon" && (
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={showDotGrid} onChange={(e) => setShowDotGrid(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Dot Grids</span>
                  </label>
                )}

                {templateId === "luxury_gold" && (
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={showDotGrid} onChange={(e) => setShowDotGrid(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Trophy Graphic</span>
                  </label>
                )}

                {templateId === "corporate_elegant" && (
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={showDotGrid} onChange={(e) => setShowDotGrid(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                    <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Company Logo</span>
                  </label>
                )}

                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showRibbonBadge} onChange={(e) => setShowRibbonBadge(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {templateId === "luxury_gold" ? "Golden Seal" : templateId === "corporate_elegant" ? "Badge & Ribbon" : "Ribbon Badge"}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={showSignatures} onChange={(e) => setShowSignatures(e.target.checked)} className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                  <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">Signatures</span>
                </label>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2">Content Data</h2>
              
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Recipient Name</label>
                  <input 
                    type="text" 
                    value={recipientName} 
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Title & Subtitle</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-1/2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                    />
                    <input 
                      type="text" 
                      value={eventName} 
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-1/2 text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600">Description</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
                  />
                </div>

                {templateId === "social_flyer" && (
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-neutral-600">Avatar Image URL</label>
                    <input 
                      type="text" 
                      value={avatarUrl} 
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                    />
                  </div>
                )}

                {showSignatures && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-600">Signature 1</label>
                      <input 
                        type="text" 
                        value={signature1} 
                        onChange={(e) => setSignature1(e.target.value)}
                        className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-600">Signature 2</label>
                      <input 
                        type="text" 
                        value={signature2} 
                        onChange={(e) => setSignature2(e.target.value)}
                        className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
            
          </div>
        </div>

        <div className={`${activeTab === "preview" ? "flex" : "hidden"} sm:flex flex-col flex-1 bg-neutral-100 relative h-full pattern-dots`}>
          <div className="flex-none p-3 border-b border-neutral-200 bg-white/80 backdrop-blur-md flex justify-between items-center z-10 shadow-sm">
            <span className="text-xs font-bold text-neutral-600 uppercase tracking-widest flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full shadow-inner ${isGenerating ? 'bg-amber-400 animate-pulse' : error ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
              Live Preview
            </span>
            <div className="flex items-center gap-3">
               {isGenerating && <span className="text-xs text-neutral-500 font-medium animate-pulse hidden sm:inline-block">Rendering...</span>}
               {previewUrl && (
                 <a href={previewUrl} download={`asset.${format === "image" ? 'png' : 'pdf'}`} className="text-xs font-bold bg-emerald-600 text-white px-4 py-1.5 rounded-lg shadow-sm hover:bg-emerald-700 hover:shadow transition-all active:scale-95">
                   Download Output
                 </a>
               )}
            </div>
          </div>
          
          <div className="flex-1 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-auto">
            {previewUrl ? (
              format === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain shadow-xl rounded-lg ring-1 ring-black/5 bg-white transition-all" />
              ) : (
                <iframe src={previewUrl} className="w-full h-full max-w-5xl shadow-xl rounded-lg border border-neutral-200 bg-white transition-all" />
              )
            ) : (
              <div className="text-neutral-500 font-medium text-sm flex flex-col items-center gap-3 bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                {error ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <span className="text-red-600 font-semibold">Generation Failed</span>
                    <span className="text-xs text-neutral-400 text-center max-w-[200px]">{error}</span>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin mb-2"></div>
                    <span>Building layout...</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .pattern-dots {
          background-image: radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d4d4d4; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #a3a3a3; }
      `}} />
    </main>
  );
}
