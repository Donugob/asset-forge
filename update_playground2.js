const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

const additionalFields = `                <div className="space-y-1.5">
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
                )}`;

content = content.replace(
  '<div className="space-y-1.5">\n                  <label className="text-xs font-semibold text-neutral-600">Description</label>\n                  <textarea \n                    value={description} \n                    onChange={(e) => setDescription(e.target.value)}\n                    rows={3}\n                    className="w-full text-sm bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"\n                  />\n                </div>',
  additionalFields
);

fs.writeFileSync('src/app/page.tsx', content);
