export interface GarmentAssets {
  baseUrl: string;
  maskUrl: string;
  idmapUrl: string;
  label: { en: string; hi: string };
  icon: string;
  category: "topwear" | "bottomwear" | "footwear" | "accessories";
}

const BASE = "/assets/garments";

export const GARMENT_ASSETS: Record<string, GarmentAssets> = {
  formal_shirt: {
    baseUrl: `${BASE}/formal_shirt_base.png`,
    maskUrl: `${BASE}/formal_shirt_mask.png`,
    idmapUrl: `${BASE}/formal_shirt_idmap.png`,
    label: { en: "Shirt", hi: "शर्ट" },
    icon: "👔",
    category: "topwear",
  },
  polo_shirt: {
    baseUrl: `${BASE}/polo_shirt_base.png`,
    maskUrl: `${BASE}/polo_shirt_mask.png`,
    idmapUrl: `${BASE}/polo_shirt_idmap.png`,
    label: { en: "Polo", hi: "पोलो" },
    icon: "👕",
    category: "topwear",
  },
  kurta: {
    baseUrl: `${BASE}/kurta_base.png`,
    maskUrl: `${BASE}/kurta_mask.png`,
    idmapUrl: `${BASE}/kurta_idmap.png`,
    label: { en: "Kurta", hi: "कुर्ता" },
    icon: "🧵",
    category: "topwear",
  },
  trouser: {
    baseUrl: `${BASE}/trouser_base.png`,
    maskUrl: `${BASE}/trouser_mask.png`,
    idmapUrl: `${BASE}/trouser_idmap.png`,
    label: { en: "Trouser", hi: "पैंट" },
    icon: "👖",
    category: "bottomwear",
  },
  jeans: {
    baseUrl: `${BASE}/jeans_base.png`,
    maskUrl: `${BASE}/jeans_mask.png`,
    idmapUrl: `${BASE}/jeans_idmap.png`,
    label: { en: "Jeans", hi: "जीन्स" },
    icon: "👖",
    category: "bottomwear",
  },
  chelsea_shoes: {
    baseUrl: `${BASE}/chelsea_shoes_base.png`,
    maskUrl: `${BASE}/chelsea_shoes_mask.png`,
    idmapUrl: `${BASE}/chelsea_shoes_idmap.png`,
    label: { en: "Shoes", hi: "जूते" },
    icon: "👞",
    category: "footwear",
  },
  sneakers: {
    baseUrl: `${BASE}/sneakers_base.png`,
    maskUrl: `${BASE}/sneakers_mask.png`,
    idmapUrl: `${BASE}/sneakers_idmap.png`,
    label: { en: "Sneakers", hi: "स्नीकर" },
    icon: "👟",
    category: "footwear",
  },
  belt: {
    baseUrl: `${BASE}/belt_base.png`,
    maskUrl: `${BASE}/belt_mask.png`,
    idmapUrl: `${BASE}/belt_idmap.png`,
    label: { en: "Belt", hi: "बेल्ट" },
    icon: "🪢",
    category: "accessories",
  },
};

export const CATEGORY_DEFAULTS = {
  topwear: "formal_shirt",
  bottomwear: "trouser",
  footwear: "chelsea_shoes",
  accessories: "belt",
} as const;
