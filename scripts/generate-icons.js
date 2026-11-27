import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = fs.readFileSync('public/favicon.svg', 'utf-8');

function render(svgStr, width, height, outPath) {
  const resvg = new Resvg(svgStr, {
    fitTo: { mode: 'width', value: width }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(outPath, pngBuffer);
  console.log(`Generated: ${outPath} (${width}x${height}, ${pngBuffer.length} bytes)`);
}

render(svg, 192, 192, 'public/pwa-192x192.png');
render(svg, 512, 512, 'public/pwa-512x512.png');
render(svg, 180, 180, 'public/apple-touch-icon.png');

const innerSvg = svg.replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#1B382B"/>
  <g transform="translate(64, 64) scale(0.75)">
    ${innerSvg}
  </g>
</svg>`;
render(maskableSvg, 512, 512, 'public/pwa-maskable-512x512.png');
