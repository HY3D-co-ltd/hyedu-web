import QRCode from 'qrcode';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const TARGET_URL = 'https://HY3D-co-ltd.github.io/hyedu-web/files/2026-programs-overview.pdf';
const OUT_DIR = join(process.cwd(), 'public', 'files');
const PNG_PATH = join(OUT_DIR, '2026-programs-overview-qr.png');
const SVG_PATH = join(OUT_DIR, '2026-programs-overview-qr.svg');

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const pngBuffer = await QRCode.toBuffer(TARGET_URL, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 1024,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
  await writeFile(PNG_PATH, pngBuffer);

  const svgString = await QRCode.toString(TARGET_URL, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: '#000000', light: '#FFFFFF' },
  });
  await writeFile(SVG_PATH, svgString);

  console.log(`PNG: ${PNG_PATH}`);
  console.log(`SVG: ${SVG_PATH}`);
  console.log(`URL: ${TARGET_URL}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
