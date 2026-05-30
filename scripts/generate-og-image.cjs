const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const heroPath = path.join(publicDir, 'hero.jpg');
const logoPath = path.join(publicDir, 'logo.svg');
const outPath = path.join(publicDir, 'og-default.jpg');

const OG_W = 1200;
const OG_H = 630;

// Logo width as a fraction of image width; centered vertically
const LOGO_W = 600;
const LOGO_H = Math.round(LOGO_W * (199.26 / 670.18)); // preserve aspect ratio ~178px

async function run() {
  const logoSvg = fs.readFileSync(logoPath);

  // Render SVG to PNG buffer at target size
  const logoPng = await sharp(logoSvg, { density: 300 })
    .resize(LOGO_W, LOGO_H, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(heroPath)
    .resize(OG_W, OG_H, { fit: 'cover', position: 'centre' })
    // semi-transparent dark overlay so logo pops
    .composite([
      {
        input: Buffer.from(
          `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${OG_W}" height="${OG_H}" fill="rgba(0,0,0,0.35)"/>
          </svg>`
        ),
        blend: 'over',
      },
      {
        input: logoPng,
        gravity: 'centre',
        blend: 'over',
      },
    ])
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log(`Generated ${outPath} (${OG_W}x${OG_H})`);
}

run().catch(console.error);
