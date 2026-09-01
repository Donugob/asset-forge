const fs = require('fs');

let content = fs.readFileSync('src/app/api/v1/generate/image/route.tsx', 'utf-8');
content = content.replace('VerticalPitchFlyer', 'SquarePitchFlyer');
content = content.replace('VerticalPitchFlyer', 'SquarePitchFlyer');
fs.writeFileSync('src/app/api/v1/generate/image/route.tsx', content);
