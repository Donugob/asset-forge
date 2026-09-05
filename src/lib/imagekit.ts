export async function uploadToImageKit(
  buffer: ArrayBuffer,
  fileName: string,
  folder: string = '/asset-forge'
): Promise<string> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) throw new Error('IMAGEKIT_PRIVATE_KEY is missing');

  function arrayBufferToBase64(buf: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const base64String = arrayBufferToBase64(buffer);
  const dataUri = `data:image/png;base64,${base64String}`;

  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  const body = 
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"\r\n\r\n` +
    `${dataUri}\r\n` +
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="fileName"\r\n\r\n` +
    `${fileName}\r\n` +
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="folder"\r\n\r\n` +
    `${folder}\r\n` +
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="useUniqueFileName"\r\n\r\n` +
    `true\r\n` +
    `--${boundary}--`;

  const authHeader = `Basic ${btoa(privateKey + ':')}`;

  const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    },
    body: body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`ImageKit upload failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.url;
}
