// Reads each JPEG's real pixel dimensions straight from its file header
// (no decode, no npm dependency needed) and writes/overwrites a
// dimensions.json manifest into every public/cosplay/{id}/ and
// public/tutorials/{id}/ folder, covering that folder's own images plus
// any subfolders (m/, s/, wip/, etc).
//
// Run this any time you add, remove, or replace photos under
// public/cosplay/ or public/tutorials/ — it's safe to re-run any time,
// it just regenerates every manifest fresh from what's actually on disk.
//
//   npm run generate:dimensions
//
// The cosplay lightbox (PhotoSwipe) and the tutorial detail page both
// read these manifests at runtime to know each photo's true size,
// since that isn't stored in Firestore and hand-annotating thousands
// of photos isn't practical.
import fs from 'node:fs';
import path from 'node:path';

// EXIF orientation values 5-8 mean the camera/phone stored the pixel
// data rotated 90°/270° from how it should actually display — the
// SOF marker's width/height describe the *stored* pixels, but every
// browser auto-rotates per this tag when painting the image, which
// swaps the effective displayed width/height. Skipping this produces
// a manifest that's internally consistent but describes the wrong
// shape entirely for these photos, stretching them in the lightbox.
function getExifOrientation(buffer) {
  try {
    let offset = 2;
    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buffer[offset + 1];
      if (marker === 0xda) break; // start of scan — no more markers after this
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2;
        continue;
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (marker === 0xe1 && buffer.toString('ascii', offset + 4, offset + 10) === 'Exif\0\0') {
        const tiffStart = offset + 10;
        const little = buffer.toString('ascii', tiffStart, tiffStart + 2) === 'II';
        const u16 = (o) => (little ? buffer.readUInt16LE(o) : buffer.readUInt16BE(o));
        const u32 = (o) => (little ? buffer.readUInt32LE(o) : buffer.readUInt32BE(o));
        const ifdOffset = tiffStart + u32(tiffStart + 4);
        const numEntries = u16(ifdOffset);
        for (let i = 0; i < numEntries; i++) {
          const entryOffset = ifdOffset + 2 + i * 12;
          if (u16(entryOffset) === 0x0112) {
            return u16(entryOffset + 8);
          }
        }
        return 1;
      }
      offset += 2 + length;
    }
  } catch {
    // Malformed/truncated EXIF block — fall back to "no rotation"
    // rather than letting one bad file abort the whole batch.
  }
  return 1;
}

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
      let height = buffer.readUInt16BE(offset + 5);
      let width = buffer.readUInt16BE(offset + 7);
      const orientation = getExifOrientation(buffer);
      if (orientation >= 5 && orientation <= 8) {
        [width, height] = [height, width];
      }
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
  // Reads the whole file rather than just a leading chunk — some
  // exports (e.g. Lightroom/Photoshop with a large embedded preview or
  // ICC profile in their EXIF block) push the actual SOF marker well
  // past what a fixed-size read would capture, silently producing a
  // "could not read dimensions" warning for a perfectly valid file.
  return getJpegSize(fs.readFileSync(filePath));
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

let totalManifests = 0;
let totalFiles = 0;
let totalWarnings = 0;

for (const collection of ['public/cosplay', 'public/tutorials']) {
  const collectionDir = path.join(process.cwd(), collection);
  if (!fs.existsSync(collectionDir)) {
    continue;
  }

  const folders = fs
    .readdirSync(collectionDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const folder of folders) {
    const folderPath = path.join(collectionDir, folder.name);
    const relativeFiles = findJpegsRecursive(folderPath, folderPath);

    const manifest = {};
    for (const relativeFile of relativeFiles) {
      const dims = readDimensions(path.join(folderPath, relativeFile));
      if (dims) {
        manifest[relativeFile] = dims;
        totalFiles++;
      } else {
        console.warn(`Could not read dimensions: ${collection}/${folder.name}/${relativeFile}`);
        totalWarnings++;
      }
    }

    fs.writeFileSync(path.join(folderPath, 'dimensions.json'), JSON.stringify(manifest));
    totalManifests++;
  }
}

console.log(
  `Wrote ${totalManifests} dimensions.json files covering ${totalFiles} images (${totalWarnings} warnings).`,
);
