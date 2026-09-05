import { config } from 'dotenv';
config({ path: '.env.local' });

async function test() {
  const start = Date.now();
  console.log("Starting fetch...");
  
  const payload = {
    template_id: "vertical_pitch",
    branding: { primary_color: "#ff0000", background_color: "#000000" },
    data: { recipient_name: "Test User", event_name: "Test Event" }
  };

  const res = await fetch("https://assetforge.votesphere.com.ng/api/v1/generate/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  console.log(`Status: ${res.status}`);
  console.log(`Time taken: ${Date.now() - start}ms`);
}

test();
