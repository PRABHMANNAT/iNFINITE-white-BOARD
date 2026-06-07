// Tiny URL-safe id (no external dep).
const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

export function nanoid(size = 12): string {
  const cryptoObj =
    typeof globalThis !== 'undefined' && (globalThis as { crypto?: Crypto }).crypto;
  if (cryptoObj && 'getRandomValues' in cryptoObj) {
    const bytes = new Uint8Array(size);
    cryptoObj.getRandomValues(bytes);
    let id = '';
    for (let i = 0; i < size; i++) id += ALPHABET[bytes[i] & 63];
    return id;
  }
  let id = '';
  for (let i = 0; i < size; i++) {
    id += ALPHABET[Math.floor(Math.random() * 64)];
  }
  return id;
}
