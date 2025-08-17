// Node script (CommonJS) — run with: yarn optimize-images
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '..', 'public', 'assets');
const outputDir = path.join(__dirname, '..', 'public', 'optimized', 'assets');

const sizes = [320, 640, 1024, 1600, 2048]; // variants to generate
const quality = { jpeg: 80, webp: 74, avif: 50 };

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
}

async function processFile(file) {
  const name = path.parse(file).name;
  const ext = path.parse(file).ext.toLowerCase();
  const inPath = path.join(inputDir, file);

  for (const w of sizes) {
    // resize to width w, preserve aspect ratio
    const resizeSharp = sharp(inPath).resize({ width: w, withoutEnlargement: true });

    // jpeg fallback
    const outJpg = path.join(outputDir, `${name}-${w}.jpg`);
    await resizeSharp.clone().jpeg({ quality: quality.jpeg, progressive: true }).toFile(outJpg);

    // webp
    const outWebp = path.join(outputDir, `${name}-${w}.webp`);
    await resizeSharp.clone().webp({ quality: quality.webp }).toFile(outWebp);

    // avif
    const outAvif = path.join(outputDir, `${name}-${w}.avif`);
    await resizeSharp.clone().avif({ quality: quality.avif }).toFile(outAvif);

    console.log(`Generated: ${name}-${w}.{jpg,webp,avif}`);
  }

  // also copy a copy of original (as large default)
  const stat = await fs.stat(inPath);
  const maxOut = path.join(outputDir, `${name}-orig${ext}`);
  await fs.copyFile(inPath, maxOut);
  console.log(`Copied original: ${path.basename(maxOut)} (${stat.size} bytes)`);
}

async function buildManifest(files) {
  const manifest = {};
  for (const f of files) {
    if (!(await isImage(f))) continue;
    const name = path.parse(f).name;
    manifest[name] = {
      variants: sizes.map((w) => ({
        width: w,
        jpg: `/images/optimized/${name}-${w}.jpg`,
        webp: `/images/optimized/${name}-${w}.webp`,
        avif: `/images/optimized/${name}-${w}.avif`
      })),
      original: `/images/optimized/${name}-orig${path.extname(f)}`
    };
  }
  await fs.writeFile(path.join(outputDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Wrote manifest.json');
}

async function main() {
  await ensureDir(outputDir);
  const files = await fs.readdir(inputDir);
  for (const f of files) {
    if (!(await isImage(f))) continue;
    await processFile(f);
  }
  await buildManifest(files);
  console.log('All done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
