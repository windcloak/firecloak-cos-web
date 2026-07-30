// Reads each JPEG's real pixel dimensions straight from its file header
// (no decode, no npm dependency needed) and writes/overwrites a
// dimensions.json manifest into every public/cosplay/{id}/ folder,
// covering that folder's own images plus any subfolders (m/, s/, wip/,
// etc).
//
// Run this any time you add, remove, or replace photos under
// public/cosplay/ — it's safe to re-run any time, it just regenerates
// every manifest fresh from what's actually on disk.
//
//   npm run generate:dimensions
//
// The lightbox (PhotoSwipe) reads these manifests at runtime to know
// each photo's true size for its zoom math, since that isn't stored in
// Firestore and hand-annotating thousands of photos isn't practical.
import fs from 'node:fs';
import path from 'node:path';

function getJpegSize(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null; // not a JPEG (SOI marker)
  let offset = 2;
  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buffer[offset + 1];
    // SOF0/1/2/3/5/6/7/9/10/11/13/14/15 carry the real dimensions.
    // 0xC4 (DHT), 0xC8 (JPG ext), 0xCC (DAC) are excluded — same byte range, different meaning.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2; // markers with no length field
      continue;
    }
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  return null;
}

function readDimensions(filePath) {
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(128 * 1024);
  const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
  fs.closeSync(fd);
  return getJpegSize(buffer.subarray(0, bytesRead));
}

function findJpegsRecursive(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findJpegsRecursive(fullPath, baseDir));
    } else if (/\.jpe?g$/i.test(entry.name)) {
      const relativePath = path.relative(baseDir, fullPath).split(path.sep).join('/');
      results.push(relativePath);
    }
  }
  return results;
}

const cosplayDir = path.join(process.cwd(), 'public/cosplay');
const folders = fs
  .readdirSync(cosplayDir, { withFileTypes: true })
  .filter((d) => d.isDirectory());

let totalFiles = 0;
let totalWarnings = 0;

for (const folder of folders) {
  const folderPath = path.join(cosplayDir, folder.name);
  const relativeFiles = findJpegsRecursive(folderPath, folderPath);

  const manifest = {};
  for (const relativeFile of relativeFiles) {
    const dims = readDimensions(path.join(folderPath, relativeFile));
    if (dims) {
      manifest[relativeFile] = dims;
      totalFiles++;
    } else {
      console.warn(`Could not read dimensions: ${folder.name}/${relativeFile}`);
      totalWarnings++;
    }
  }

  fs.writeFileSync(path.join(folderPath, 'dimensions.json'), JSON.stringify(manifest));
}

console.log(
  `Wrote ${folders.length} dimensions.json files covering ${totalFiles} images (${totalWarnings} warnings).`,
);
