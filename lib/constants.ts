/**
 * When DB has NIL or empty hex, show color by color_family name (Swiggy/Blinkit style preview).
 */
export const COLOR_FAMILY_TO_HEX: Record<string, string> = {
  Navy: "#000080",
  Maroon: "#800000",
  White: "#FFFFFF",
  Black: "#000000",
  Olive: "#556B2F",
  Cream: "#FFFDD0",
  Grey: "#808080",
  Gray: "#808080",
  Blue: "#4169E1",
  Red: "#DC143C",
  Green: "#228B22",
  Beige: "#F5F5DC",
  Brown: "#8B4513",
  Khaki: "#C3B091",
  Burgundy: "#800020",
  Neutral: "#808080",
  NIL: "#808080",
  "": "#808080",
};

export function getHexForItem(item: { hex_color_enhanced?: string | null; hex_color?: string | null; color_family?: string | null }): string {
  const hex = item.hex_color_enhanced || item.hex_color;
  if (hex && hex !== "NIL" && hex.startsWith("#")) return hex;
  const family = (item.color_family || "Neutral").trim();
  return COLOR_FAMILY_TO_HEX[family] ?? COLOR_FAMILY_TO_HEX[family.replace(/\s+/g, "")] ?? "#808080";
}
