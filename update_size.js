const fs = require('fs');

// Update route.tsx
let content = fs.readFileSync('src/app/api/v1/generate/image/route.tsx', 'utf-8');
content = content.replace(
  'height = 1920;',
  'height = 1080;'
);
fs.writeFileSync('src/app/api/v1/generate/image/route.tsx', content);

// Update page.tsx UI label
let page = fs.readFileSync('src/app/page.tsx', 'utf-8');
page = page.replace(
  '<option value="vertical_pitch">Vertical Pitch (Image)</option>',
  '<option value="vertical_pitch">Square Pitch (Image)</option>'
);
fs.writeFileSync('src/app/page.tsx', page);
