import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createPng(width, height, r, g, b) {
  // Simple uncompressed or deflate PNG generator
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const chunkType = Buffer.from(type, 'ascii');
    const crc = crc32(Buffer.concat([chunkType, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeInt32BE(crc, 0);
    return Buffer.concat([len, chunkType, data, crcBuf]);
  }

  // Generate image data with subtle gradient and rounded look
  const rawData = Buffer.alloc((width * 4 + 1) * height);
  let pos = 0;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width * 0.46;

  for (let y = 0; y < height; y++) {
    rawData[pos++] = 0; // filter byte: none
    for (let x = 0; x < width; x++) {
      // Calculate distance from center for rounded icon
      const dx = Math.abs(x - centerX);
      const dy = Math.abs(y - centerY);
      
      // Teal gradient: #0f766e (15, 118, 110) to #059669 (5, 150, 105)
      const t = (x + y) / (width + height);
      let curR = Math.round(15 + (5 - 15) * t);
      let curG = Math.round(118 + (150 - 118) * t);
      let curB = Math.round(110 + (105 - 110) * t);
      let alpha = 255;

      // Draw stylized Rx symbol & cross in the center
      const inCross = (Math.abs(x - centerX) < width * 0.08 && Math.abs(y - centerY) < height * 0.32) ||
                      (Math.abs(y - centerY) < height * 0.08 && Math.abs(x - centerX) < width * 0.32);

      if (inCross) {
        curR = 255;
        curG = 255;
        curB = 255;
      }

      rawData[pos++] = curR;
      rawData[pos++] = curG;
      rawData[pos++] = curB;
      rawData[pos++] = alpha;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // CRC32 implementation
  function crc32(buf) {
    let c = -1;
    for (let i = 0; i < buf.length; i++) {
      c = (c >>> 8) ^ table[(c ^ buf[i]) & 0xff];
    }
    return c ^ -1;
  }

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// CRC Table
const table = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  table[n] = c;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 15, 118, 110));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 15, 118, 110));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 15, 118, 110));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 15, 118, 110));

console.log('PWA icons successfully generated in /public!');
