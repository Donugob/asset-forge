const fs = require('fs');

let content = fs.readFileSync('src/app/api/v1/generate/image/route.tsx', 'utf-8');

// Import VerticalPitchFlyer
content = content.replace(
  'import { SocialFlyer } from "@/templates/image/SocialFlyer";',
  'import { SocialFlyer } from "@/templates/image/SocialFlyer";\nimport { VerticalPitchFlyer } from "@/templates/image/VerticalPitchFlyer";'
);

// Template selection logic
content = content.replace(
  'const { branding, data } = result.data;\n\n    // TODO: Dynamic template selection based on template_id\n    // eslint-disable-next-line react-hooks/error-boundaries\n    const element = <SocialFlyer data={data} branding={branding} />;',
  `const { template_id, branding, data } = result.data;\n\n    let element;\n    let width = 1080;\n    let height = 1080;\n\n    if (template_id === "vertical_pitch") {\n      element = <VerticalPitchFlyer data={data} branding={branding} />;\n      width = 1080;\n      height = 1920;\n    } else {\n      element = <SocialFlyer data={data} branding={branding} />;\n      width = 1080;\n      height = 1080;\n    }`
);

// Update Satori
content = content.replace(
  'width: 1080,\n      height: 1080,',
  'width,\n      height,'
);

// Update Resvg background handling
content = content.replace(
  'fitTo: { mode: "width", value: 1080 },',
  'fitTo: { mode: "width", value: width },'
);

fs.writeFileSync('src/app/api/v1/generate/image/route.tsx', content);
