/**
 * SANTHIAN ALPHA PIXEL MATH — RangMatch Core Engine
 *
 * Tri-Asset pattern per garment:
 *   {proxy_key}_base.png   — Photoreal garment (creases, buttons, shadows)
 *   {proxy_key}_mask.png   — B&W; white=fabric, black=background/hardware
 *   {proxy_key}_idmap.png  — Channel-coded zones:
 *     Red   > 150 → fabric recolor zone
 *     Green > 150 → preserve hardware (buttons, laces, zips)
 *     Else       → transparent background
 */

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

export function getLuminance(r: number, g: number, b: number): number {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

export function applyTriAssetRecolor(base: ImageData, mask: ImageData, idmap: ImageData, hexColor: string): ImageData {
  const [tR, tG, tB] = hexToRgb(hexColor);
  const isDark = getLuminance(tR, tG, tB) < 0.15;
  const output = new ImageData(new Uint8ClampedArray(base.data), base.width, base.height);

  for (let i = 0; i < base.data.length; i += 4) {
    const idR = idmap.data[i];
    const idG = idmap.data[i + 1];
    const alphaFromMask = mask.data[i];

    if (idG > 150) {
      output.data[i] = base.data[i];
      output.data[i + 1] = base.data[i + 1];
      output.data[i + 2] = base.data[i + 2];
      output.data[i + 3] = alphaFromMask;
      continue;
    }

    if (idR > 150) {
      const bR = base.data[i];
      const bG = base.data[i + 1];
      const bB = base.data[i + 2];
      const brightness = (bR + bG + bB) / (3 * 255);

      let outR: number;
      let outG: number;
      let outB: number;

      if (isDark) {
        const boost = brightness * 0.4 * 255;
        outR = clamp(bR * (tR / 255) * 0.7 + bR * 0.3 + boost);
        outG = clamp(bG * (tG / 255) * 0.7 + bG * 0.3 + boost);
        outB = clamp(bB * (tB / 255) * 0.7 + bB * 0.3 + boost);
      } else {
        const boost = brightness * 0.25 * 255;
        outR = clamp((bR * tR) / 255 + boost);
        outG = clamp((bG * tG) / 255 + boost);
        outB = clamp((bB * tB) / 255 + boost);
      }

      output.data[i] = outR;
      output.data[i + 1] = outG;
      output.data[i + 2] = outB;
      output.data[i + 3] = alphaFromMask;
      continue;
    }

    output.data[i + 3] = 0;
  }

  return output;
}

export function calculateHarmonyScore(hexColors: string[]): number {
  if (hexColors.length < 2) return 50;
  const rgbs = hexColors.map((hex) => hexToRgb(hex));
  let distanceSum = 0;
  let pairs = 0;

  for (let i = 0; i < rgbs.length; i += 1) {
    for (let j = i + 1; j < rgbs.length; j += 1) {
      const [r1, g1, b1] = rgbs[i];
      const [r2, g2, b2] = rgbs[j];
      const d = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
      distanceSum += d;
      pairs += 1;
    }
  }

  const avgDistance = distanceSum / Math.max(1, pairs);
  const normalized = Math.min(1, avgDistance / 180);
  return Math.round((1 - Math.abs(normalized - 0.45)) * 100);
}
