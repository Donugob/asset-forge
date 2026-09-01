const fs = require('fs');

let content = fs.readFileSync('src/app/api/v1/generate/image/route.tsx', 'utf-8');

const fontLoadingCode = `    const fontPathBold = path.join(process.cwd(), 'public/fonts/Montserrat-Bold.ttf');
    const fontPathRegular = path.join(process.cwd(), 'public/fonts/Montserrat-Regular.ttf');
    let fontDataBold, fontDataRegular;
    try {
      fontDataBold = fs.readFileSync(fontPathBold);
      fontDataRegular = fs.readFileSync(fontPathRegular);
    } catch (e) {
      fontDataBold = await fetch(
        new URL("https://github.com/vercel/satori/raw/main/playground/public/Roboto-Regular.ttf", "https://example.com")
      ).then((res) => res.arrayBuffer());
      fontDataRegular = fontDataBold;
    }`;

content = content.replace(/const fontPath =.*?catch \(e\) {.*?}\n/s, fontLoadingCode + '\n');

const fontConfigCode = `      fonts: [
        {
          name: "Inter",
          data: fontDataBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontDataRegular,
          weight: 400,
          style: "normal",
        },
      ],`;

content = content.replace(/fonts: \[\s*{\s*name: "Inter".*?},\s*\],/s, fontConfigCode);

fs.writeFileSync('src/app/api/v1/generate/image/route.tsx', content);
