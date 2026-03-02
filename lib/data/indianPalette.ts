export interface ColorSwatch {
  name: string;
  nameHi: string;
  hex: string;
  group: "neutrals" | "classic" | "pastels" | "bold" | "ethnic";
}

export const INDIAN_FASHION_PALETTE: ColorSwatch[] = [
  { name: "Ivory White", nameHi: "हाथीदांत", hex: "#F5F0EB", group: "neutrals" },
  { name: "Charcoal", nameHi: "चारकोल", hex: "#374151", group: "neutrals" },
  { name: "Stone Grey", nameHi: "पत्थर ग्रे", hex: "#6B7280", group: "neutrals" },
  { name: "Jet Black", nameHi: "काला", hex: "#111827", group: "neutrals" },
  { name: "Sand Beige", nameHi: "रेतीला बेज", hex: "#D6C6B8", group: "neutrals" },
  { name: "Navy Blue", nameHi: "नेवी नीला", hex: "#1A237E", group: "classic" },
  { name: "Deep Maroon", nameHi: "मैरून", hex: "#7B1C2B", group: "classic" },
  { name: "Forest Green", nameHi: "जंगल हरा", hex: "#1B5E20", group: "classic" },
  { name: "Royal Purple", nameHi: "रॉयल बैंगनी", hex: "#4A148C", group: "classic" },
  { name: "Chocolate Brown", nameHi: "चॉकलेट भूरा", hex: "#4E342E", group: "classic" },
  { name: "Blush Pink", nameHi: "गुलाबी", hex: "#F8BBD0", group: "pastels" },
  { name: "Mint Green", nameHi: "मिंट हरा", hex: "#B9F6CA", group: "pastels" },
  { name: "Sky Blue", nameHi: "आसमानी", hex: "#B3E5FC", group: "pastels" },
  { name: "Lavender", nameHi: "लैवेंडर", hex: "#E1BEE7", group: "pastels" },
  { name: "Peach", nameHi: "पीच", hex: "#FFDAB9", group: "pastels" },
  { name: "Saffron Orange", nameHi: "केसरिया", hex: "#E65100", group: "bold" },
  { name: "Crimson Red", nameHi: "गहरा लाल", hex: "#C62828", group: "bold" },
  { name: "Electric Blue", nameHi: "चमकीला नीला", hex: "#1565C0", group: "bold" },
  { name: "Hot Pink", nameHi: "चटख गुलाबी", hex: "#D81B60", group: "bold" },
  { name: "Sun Yellow", nameHi: "धूप पीला", hex: "#F9A825", group: "bold" },
  { name: "Mehendi Green", nameHi: "मेहंदी", hex: "#558B2F", group: "ethnic" },
  { name: "Haldi Yellow", nameHi: "हल्दी", hex: "#FBC02D", group: "ethnic" },
  { name: "Sindoor Red", nameHi: "सिंदूर", hex: "#B71C1C", group: "ethnic" },
  { name: "Rani Pink", nameHi: "रानी गुलाबी", hex: "#AD1457", group: "ethnic" },
  { name: "Indigo", nameHi: "जामुनी नीला", hex: "#283593", group: "ethnic" },
  { name: "Turmeric Gold", nameHi: "सोना", hex: "#C58F00", group: "ethnic" },
  { name: "Copper Rust", nameHi: "तांबा", hex: "#B7410E", group: "ethnic" },
  { name: "Teal", nameHi: "टील", hex: "#00695C", group: "ethnic" },
  { name: "Off White", nameHi: "ऑफ व्हाइट", hex: "#FAFAFA", group: "neutrals" },
  { name: "Olive", nameHi: "ऑलिव", hex: "#556B2F", group: "classic" },
];

export const PALETTE_GROUPS = ["neutrals", "classic", "pastels", "bold", "ethnic"] as const;
export type PaletteGroup = (typeof PALETTE_GROUPS)[number];

export const GROUP_LABELS: Record<PaletteGroup, { en: string; hi: string }> = {
  neutrals: { en: "Neutrals", hi: "सादे रंग" },
  classic: { en: "Classic", hi: "क्लासिक" },
  pastels: { en: "Pastels", hi: "हल्के रंग" },
  bold: { en: "Bold", hi: "गहरे रंग" },
  ethnic: { en: "Ethnic", hi: "एथनिक" },
};
