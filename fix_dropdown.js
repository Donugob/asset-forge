const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

content = content.replace(
  '<option value="corporate_elegant">Corporate Elegant</option>',
  ''
);

content = content.replace(
  '<option value="geometric_horizon">Geometric Horizon</option>',
  '<option value="geometric_horizon">Geometric Horizon</option>\n                    <option value="corporate_elegant">Corporate Elegant</option>'
);

fs.writeFileSync('src/app/page.tsx', content);
