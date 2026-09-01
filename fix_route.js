const fs = require('fs');
let route = fs.readFileSync('src/app/api/v1/generate/image/route.tsx', 'utf-8');
route = route.replace('<VerticalPitchFlyer', '<SquarePitchFlyer');
fs.writeFileSync('src/app/api/v1/generate/image/route.tsx', route);
