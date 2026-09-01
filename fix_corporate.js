const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf-8');
page = page.replace(
  'if (templateId === "corporate_elegant") {\n      setPrimaryColor("#bf953f");\n      setBackgroundColor("#ffffff");',
  'if (templateId === "corporate_elegant") {\n      setPrimaryColor("#d4af37");\n      setBackgroundColor("#1f2937");'
);
fs.writeFileSync('src/app/page.tsx', page);
