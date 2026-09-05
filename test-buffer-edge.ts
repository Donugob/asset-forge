const buffer = new Uint8Array([104, 101, 108, 108, 111]).buffer;
const b64 = Buffer.from(buffer).toString('base64');
console.log(b64);
