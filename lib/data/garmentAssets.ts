export interface GarmentAssets {
  baseUrl: string[];
  maskUrl: string[];
  idmapUrl: string[];
  label: { en: string; hi: string };
  icon: string;
  category: "topwear" | "bottomwear" | "footwear" | "accessories";
}

const LOCAL_BASE = "/assets/garments";
const ENV_BASE = process.env.NEXT_PUBLIC_GARMENTS_BASE_URL?.replace(/\/$/, "");
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_GARMENTS_BUCKET || "recolor_assets";
const SUPABASE_PREFIX = process.env.NEXT_PUBLIC_GARMENTS_PREFIX?.replace(/^\/|\/$/g, "") || "";
const SUPABASE_BASE = SUPABASE_URL
  ? `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}${SUPABASE_PREFIX ? `/${SUPABASE_PREFIX}` : ""}`
  : "";

function buildUrlCandidates(fileName: string) {
  const out: string[] = [];
  if (ENV_BASE) out.push(`${ENV_BASE}/${fileName}`);
  if (SUPABASE_BASE) out.push(`${SUPABASE_BASE}/${fileName}`);
  out.push(`${LOCAL_BASE}/${fileName}`);
  return out;
}

export const GARMENT_ASSETS: Record<string, GarmentAssets> = {
  formal_shirt: {
    baseUrl: buildUrlCandidates("formal_shirt_base.png"),
    maskUrl: buildUrlCandidates("formal_shirt_mask.png"),
    idmapUrl: buildUrlCandidates("formal_shirt_idmap.png"),
    label: { en: "Shirt", hi: "शर्ट" },
    icon: "👔",
    category: "topwear",
  },
  polo_shirt: {
    baseUrl: buildUrlCandidates("polo_shirt_base.png"),
    maskUrl: buildUrlCandidates("polo_shirt_mask.png"),
    idmapUrl: buildUrlCandidates("polo_shirt_idmap.png"),
    label: { en: "Polo", hi: "पोलो" },
    icon: "👕",
    category: "topwear",
  },
  kurta: {
    baseUrl: buildUrlCandidates("kurta_base.png"),
    maskUrl: buildUrlCandidates("kurta_mask.png"),
    idmapUrl: buildUrlCandidates("kurta_idmap.png"),
    label: { en: "Kurta", hi: "कुर्ता" },
    icon: "🧵",
    category: "topwear",
  },
  trouser: {
    baseUrl: buildUrlCandidates("trouser_base.png"),
    maskUrl: buildUrlCandidates("trouser_mask.png"),
    idmapUrl: buildUrlCandidates("trouser_idmap.png"),
    label: { en: "Trouser", hi: "पैंट" },
    icon: "👖",
    category: "bottomwear",
  },
  jeans: {
    baseUrl: buildUrlCandidates("jeans_base.png"),
    maskUrl: buildUrlCandidates("jeans_mask.png"),
    idmapUrl: buildUrlCandidates("jeans_idmap.png"),
    label: { en: "Jeans", hi: "जीन्स" },
    icon: "👖",
    category: "bottomwear",
  },
  chelsea_shoes: {
    baseUrl: buildUrlCandidates("chelsea_shoes_base.png"),
    maskUrl: buildUrlCandidates("chelsea_shoes_mask.png"),
    idmapUrl: buildUrlCandidates("chelsea_shoes_idmap.png"),
    label: { en: "Shoes", hi: "जूते" },
    icon: "👞",
    category: "footwear",
  },
  sneakers: {
    baseUrl: buildUrlCandidates("sneakers_base.png"),
    maskUrl: buildUrlCandidates("sneakers_mask.png"),
    idmapUrl: buildUrlCandidates("sneakers_idmap.png"),
    label: { en: "Sneakers", hi: "स्नीकर" },
    icon: "👟",
    category: "footwear",
  },
  belt: {
    baseUrl: buildUrlCandidates("belt_base.png"),
    maskUrl: buildUrlCandidates("belt_mask.png"),
    idmapUrl: buildUrlCandidates("belt_idmap.png"),
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
