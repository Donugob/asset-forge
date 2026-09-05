import { config } from 'dotenv';
config({ path: '.env.local' });
import { uploadToImageKit } from './src/lib/imagekit';

async function test() {
  const dummyString = "Hello world";
  const encoder = new TextEncoder();
  const arrayBuffer = encoder.encode(dummyString).buffer;
  try {
    const url = await uploadToImageKit(arrayBuffer, 'test_dummy.txt');
    console.log("Success URL:", url);
  } catch(e) {
    console.error("Failed:", e);
  }
}
test();
