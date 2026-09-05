export async function uploadToImageKit(
  buffer: ArrayBuffer,
  fileName: string,
  folder: string = '/asset-forge'
): Promise<string> {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) throw new Error('IMAGEKIT_PRIVATE_KEY is missing');

  const formData = new FormData();
  formData.append('file', new Blob([buffer]));
  formData.append('fileName', fileName);
  formData.append('folder', folder);
  formData.append('useUniqueFileName', 'true');

  const authHeader = `Basic ${btoa(privateKey + ':')}`;

  const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`ImageKit upload failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.url;
}
