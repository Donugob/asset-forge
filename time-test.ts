import { config } from 'dotenv';
config({ path: '.env.local' });

async function test() {
  const payload = {
    template_id: "vertical_pitch",
    branding: { primary_color: "#ff0000", background_color: "#000000" },
    data: { recipient_name: "Test User", event_name: "Test Event" }
  };

  const res = await fetch("https://assetforge.votesphere.com.ng/api/v1/generate/image", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Referer": "http://localhost:3000" },
    body: JSON.stringify(payload)
  });

  console.log(`Status: ${res.status}`);
  console.log(`Content-Type: ${res.headers.get("content-type")}`);
  
  if (res.status === 200) {
    const buffer = await res.arrayBuffer();
    console.log(`Bytes received: ${buffer.byteLength}`);
  } else {
    const text = await res.text();
    console.log(`Error: ${text}`);
  }
}
test();
