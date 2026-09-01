const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add template_id to the select options
const selectEnd = content.indexOf('</select>');
const newOption = `\n                    <option value="corporate_elegant">Corporate Elegant</option>\n                  `;
content = content.substring(0, selectEnd) + newOption + content.substring(selectEnd);

// 2. Add useEffect presets for corporate_elegant
const presetsHookStart = content.indexOf('// Template presets');
const presetsHookEnd = content.indexOf('}, [templateId]);') + 17;

const newPresetsHook = `// Template presets
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
    }
  }, [templateId]);`;

content = content.substring(0, presetsHookStart) + newPresetsHook + content.substring(presetsHookEnd);

// 3. Add UI conditional rendering for Corporate Elegant toggles
const uiStart = content.indexOf('<h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2">Features & Elements</h2>');
const uiEnd = content.indexOf('</section>', uiStart);

const newUi = `<h2 className="text-sm font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-2">Features & Elements</h2>
              
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
            `;

content = content.substring(0, uiStart) + newUi + content.substring(uiEnd);

fs.writeFileSync('src/app/page.tsx', content);
