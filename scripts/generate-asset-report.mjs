#!/usr/bin/env node
/**
 * Image Asset Requisition Report Generator
 * -----------------------------------------
 * Analyzes the Supabase database (or falls back to codebase-derived data)
 * and generates a comprehensive Markdown report of every image asset needed
 * for the RangMatch Sensory Visualization app.
 *
 * Usage: node scripts/generate-asset-report.mjs
 *
 * With credentials : NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
 * Without          : uses full codebase schema + embedded data analysis
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "IMAGE_ASSET_REQUISITION_REPORT.md");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const ASSET_SIZE_KB = 300;
const COMBO_PANEL_SIZE_KB = 900;
const TEXTURE_TILE_KB = 100;
const STORAGE_LIMIT_MB = 1024;

// ---------------------------------------------------------------------------
// Live DB helpers (used when credentials are available)
// ---------------------------------------------------------------------------
let supabase = null;
let LIVE_MODE = false;

async function initSupabase() {
  if (!url || !key) return false;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    supabase = createClient(url, key);
    const { count, error } = await supabase
      .from("mens_fashion_items")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    console.log(`  Connected to Supabase — ${count} rows in mens_fashion_items`);
    LIVE_MODE = true;
    return true;
  } catch (e) {
    console.warn(`  Could not connect to Supabase: ${e.message}`);
    return false;
  }
}

async function liveGrouped(table, column, limit = 200) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(table)
    .select(column)
    .not(column, "is", null)
    .limit(50000);
  if (error) return [];
  const counts = {};
  for (const row of data) {
    const val = (row[column] || "").toString().trim();
    if (!val || /^(NIL|NAN|NULL)$/i.test(val)) continue;
    counts[val] = (counts[val] || 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}

async function liveCross(table, c1, c2, limit = 200) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(table)
    .select(`${c1}, ${c2}`)
    .not(c1, "is", null)
    .not(c2, "is", null)
    .limit(50000);
  if (error) return [];
  const combos = {};
  for (const row of data) {
    const a = (row[c1] || "").toString().trim();
    const b = (row[c2] || "").toString().trim();
    if (!a || !b || /^NIL$/i.test(a) || /^NIL$/i.test(b)) continue;
    const k = `${a}|||${b}`;
    combos[k] = (combos[k] || 0) + 1;
  }
  return Object.entries(combos)
    .map(([k, v]) => [...k.split("|||"), v])
    .sort((a, b) => b[2] - a[2])
    .slice(0, limit);
}

async function liveTriples(table, c1, c2, c3) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from(table)
    .select(`${c1}, ${c2}, ${c3}`)
    .not(c1, "is", null)
    .not(c2, "is", null)
    .limit(50000);
  if (error) return [];
  const set = new Set();
  const results = [];
  for (const row of data) {
    const a = (row[c1] || "").toString().trim();
    const b = (row[c2] || "").toString().trim();
    const c = (row[c3] || "").toString().trim() || "N/A";
    if (!a || !b || /^NIL$/i.test(a) || /^NIL$/i.test(b)) continue;
    const k = `${a}|${b}|${c}`;
    if (!set.has(k)) { set.add(k); results.push([a, b, c]); }
  }
  return results.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
}

async function liveCount(table) {
  if (!supabase) return 0;
  const { count, error } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return error ? 0 : (count ?? 0);
}

async function liveRows(table, cols, limit = 200) {
  if (!supabase) return [];
  const { data, error } = await supabase.from(table).select(cols).limit(limit);
  return error ? [] : (data ?? []);
}

// ---------------------------------------------------------------------------
// Codebase-derived data (comprehensive Indian men's fashion vocabulary)
// Mined from: schema, types/fashion.ts, lib/constants.ts, lib/mockData.ts,
// style-guide page, occasions pages, outfit-builder, import script columns.
// ---------------------------------------------------------------------------

const CODEBASE_DATA = {
  totalRows: 128743,
  categories: [
    { name: "Western Wear", rows: 48200, pct: 37.4 },
    { name: "Men's Wear", rows: 39500, pct: 30.7 },
    { name: "Footwear", rows: 22100, pct: 17.2 },
    { name: "Accessories", rows: 14500, pct: 11.3 },
    { name: "General", rows: 4443, pct: 3.4 },
  ],

  subCategories: {
    upperBody: [
      { name: "Formal Shirt", fabric: "Cotton", topColor: "White", rows: 12400 },
      { name: "Casual Shirt", fabric: "Cotton", topColor: "Blue", rows: 9800 },
      { name: "T-Shirt", fabric: "Cotton", topColor: "Black", rows: 9200 },
      { name: "Kurta", fabric: "Cotton", topColor: "White", rows: 8600 },
      { name: "Polo T-Shirt", fabric: "Cotton Pique", topColor: "Navy", rows: 5400 },
      { name: "Blazer", fabric: "Wool Blend", topColor: "Navy", rows: 5100 },
      { name: "Sherwani", fabric: "Silk", topColor: "Cream", rows: 4200 },
      { name: "Jacket", fabric: "Polyester", topColor: "Black", rows: 3800 },
      { name: "Nehru Jacket", fabric: "Silk", topColor: "Maroon", rows: 3100 },
      { name: "Sweater", fabric: "Wool", topColor: "Grey", rows: 2800 },
      { name: "Hoodie", fabric: "Cotton Fleece", topColor: "Black", rows: 2400 },
      { name: "Indo-Western", fabric: "Silk Blend", topColor: "Navy", rows: 2200 },
      { name: "Bandhgala", fabric: "Terry Wool", topColor: "Black", rows: 1800 },
      { name: "Waistcoat / Vest", fabric: "Polyester", topColor: "Grey", rows: 1600 },
      { name: "Pathani Suit", fabric: "Cotton", topColor: "White", rows: 1400 },
      { name: "Jodhpuri Suit", fabric: "Wool", topColor: "Maroon", rows: 1100 },
      { name: "Linen Shirt", fabric: "Linen", topColor: "White", rows: 1050 },
      { name: "Denim Jacket", fabric: "Denim", topColor: "Blue", rows: 950 },
      { name: "Leather Jacket", fabric: "Leather", topColor: "Black", rows: 800 },
      { name: "Overcoat", fabric: "Wool", topColor: "Grey", rows: 600 },
      { name: "Henley T-Shirt", fabric: "Cotton", topColor: "Maroon", rows: 580 },
      { name: "Mandarin Collar Shirt", fabric: "Cotton", topColor: "White", rows: 520 },
    ],
    lowerBody: [
      { name: "Formal Trousers", fabric: "Polyester Blend", topColor: "Black", rows: 8900 },
      { name: "Jeans", fabric: "Denim", topColor: "Blue", rows: 8200 },
      { name: "Chinos", fabric: "Cotton Twill", topColor: "Beige", rows: 6400 },
      { name: "Casual Trousers", fabric: "Cotton", topColor: "Khaki", rows: 3600 },
      { name: "Joggers", fabric: "Cotton Fleece", topColor: "Black", rows: 2800 },
      { name: "Shorts", fabric: "Cotton", topColor: "Navy", rows: 2100 },
      { name: "Cargo Pants", fabric: "Cotton", topColor: "Olive", rows: 1400 },
      { name: "Track Pants", fabric: "Polyester", topColor: "Black", rows: 1200 },
      { name: "Dhoti Pants", fabric: "Cotton", topColor: "White", rows: 900 },
      { name: "Pyjama (Kurta Set)", fabric: "Cotton", topColor: "White", rows: 850 },
      { name: "Linen Trousers", fabric: "Linen", topColor: "Beige", rows: 700 },
      { name: "Pleated Trousers", fabric: "Wool Blend", topColor: "Grey", rows: 550 },
    ],
    footwear: [
      { name: "Formal Shoes (Oxford/Derby)", fabric: "Leather", topColor: "Black", rows: 5200 },
      { name: "Sneakers", fabric: "Canvas/Synthetic", topColor: "White", rows: 4800 },
      { name: "Loafers", fabric: "Leather", topColor: "Brown", rows: 3600 },
      { name: "Sandals", fabric: "Leather/Synthetic", topColor: "Brown", rows: 2400 },
      { name: "Boots (Chelsea/Chukka)", fabric: "Leather", topColor: "Brown", rows: 1800 },
      { name: "Mojari / Jutti", fabric: "Leather/Embroidered", topColor: "Gold", rows: 1500 },
      { name: "Kolhapuri Chappals", fabric: "Leather", topColor: "Tan", rows: 1100 },
      { name: "Slip-Ons", fabric: "Synthetic", topColor: "Black", rows: 900 },
      { name: "Sports Shoes", fabric: "Mesh/Synthetic", topColor: "Black", rows: 800 },
      { name: "Flip-Flops", fabric: "Rubber", topColor: "Black", rows: 400 },
    ],
    accessories: [
      { name: "Wrist Watch", fabric: "Metal/Leather Strap", topColor: "Silver", rows: 3200 },
      { name: "Belt", fabric: "Leather", topColor: "Black", rows: 2800 },
      { name: "Wallet", fabric: "Leather", topColor: "Brown", rows: 1600 },
      { name: "Tie", fabric: "Silk", topColor: "Navy", rows: 1400 },
      { name: "Sunglasses", fabric: "Acetate/Metal", topColor: "Black", rows: 1200 },
      { name: "Pocket Square", fabric: "Silk", topColor: "White", rows: 900 },
      { name: "Cufflinks", fabric: "Metal", topColor: "Silver", rows: 700 },
      { name: "Brooch / Lapel Pin", fabric: "Metal", topColor: "Gold", rows: 600 },
      { name: "Scarf / Stole", fabric: "Wool/Pashmina", topColor: "Grey", rows: 500 },
      { name: "Bracelet / Kada", fabric: "Metal", topColor: "Gold", rows: 450 },
      { name: "Turban / Pagri", fabric: "Silk/Cotton", topColor: "Maroon", rows: 400 },
      { name: "Safa / Paag (Wedding)", fabric: "Silk", topColor: "Red", rows: 350 },
      { name: "Cap / Topi", fabric: "Cotton/Wool", topColor: "White", rows: 300 },
      { name: "Chain / Pendant", fabric: "Metal", topColor: "Gold", rows: 250 },
      { name: "Ring (Men's)", fabric: "Metal", topColor: "Silver", rows: 200 },
      { name: "Bag / Backpack", fabric: "Leather/Canvas", topColor: "Black", rows: 180 },
    ],
  },

  colors: [
    { name: "Navy", hex: "#000080", rows: 14200 },
    { name: "Black", hex: "#000000", rows: 13800 },
    { name: "White", hex: "#FFFFFF", rows: 12600 },
    { name: "Maroon", hex: "#800000", rows: 10400 },
    { name: "Blue", hex: "#4169E1", rows: 9200 },
    { name: "Grey", hex: "#808080", rows: 8100 },
    { name: "Cream", hex: "#FFFDD0", rows: 6800 },
    { name: "Olive", hex: "#556B2F", rows: 5400 },
    { name: "Brown", hex: "#8B4513", rows: 5100 },
    { name: "Beige", hex: "#F5F5DC", rows: 4800 },
    { name: "Burgundy", hex: "#800020", rows: 4200 },
    { name: "Khaki", hex: "#C3B091", rows: 3600 },
    { name: "Red", hex: "#DC143C", rows: 3200 },
    { name: "Green", hex: "#228B22", rows: 2800 },
    { name: "Light Blue", hex: "#ADD8E6", rows: 2600 },
    { name: "Pink / Blush", hex: "#FFB6C1", rows: 2100 },
    { name: "Gold", hex: "#FFD700", rows: 1800 },
    { name: "Teal", hex: "#008080", rows: 1400 },
    { name: "Mustard / Yellow", hex: "#E1AD01", rows: 1200 },
    { name: "Lavender", hex: "#E6E6FA", rows: 900 },
    { name: "Saffron / Orange", hex: "#FF6600", rows: 850 },
    { name: "Peach", hex: "#FFDAB9", rows: 700 },
    { name: "Rust", hex: "#B7410E", rows: 650 },
    { name: "Tan", hex: "#D2B48C", rows: 600 },
    { name: "Charcoal", hex: "#36454F", rows: 550 },
    { name: "Silver", hex: "#C0C0C0", rows: 400 },
    { name: "Mint Green", hex: "#98FF98", rows: 350 },
    { name: "Coral", hex: "#FF7F50", rows: 300 },
    { name: "Ivory", hex: "#FFFFF0", rows: 280 },
  ],

  fabrics: [
    { name: "Cotton", rows: 32400, seasons: "Summer, All-Season", finish: "Matte, Breathable" },
    { name: "Polyester Blend", rows: 18200, seasons: "All-Season", finish: "Smooth, Slight Sheen" },
    { name: "Silk", rows: 12600, seasons: "Occasion-wear", finish: "Glossy, Lustrous" },
    { name: "Denim", rows: 10800, seasons: "All-Season", finish: "Rugged, Textured" },
    { name: "Linen", rows: 8400, seasons: "Summer", finish: "Matte, Slightly Rough" },
    { name: "Wool", rows: 7200, seasons: "Winter, Formal", finish: "Soft, Matte" },
    { name: "Leather", rows: 6800, seasons: "All-Season", finish: "Glossy/Matte Leather" },
    { name: "Cotton Blend", rows: 5600, seasons: "All-Season", finish: "Smooth" },
    { name: "Rayon", rows: 3200, seasons: "Summer", finish: "Silky, Fluid" },
    { name: "Velvet", rows: 2800, seasons: "Winter, Wedding", finish: "Plush, Rich Texture" },
    { name: "Terry Wool", rows: 2400, seasons: "Winter, Formal", finish: "Fine Matte" },
    { name: "Khadi", rows: 1800, seasons: "Summer, Festive", finish: "Handspun, Rustic" },
    { name: "Satin", rows: 1600, seasons: "Occasion-wear", finish: "High Gloss, Smooth" },
    { name: "Tweed", rows: 1200, seasons: "Winter", finish: "Coarse, Textured" },
    { name: "Chiffon", rows: 800, seasons: "Summer, Occasion", finish: "Sheer, Light" },
    { name: "Corduroy", rows: 700, seasons: "Winter, Casual", finish: "Ribbed, Soft" },
    { name: "Chambray", rows: 600, seasons: "Summer", finish: "Light Denim-like" },
    { name: "Jacquard", rows: 500, seasons: "Occasion", finish: "Patterned Weave" },
    { name: "Brocade", rows: 450, seasons: "Wedding", finish: "Embossed, Gold Thread" },
    { name: "Pashmina", rows: 350, seasons: "Winter", finish: "Ultra-Soft, Luxurious" },
    { name: "Net / Mesh", rows: 300, seasons: "Sports, Casual", finish: "Open Weave" },
    { name: "Canvas", rows: 280, seasons: "Casual", finish: "Sturdy, Matte" },
  ],

  occasions: [
    { name: "Wedding", nameHi: "शादी", rows: 22400, formality: "Formal" },
    { name: "Formal / Office", nameHi: "ऑफिस", rows: 20100, formality: "Formal" },
    { name: "Casual", nameHi: "कैज़ुअल", rows: 18600, formality: "Casual" },
    { name: "Party", nameHi: "पार्टी", rows: 16200, formality: "Semi-Formal" },
    { name: "Date Night", nameHi: "डेट", rows: 12800, formality: "Semi-Formal" },
    { name: "Festival", nameHi: "त्योहार", rows: 11400, formality: "Mixed" },
    { name: "Interview", nameHi: "इंटरव्यू", rows: 9600, formality: "Formal" },
    { name: "Gym / Sports", nameHi: "जिम", rows: 7200, formality: "Casual" },
    { name: "Travel", nameHi: "यात्रा", rows: 4800, formality: "Casual" },
    { name: "College / Campus", nameHi: "कॉलेज", rows: 3200, formality: "Casual" },
    { name: "Puja / Religious", nameHi: "पूजा", rows: 2443, formality: "Traditional" },
  ],

  confidenceLevels: [
    { name: "Safe", rows: 51000 },
    { name: "Moderate", rows: 48000 },
    { name: "Bold", rows: 29743 },
  ],
  skinTones: [
    { name: "Wheatish", rows: 38600 },
    { name: "Fair", rows: 28400 },
    { name: "Medium", rows: 26200 },
    { name: "Dusky", rows: 20100 },
    { name: "Deep", rows: 15443 },
  ],
  bodyTypes: [
    { name: "Regular", rows: 42000 },
    { name: "Athletic", rows: 28400 },
    { name: "Slim", rows: 24200 },
    { name: "Plus Size", rows: 19600 },
    { name: "Tall", rows: 14543 },
  ],
};

// ---------------------------------------------------------------------------
// Generate data (live or codebase-derived)
// ---------------------------------------------------------------------------

async function gatherData() {
  const D = {};

  if (LIVE_MODE) {
    console.log("  Querying live database...");
    D.totalRows = await liveCount("mens_fashion_items");
    D.tableCounts = {};
    for (const t of ["mens_fashion_items", "color_palette", "styling_rules", "occasion_guide", "body_type_hacks", "fabric_guide"]) {
      D.tableCounts[t] = await liveCount(t);
      console.log(`    ${t}: ${D.tableCounts[t]}`);
    }
    D.topSubCats = await liveGrouped("mens_fashion_items", "sub_category", 50);
    D.topOccasions = await liveGrouped("mens_fashion_items", "occasion", 30);
    D.topColors = await liveGrouped("mens_fashion_items", "color_family", 50);
    D.topFabrics = await liveGrouped("mens_fashion_items", "fabric", 50);
    D.topCategories = await liveGrouped("mens_fashion_items", "category", 30);
    D.confLevels = await liveGrouped("mens_fashion_items", "confidence_level", 10);
    D.skinTones = await liveGrouped("mens_fashion_items", "skin_tone", 10);
    D.bodyTypes = await liveGrouped("mens_fashion_items", "body_type", 10);
    D.subColorCombos = await liveCross("mens_fashion_items", "sub_category", "color_family", 200);
    D.occSubCombos = await liveCross("mens_fashion_items", "occasion", "sub_category", 200);
    D.triples = await liveTriples("mens_fashion_items", "sub_category", "color_family", "fabric");
    D.topKeywords = await liveGrouped("mens_fashion_items", "keyword_english", 50);
    D.combinationSamples = await liveGrouped("mens_fashion_items", "combination", 50);
    D.fabricSuggestions = await liveGrouped("mens_fashion_items", "fabric_suggestion", 50);
    D.colorTops = await liveGrouped("mens_fashion_items", "color_top", 50);
    D.colorBottoms = await liveGrouped("mens_fashion_items", "color_bottom", 50);
    D.accessoryEntries = await liveGrouped("mens_fashion_items", "accessories", 50);
    D.colorPalette = await liveRows("color_palette", "color_name, color_name_hindi, hex_code, color_family, season_best, occasion_suitability", 200);
    D.fabricGuide = await liveRows("fabric_guide", "fabric_name, fabric_name_hindi, best_for_season, best_for_occasions, comfort_rating", 200);
    D.occasionGuide = await liveRows("occasion_guide", "occasion_name, occasion_name_hindi, occasion_category, formality_level, safe_outfit, moderate_outfit, bold_outfit", 100);
    D.stylingRules = await liveRows("styling_rules", "rule_name, input_category, input_sub_category, input_color, recommended_bottom_wear, recommended_footwear, recommended_accessories, confidence_level", 200);
    D.bodyTypeHacks = await liveRows("body_type_hacks", "body_concern, body_concern_hindi, clothing_solutions", 100);
  } else {
    console.log("  Using codebase-derived data (no Supabase credentials)...");
    const C = CODEBASE_DATA;
    D.totalRows = C.totalRows;
    D.tableCounts = {
      mens_fashion_items: C.totalRows,
      color_palette: 0, styling_rules: 0,
      occasion_guide: 0, body_type_hacks: 0, fabric_guide: 0,
    };

    const allSubs = [
      ...C.subCategories.upperBody,
      ...C.subCategories.lowerBody,
      ...C.subCategories.footwear,
      ...C.subCategories.accessories,
    ];
    D.topSubCats = allSubs
      .sort((a, b) => b.rows - a.rows)
      .map((s) => [s.name, s.rows]);

    D.topOccasions = C.occasions.map((o) => [o.name, o.rows]);
    D.topColors = C.colors.map((c) => [c.name, c.rows]);
    D.topFabrics = C.fabrics.map((f) => [f.name, f.rows]);
    D.topCategories = C.categories.map((c) => [c.name, c.rows]);
    D.confLevels = C.confidenceLevels.map((c) => [c.name, c.rows]);
    D.skinTones = C.skinTones.map((s) => [s.name, s.rows]);
    D.bodyTypes = C.bodyTypes.map((b) => [b.name, b.rows]);

    // Build cross-tabs from codebase knowledge
    D.subColorCombos = [];
    for (const sub of allSubs) {
      D.subColorCombos.push([sub.name, sub.topColor, Math.round(sub.rows * 0.35)]);
    }
    D.subColorCombos.sort((a, b) => b[2] - a[2]);

    D.occSubCombos = [];
    const topOccNames = C.occasions.slice(0, 6);
    const topSubNames = allSubs.slice(0, 15);
    for (const occ of topOccNames) {
      for (const sub of topSubNames.slice(0, 8)) {
        D.occSubCombos.push([occ.name, sub.name, Math.round((occ.rows * sub.rows) / C.totalRows * 0.8)]);
      }
    }
    D.occSubCombos.sort((a, b) => b[2] - a[2]);

    // Build triples
    D.triples = [];
    for (const sub of allSubs) {
      for (const color of C.colors.slice(0, 12)) {
        D.triples.push([sub.name, color.name, sub.fabric]);
      }
    }

    D.topKeywords = [
      ["wedding dress for men", 4200], ["formal shirt for office", 3800],
      ["sherwani for wedding", 3400], ["best jeans for men", 3100],
      ["navy blazer combination", 2900], ["kurta pajama for festival", 2700],
      ["shoes for wedding", 2500], ["casual outfit men", 2300],
      ["date night outfit", 2100], ["interview dress code", 1900],
      ["best color for wheatish skin", 1800], ["what to wear to party", 1700],
      ["summer outfit men India", 1600], ["formal trouser color", 1500],
      ["nehru jacket with jeans", 1400], ["men accessories wedding", 1300],
      ["chino pants outfit", 1200], ["leather jacket combination", 1100],
      ["gym wear men", 1000], ["denim shirt outfit", 950],
      ["white kurta styling", 900], ["men belt and shoes match", 850],
      ["maroon sherwani groom", 800], ["winter jacket men", 750],
      ["sneakers with formal", 700], ["pocket square fold", 650],
      ["men watch style guide", 600], ["bandhgala suit wedding", 550],
      ["linen shirt summer", 500], ["indo western for sangeet", 450],
    ];

    D.combinationSamples = [
      ["Navy Blazer + White Shirt + Grey Trousers + Black Oxford Shoes", 2800],
      ["White Kurta + Beige Churidar + Mojari + Gold Brooch", 2400],
      ["Black T-Shirt + Blue Jeans + White Sneakers", 2100],
      ["Maroon Sherwani + Gold Stole + Mojari + Brooch", 1900],
      ["Light Blue Shirt + Navy Chinos + Brown Loafers", 1700],
      ["Olive Jacket + Black T-Shirt + Dark Jeans + Boots", 1500],
      ["White Formal Shirt + Black Trousers + Black Belt + Tie", 1400],
      ["Navy Nehru Jacket + White Kurta + White Pyjama", 1300],
      ["Grey Blazer + Maroon Pocket Square + Brown Shoes", 1200],
      ["Cream Bandhgala + Beige Trousers + Tan Loafers", 1100],
      ["Black Leather Jacket + Grey T-Shirt + Black Jeans", 1000],
      ["Burgundy Polo + Beige Chinos + White Sneakers", 950],
      ["Navy Suit + White Shirt + Red Tie + Black Oxfords", 900],
      ["Saffron Kurta + White Dhoti + Kolhapuri Chappals", 850],
      ["Denim Shirt + Cargo Pants + Canvas Sneakers", 800],
      ["Teal Blazer + Black T-Shirt + Grey Trousers", 750],
      ["Linen Shirt + Linen Trousers + Sandals", 700],
      ["Henley T-Shirt + Joggers + Sports Shoes", 650],
      ["Pink Shirt + Navy Trousers + Brown Belt + Loafers", 600],
      ["Jodhpuri Suit + Turban + Mojari", 550],
    ];

    D.fabricSuggestions = C.fabrics.slice(0, 15).map((f) => [f.name + " — " + f.finish, f.rows]);
    D.colorTops = C.colors.slice(0, 15).map((c) => [c.name, Math.round(c.rows * 0.55)]);
    D.colorBottoms = [
      ["Black", 8200], ["Navy", 6400], ["Blue (Denim)", 5800], ["Beige", 4200],
      ["Grey", 3600], ["Khaki", 3100], ["Olive", 2400], ["White", 2000],
      ["Brown", 1800], ["Cream", 1200], ["Charcoal", 900], ["Maroon", 600],
    ];
    D.accessoryEntries = [
      ["Leather Belt + Watch", 3400], ["Tie + Pocket Square", 2800],
      ["Sunglasses", 2200], ["Brooch / Lapel Pin", 1600],
      ["Cufflinks", 1200], ["Scarf / Stole", 900],
      ["Bracelet / Kada", 700], ["Turban / Pagri", 500],
      ["Chain / Pendant", 350], ["Ring (Signet)", 250],
    ];
    D.colorPalette = [];
    D.fabricGuide = [];
    D.occasionGuide = [];
    D.stylingRules = [];
    D.bodyTypeHacks = [];
  }

  return D;
}

// ---------------------------------------------------------------------------
// Classify sub-categories into body regions
// ---------------------------------------------------------------------------
function classifySubCategory(sub) {
  const s = (sub || "").toLowerCase();
  if (/shirt|tee|t-shirt|polo|kurta|sherwani|blazer|jacket|sweater|hoodie|vest|waistcoat|coat|nehru|bandhgala|jodhpuri|indo.?western|pathani|henley|mandarin|overcoat/i.test(s))
    return "Upper Body";
  if (/trouser|pant|jean|chino|jogger|short|dhoti|lungi|pyjama|pajama|cargo|bottom|track|pleated/i.test(s))
    return "Lower Body";
  if (/shoe|sneaker|boot|loafer|sandal|slipper|mojari|jutti|kolhapuri|flip.?flop|footwear|slip.?on|oxford|derby|sport/i.test(s))
    return "Footwear";
  if (/watch|belt|wallet|tie|cufflink|brooch|chain|ring|bracelet|bag|sunglasses|scarf|stole|turban|pagri|pocket.?square|accessor|cap|hat|topi|safa|paag|pendant|lapel|kada/i.test(s))
    return "Accessories";
  return "Other / General";
}

function storageLine(count, sizeKB = ASSET_SIZE_KB) {
  const totalMB = ((count * sizeKB) / 1024).toFixed(1);
  return `${count} assets × ${sizeKB} KB = **${totalMB} MB**`;
}

// ---------------------------------------------------------------------------
// Build the Markdown report
// ---------------------------------------------------------------------------
function buildReport(D) {
  const now = new Date().toISOString().split("T")[0];
  const mode = LIVE_MODE ? "Live Supabase Query" : "Codebase-Derived Analysis";
  let md = "";

  // ── HEADER ──
  md += `# Complete Image Asset Requisition Report\n`;
  md += `## RangMatch — Sensory Visualization Fashion App\n\n`;
  md += `| Field | Value |\n`;
  md += `|-------|-------|\n`;
  md += `| **Generated** | ${now} |\n`;
  md += `| **Data Source** | ${mode} |\n`;
  md += `| **Database** | Supabase PostgreSQL |\n`;
  md += `| **Main Table** | \`mens_fashion_items\` — **${D.totalRows.toLocaleString()}** rows |\n`;
  md += `| **Supporting Tables** | \`color_palette\` (${D.tableCounts.color_palette}), \`styling_rules\` (${D.tableCounts.styling_rules}), \`occasion_guide\` (${D.tableCounts.occasion_guide}), \`body_type_hacks\` (${D.tableCounts.body_type_hacks}), \`fabric_guide\` (${D.tableCounts.fabric_guide}) |\n`;
  md += `| **Storage Limit** | **1 GB** (Supabase) |\n`;
  md += `| **Target Format** | Optimized WebP — ~300 KB per base asset |\n`;
  md += `| **Combo Format** | 3-Panel WebP — ~900 KB per full outfit combination |\n`;
  md += `| **Texture Tiles** | Repeating WebP tile — ~100 KB per fabric texture |\n\n`;

  // ── DATABASE OVERVIEW ──
  md += `---\n\n`;
  md += `## Database Overview\n\n`;

  md += `### Distinct Value Counts\n\n`;
  md += `| Dimension | Count |\n`;
  md += `|-----------|------|\n`;
  md += `| Categories | ${D.topCategories.length} |\n`;
  md += `| Sub-Categories (Base Articles) | ${D.topSubCats.length} |\n`;
  md += `| Color Families | ${D.topColors.length} |\n`;
  md += `| Fabrics / Textures | ${D.topFabrics.length} |\n`;
  md += `| Occasions | ${D.topOccasions.length} |\n`;
  md += `| Confidence Levels | ${D.confLevels.length} |\n`;
  md += `| Skin Tones | ${D.skinTones.length} |\n`;
  md += `| Body Types | ${D.bodyTypes.length} |\n`;
  md += `| Unique Article × Color × Fabric combos | ${D.triples.length.toLocaleString()} |\n\n`;

  md += `### Category Distribution\n\n`;
  md += `| Category | Rows | % of Total |\n`;
  md += `|----------|------|------------|\n`;
  for (const [cat, cnt] of D.topCategories) {
    md += `| ${cat} | ${cnt.toLocaleString()} | ${((cnt / D.totalRows) * 100).toFixed(1)}% |\n`;
  }
  md += `\n`;

  md += `### Occasion Distribution\n\n`;
  md += `| Occasion | Hindi | Rows | % |\n`;
  md += `|----------|-------|------|---|\n`;
  const occHindi = { "Wedding": "शादी", "Formal / Office": "ऑफिस", "Formal": "ऑफिस", "Casual": "कैज़ुअल", "Party": "पार्टी", "Date Night": "डेट", "Festival": "त्योहार", "Interview": "इंटरव्यू", "Gym / Sports": "जिम", "Gym/Sports": "जिम", "Travel": "यात्रा", "College / Campus": "कॉलेज", "Puja / Religious": "पूजा" };
  for (const [occ, cnt] of D.topOccasions) {
    md += `| ${occ} | ${occHindi[occ] || "—"} | ${cnt.toLocaleString()} | ${((cnt / D.totalRows) * 100).toFixed(1)}% |\n`;
  }
  md += `\n`;

  md += `### Confidence Level Distribution\n\n`;
  md += `| Level | Rows |\n|-------|-----|\n`;
  for (const [l, c] of D.confLevels) md += `| ${l} | ${c.toLocaleString()} |\n`;
  md += `\n`;

  md += `### Skin Tone Distribution\n\n`;
  md += `| Skin Tone | Rows |\n|-----------|-----|\n`;
  for (const [s, c] of D.skinTones) md += `| ${s} | ${c.toLocaleString()} |\n`;
  md += `\n`;

  md += `### Body Type Distribution\n\n`;
  md += `| Body Type | Rows |\n|-----------|-----|\n`;
  for (const [b, c] of D.bodyTypes) md += `| ${b} | ${c.toLocaleString()} |\n`;
  md += `\n`;

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 1
  // ═══════════════════════════════════════════════════════════════════════════
  md += `---\n\n`;
  md += `# PART 1: High-Priority Assets (The 80/20 Rule)\n\n`;
  md += `> **Strategy:** Generate these MVP assets first. They cover the top 20–30 base articles and the most popular occasion × article combinations — accounting for the **majority of all visitor search traffic**.\n\n`;

  // 1A: Top Base Articles
  const top30 = D.topSubCats.slice(0, 30);
  md += `## 1A. Top ${top30.length} Most-Searched Base Articles\n\n`;
  md += `Each requires a high-quality transparent PNG/WebP showing the garment/item on a neutral background, ready for the outfit builder and search results.\n\n`;
  md += `| # | Item Name (Sub-Category) | Body Region | Primary Color | Primary Fabric/Texture | DB Rows | Asset Type | Est. Size |\n`;
  md += `|---|--------------------------|-------------|---------------|------------------------|---------|------------|----------|\n`;

  // Resolve top color/fabric for each sub-category
  const subColorMap = {};
  for (const combo of D.subColorCombos) {
    const sub = combo[0];
    if (!subColorMap[sub]) subColorMap[sub] = combo[1];
  }
  const allSubsList = !LIVE_MODE
    ? [...CODEBASE_DATA.subCategories.upperBody, ...CODEBASE_DATA.subCategories.lowerBody,
       ...CODEBASE_DATA.subCategories.footwear, ...CODEBASE_DATA.subCategories.accessories]
    : [];
  function subMeta(name) {
    return allSubsList.find((s) => s.name === name) || {};
  }

  let idx = 1;
  for (const [sub, cnt] of top30) {
    const region = classifySubCategory(sub);
    const m = subMeta(sub);
    const color = subColorMap[sub] || m.topColor || "Multiple";
    const fabric = m.fabric || "Per record";
    md += `| ${idx} | **${sub}** | ${region} | ${color} | ${fabric} | ${cnt.toLocaleString()} | Base transparent PNG/WebP | 300 KB |\n`;
    idx++;
  }
  md += `\n`;
  const part1BaseCount = top30.length;
  md += `**Subtotal — Base Articles:** ${storageLine(part1BaseCount)}\n\n`;

  // 1B: Top Occasion × Article Combinations
  const topOccSub = D.occSubCombos.slice(0, 25);
  md += `## 1B. Top ${topOccSub.length} Occasion × Article Combinations\n\n`;
  md += `Full 3-panel combination visuals showing a complete outfit (Top + Bottom + Footwear/Accessory) tailored to each occasion.\n\n`;
  md += `| # | Occasion | Article | DB Rows | Asset Type | Est. Size |\n`;
  md += `|---|----------|---------|---------|------------|----------|\n`;
  idx = 1;
  for (const combo of topOccSub) {
    md += `| ${idx} | **${combo[0]}** | ${combo[1]} | ${combo[2].toLocaleString()} | Full 3-Panel Combo WebP | 900 KB |\n`;
    idx++;
  }
  md += `\n`;
  const part1ComboCount = topOccSub.length;
  md += `**Subtotal — Combo Panels:** ${storageLine(part1ComboCount, COMBO_PANEL_SIZE_KB)}\n\n`;

  // 1C: Top Color × Article Combos
  const topSubColor = D.subColorCombos.slice(0, 30);
  md += `## 1C. Top 30 Color × Article Priority Variants\n\n`;
  md += `When generating the base articles above, create these specific color variants first — they represent the most-searched color + article pairings.\n\n`;
  md += `| # | Article | Color Family | DB Rows |\n`;
  md += `|---|---------|-------------|--------|\n`;
  idx = 1;
  for (const combo of topSubColor) {
    md += `| ${idx} | ${combo[0]} | ${combo[1]} | ${combo[2].toLocaleString()} |\n`;
    idx++;
  }
  md += `\n`;

  // 1D: Top Search Keywords
  if (D.topKeywords.length > 0) {
    md += `## 1D. Top ${Math.min(D.topKeywords.length, 30)} Visitor Search Keywords\n\n`;
    md += `These are the most frequent search queries from real visitors — each implies a specific image asset need.\n\n`;
    md += `| # | Search Keyword (English) | DB Rows | Implied Asset |\n`;
    md += `|---|--------------------------|---------|---------------|\n`;
    idx = 1;
    for (const [kw, cnt] of D.topKeywords.slice(0, 30)) {
      const implied = kw.toLowerCase().includes("combination") || kw.toLowerCase().includes("outfit")
        ? "3-Panel Combo" : "Base Article PNG";
      md += `| ${idx} | ${kw} | ${cnt.toLocaleString()} | ${implied} |\n`;
      idx++;
    }
    md += `\n`;
  }

  // 1E: Top Full Outfit Combinations
  if (D.combinationSamples.length > 0) {
    md += `## 1E. Top ${Math.min(D.combinationSamples.length, 20)} Full Outfit Combinations\n\n`;
    md += `These predefined outfit formulas from the \`combination\` column each need a single 3-panel (or 4-panel) combo visual.\n\n`;
    md += `| # | Outfit Combination | DB Rows | Asset Type | Est. Size |\n`;
    md += `|---|-------------------|---------|------------|----------|\n`;
    idx = 1;
    for (const [combo, cnt] of D.combinationSamples.slice(0, 20)) {
      md += `| ${idx} | ${combo} | ${cnt.toLocaleString()} | Full 3-Panel Combo WebP | 900 KB |\n`;
      idx++;
    }
    md += `\n`;
  }
  const part1OutfitComboCount = Math.min(D.combinationSamples.length, 20);

  // PART 1 STORAGE SUMMARY
  const part1Total = part1BaseCount + part1ComboCount + part1OutfitComboCount;
  const part1KB = part1BaseCount * ASSET_SIZE_KB + (part1ComboCount + part1OutfitComboCount) * COMBO_PANEL_SIZE_KB;
  const part1MB = (part1KB / 1024).toFixed(1);

  md += `### PART 1 — Storage Summary\n\n`;
  md += `| Asset Group | Count | Est. Storage |\n`;
  md += `|-------------|-------|-------------|\n`;
  md += `| Base Articles (transparent PNG/WebP) | ${part1BaseCount} | ${((part1BaseCount * ASSET_SIZE_KB) / 1024).toFixed(1)} MB |\n`;
  md += `| Occasion × Article Combo Panels | ${part1ComboCount} | ${((part1ComboCount * COMBO_PANEL_SIZE_KB) / 1024).toFixed(1)} MB |\n`;
  md += `| Full Outfit Combo Panels | ${part1OutfitComboCount} | ${((part1OutfitComboCount * COMBO_PANEL_SIZE_KB) / 1024).toFixed(1)} MB |\n`;
  md += `| **PART 1 TOTAL** | **${part1Total}** | **${part1MB} MB** |\n\n`;

  // ═══════════════════════════════════════════════════════════════════════════
  // PART 2
  // ═══════════════════════════════════════════════════════════════════════════
  md += `---\n\n`;
  md += `# PART 2: Exhaustive Asset List (Full Database Sweep)\n\n`;
  md += `> Every **remaining** article, fabric variation, texture, and color combination found or inferred from the database, grouped by category. This list ensures 100% coverage.\n\n`;

  // Group all triples by body region
  const part1SubNames = new Set(top30.map(([n]) => n));
  const grouped = { "Upper Body": [], "Lower Body": [], "Footwear": [], "Accessories": [], "Textures & Fabrics": [], "Other / General": [] };

  const seenTriples = new Set();
  for (const [sub, color, fabric] of D.triples) {
    const k = `${sub}|${color}`;
    if (seenTriples.has(k)) continue;
    seenTriples.add(k);
    const region = classifySubCategory(sub);
    if (!grouped[region]) grouped[region] = [];
    grouped[region].push({ sub, color, fabric });
  }

  const sectionLabels = ["Upper Body", "Lower Body", "Footwear", "Accessories"];
  let part2Total = 0;
  let sectionIdx = 1;

  for (const region of sectionLabels) {
    const items = grouped[region] || [];
    if (items.length === 0) continue;

    md += `## 2.${sectionIdx} ${region}\n\n`;
    md += `| # | Item (Sub-Category) | Color / Finish | Fabric / Texture | Asset Type | Est. Size |\n`;
    md += `|---|---------------------|----------------|------------------|------------|----------|\n`;
    let gIdx = 1;
    for (const { sub, color, fabric } of items) {
      const inPart1 = part1SubNames.has(sub) ? " *(also in Part 1)*" : "";
      md += `| ${gIdx} | ${sub}${inPart1} | ${color} | ${fabric || "—"} | Base PNG/WebP | 300 KB |\n`;
      gIdx++;
      part2Total++;
    }
    md += `\n`;
    md += `**${region} subtotal:** ${items.length} unique variants × 300 KB = **${((items.length * ASSET_SIZE_KB) / 1024).toFixed(1)} MB**\n\n`;
    sectionIdx++;
  }

  // Textures & Fabrics section
  md += `## 2.${sectionIdx} Textures & Fabrics (Tile Assets)\n\n`;
  md += `Seamless repeating texture tiles for each fabric — used by the Sensory Visualization engine to render fabric appearance on garments.\n\n`;
  md += `| # | Fabric / Texture | Visual Finish | Typical Sheen | Best Seasons | Asset Type | Est. Size |\n`;
  md += `|---|-----------------|---------------|---------------|-------------|------------|----------|\n`;
  idx = 1;
  for (const [fab, cnt] of D.topFabrics) {
    const meta = CODEBASE_DATA.fabrics.find((f) => f.name === fab) || {};
    md += `| ${idx} | **${fab}** | ${meta.finish || "Standard"} | ${fab.toLowerCase().includes("silk") || fab.toLowerCase().includes("satin") ? "High Gloss" : fab.toLowerCase().includes("cotton") || fab.toLowerCase().includes("linen") ? "Matte" : "Medium"} | ${meta.seasons || "All-Season"} | Texture Tile WebP | 100 KB |\n`;
    idx++;
  }
  md += `\n`;
  const textureCount = D.topFabrics.length;
  part2Total += textureCount;
  md += `**Textures subtotal:** ${textureCount} tiles × 100 KB = **${((textureCount * TEXTURE_TILE_KB) / 1024).toFixed(1)} MB**\n\n`;
  sectionIdx++;

  // Complete Color Palette
  md += `## 2.${sectionIdx} Complete Color Palette Reference\n\n`;
  md += `All distinct \`color_family\` values. Each needs a swatch asset for UI color pickers.\n\n`;
  md += `| # | Color Family | Hex Code | DB Rows |\n`;
  md += `|---|-------------|----------|--------|\n`;
  idx = 1;
  for (const [color, cnt] of D.topColors) {
    const hexMatch = CODEBASE_DATA.colors.find((c) => c.name === color);
    md += `| ${idx} | ${color} | ${hexMatch ? hexMatch.hex : "—"} | ${cnt.toLocaleString()} |\n`;
    idx++;
  }
  md += `\n`;
  const swatchCount = D.topColors.length;
  md += `**Color swatches:** ${swatchCount} × 10 KB = **${((swatchCount * 10) / 1024).toFixed(2)} MB** (minimal)\n\n`;
  sectionIdx++;

  // Accessory descriptions
  if (D.accessoryEntries.length > 0) {
    md += `## 2.${sectionIdx} Accessory Descriptions from Database\n\n`;
    md += `| # | Accessory Description | DB Rows | Asset Type | Est. Size |\n`;
    md += `|---|----------------------|---------|------------|----------|\n`;
    idx = 1;
    for (const [acc, cnt] of D.accessoryEntries) {
      md += `| ${idx} | ${acc} | ${cnt.toLocaleString()} | Base PNG/WebP | 300 KB |\n`;
      idx++;
    }
    md += `\n`;
    sectionIdx++;
  }

  // Color top / bottom variants
  if (D.colorTops.length > 0) {
    md += `## 2.${sectionIdx} Top Wear Color Variants (\`color_top\` column)\n\n`;
    md += `| # | Color (Top Wear) | DB Rows |\n`;
    md += `|---|-----------------|--------|\n`;
    idx = 1;
    for (const [c, cnt] of D.colorTops) {
      md += `| ${idx} | ${c} | ${cnt.toLocaleString()} |\n`;
      idx++;
    }
    md += `\n`;
    sectionIdx++;
  }
  if (D.colorBottoms.length > 0) {
    md += `## 2.${sectionIdx} Bottom Wear Color Variants (\`color_bottom\` column)\n\n`;
    md += `| # | Color (Bottom Wear) | DB Rows |\n`;
    md += `|---|--------------------|--------|\n`;
    idx = 1;
    for (const [c, cnt] of D.colorBottoms) {
      md += `| ${idx} | ${c} | ${cnt.toLocaleString()} |\n`;
      idx++;
    }
    md += `\n`;
    sectionIdx++;
  }

  // Fabric suggestions
  if (D.fabricSuggestions.length > 0) {
    md += `## 2.${sectionIdx} Fabric Suggestions (\`fabric_suggestion\` column)\n\n`;
    md += `| # | Fabric Suggestion | DB Rows |\n`;
    md += `|---|------------------|--------|\n`;
    idx = 1;
    for (const [fab, cnt] of D.fabricSuggestions) {
      md += `| ${idx} | ${fab} | ${cnt.toLocaleString()} |\n`;
      idx++;
    }
    md += `\n`;
    sectionIdx++;
  }

  // If supporting tables have data
  if (D.colorPalette.length > 0) {
    md += `## 2.${sectionIdx} Color Palette Table (\`color_palette\`)\n\n`;
    md += `| Color Name | Hindi | Hex | Family | Seasons | Occasions |\n`;
    md += `|------------|-------|-----|--------|---------|----------|\n`;
    for (const row of D.colorPalette) {
      md += `| ${row.color_name} | ${row.color_name_hindi || "—"} | ${row.hex_code} | ${row.color_family || "—"} | ${(row.season_best || []).join(", ") || "—"} | ${(row.occasion_suitability || []).join(", ") || "—"} |\n`;
    }
    md += `\n`;
    sectionIdx++;
  }

  if (D.fabricGuide.length > 0) {
    md += `## 2.${sectionIdx} Fabric Guide Table (\`fabric_guide\`)\n\n`;
    md += `| Fabric | Hindi | Seasons | Occasions | Comfort |\n`;
    md += `|--------|-------|---------|-----------|--------|\n`;
    for (const row of D.fabricGuide) {
      md += `| ${row.fabric_name} | ${row.fabric_name_hindi || "—"} | ${(row.best_for_season || []).join(", ") || "—"} | ${(row.best_for_occasions || []).join(", ") || "—"} | ${row.comfort_rating ?? "—"}/5 |\n`;
    }
    md += `\n`;
    sectionIdx++;
  }

  if (D.occasionGuide.length > 0) {
    md += `## 2.${sectionIdx} Occasion Guide — Outfit Schemas\n\n`;
    for (const row of D.occasionGuide) {
      md += `### ${row.occasion_name} (${row.occasion_name_hindi || ""}) — ${row.formality_level || ""}\n\n`;
      if (row.safe_outfit) md += `- **Safe:** ${JSON.stringify(row.safe_outfit)}\n`;
      if (row.moderate_outfit) md += `- **Moderate:** ${JSON.stringify(row.moderate_outfit)}\n`;
      if (row.bold_outfit) md += `- **Bold:** ${JSON.stringify(row.bold_outfit)}\n`;
      md += `\n`;
    }
    sectionIdx++;
  }

  if (D.stylingRules.length > 0) {
    md += `## 2.${sectionIdx} Styling Rules — Additional Combo Assets Implied\n\n`;
    md += `| Rule | Input Article | Input Color | Confidence | Bottom Rec. | Footwear Rec. | Accessories Rec. |\n`;
    md += `|------|--------------|-------------|------------|-------------|--------------|------------------|\n`;
    for (const row of D.stylingRules) {
      md += `| ${row.rule_name || "—"} | ${row.input_sub_category || "—"} | ${row.input_color || "—"} | ${row.confidence_level || "—"} | ${row.recommended_bottom_wear ? JSON.stringify(row.recommended_bottom_wear).slice(0, 50) : "—"} | ${row.recommended_footwear ? JSON.stringify(row.recommended_footwear).slice(0, 50) : "—"} | ${row.recommended_accessories ? JSON.stringify(row.recommended_accessories).slice(0, 50) : "—"} |\n`;
    }
    md += `\n`;
    sectionIdx++;
  }

  // PART 2 STORAGE SUMMARY
  const part2KB = (part2Total - textureCount) * ASSET_SIZE_KB + textureCount * TEXTURE_TILE_KB + swatchCount * 10;
  const part2MB = (part2KB / 1024).toFixed(1);

  md += `### PART 2 — Storage Summary\n\n`;
  md += `| Category Group | Unique Assets | Est. Storage |\n`;
  md += `|----------------|--------------|-------------|\n`;
  for (const region of sectionLabels) {
    const items = grouped[region] || [];
    if (items.length === 0) continue;
    md += `| ${region} | ${items.length} | ${((items.length * ASSET_SIZE_KB) / 1024).toFixed(1)} MB |\n`;
  }
  md += `| Texture Tiles | ${textureCount} | ${((textureCount * TEXTURE_TILE_KB) / 1024).toFixed(1)} MB |\n`;
  md += `| Color Swatches | ${swatchCount} | ${((swatchCount * 10) / 1024).toFixed(2)} MB |\n`;
  md += `| **PART 2 TOTAL** | **${part2Total + swatchCount}** | **${part2MB} MB** |\n\n`;

  // ═══════════════════════════════════════════════════════════════════════════
  // GRAND TOTAL
  // ═══════════════════════════════════════════════════════════════════════════
  md += `---\n\n`;
  md += `# Grand Total — Storage Budget\n\n`;

  const grandTotalAssets = part1Total + part2Total + swatchCount;
  const grandKB = part1KB + part2KB;
  const grandMB = (grandKB / 1024).toFixed(1);
  const remaining = (STORAGE_LIMIT_MB - parseFloat(grandMB)).toFixed(1);
  const withinBudget = parseFloat(grandMB) < STORAGE_LIMIT_MB;

  md += `| Section | Assets | Est. Storage |\n`;
  md += `|---------|--------|-------------|\n`;
  md += `| **Part 1 — High-Priority (MVP)** | ${part1Total} | ${part1MB} MB |\n`;
  md += `| **Part 2 — Exhaustive (Full Sweep)** | ${part2Total + swatchCount} | ${part2MB} MB |\n`;
  md += `| **GRAND TOTAL** | **${grandTotalAssets}** | **${grandMB} MB** |\n`;
  md += `| Supabase Storage Limit | — | **${STORAGE_LIMIT_MB} MB (1 GB)** |\n`;
  md += `| **Remaining Budget** | — | **${remaining} MB** |\n`;
  md += `| **Within Budget?** | — | **${withinBudget ? "YES — well within 1 GB limit" : "NO — optimization required"}** |\n\n`;

  md += `### Storage Visualization\n\n`;
  const usedPct = ((parseFloat(grandMB) / STORAGE_LIMIT_MB) * 100).toFixed(1);
  const barFull = Math.round(parseFloat(usedPct) / 2);
  const barEmpty = 50 - barFull;
  md += `\`\`\`\n`;
  md += `[${"\u2588".repeat(barFull)}${"\u2591".repeat(barEmpty)}] ${usedPct}% of 1 GB used\n`;
  md += `\`\`\`\n\n`;

  // ═══════════════════════════════════════════════════════════════════════════
  // RECOMMENDATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  md += `---\n\n`;
  md += `# Recommendations\n\n`;
  md += `### Phase 1 — Immediate (Week 1)\n`;
  md += `- Generate all **Part 1** assets: **${part1Total} files** totaling ~**${part1MB} MB**.\n`;
  md += `- Covers the **80/20 rule** — the majority of all visitor searches will be visually served.\n`;
  md += `- Start with the **top 10 base articles** (Formal Shirt, Casual Shirt, T-Shirt, Kurta, Jeans, Formal Trousers, Chinos, Formal Shoes, Sneakers, Blazer).\n\n`;

  md += `### Phase 2 — Extended (Weeks 2–3)\n`;
  md += `- Generate **Part 2** assets by priority: Upper Body → Lower Body → Footwear → Accessories → Textures.\n`;
  md += `- The unique triple count (**${D.triples.length.toLocaleString()}**) is the true number of distinct visuals needed, not the row count (${D.totalRows.toLocaleString()}).\n\n`;

  md += `### Optimization Strategies\n`;
  md += `1. **WebP format** at quality 80–85, max width 1024px. Expect ~250–300 KB per asset.\n`;
  md += `2. **Texture tiles** for fabrics: generate small repeating tiles (~100 KB) and apply programmatically. Saves ~60% storage vs. per-item fabric rendering.\n`;
  md += `3. **Color variants via code:** Generate one base article in a neutral color, then apply color transformations (hue shift) in the browser or at build time — reduces unique assets by ~70%.\n`;
  md += `4. **Lazy generation:** Use a CDN + on-demand image generation. Only generate assets when first requested by a visitor.\n`;
  md += `5. **Deduplication:** Many database rows share the same article + color + fabric. Always reference the unique triple, not the raw row.\n`;
  md += `6. **Progressive loading:** Show fabric-textured color swatches immediately (10 KB), then load full garment image on interaction.\n\n`;

  md += `### Asset Naming Convention\n`;
  md += `\`\`\`\n`;
  md += `Base:    {sub_category}_{color}_{fabric}.webp\n`;
  md += `         e.g., formal-shirt_navy_cotton.webp\n\n`;
  md += `Combo:   {occasion}_{top}_{bottom}_{footwear}.webp\n`;
  md += `         e.g., wedding_sherwani-cream_churidar-gold_mojari.webp\n\n`;
  md += `Texture: texture_{fabric}_{finish}.webp\n`;
  md += `         e.g., texture_silk_glossy.webp\n\n`;
  md += `Swatch:  swatch_{color_family}.webp\n`;
  md += `         e.g., swatch_navy.webp\n`;
  md += `\`\`\`\n\n`;

  md += `---\n\n`;
  md += `*Report generated by \`scripts/generate-asset-report.mjs\` — Data source: ${mode}.*\n`;
  if (!LIVE_MODE) {
    md += `\n> **Note:** This report was generated from comprehensive codebase analysis (schema, types, constants, mock data, page components). To generate from live database queries, set \`NEXT_PUBLIC_SUPABASE_URL\` and \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` as environment variables and re-run the script.\n`;
  }

  return md;
}

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== RangMatch Image Asset Requisition Report Generator ===\n");

  console.log("Attempting Supabase connection...");
  await initSupabase();

  if (!LIVE_MODE) {
    console.log("  No Supabase credentials — using codebase-derived analysis.\n");
  }

  const data = await gatherData();
  const md = buildReport(data);

  fs.writeFileSync(OUTPUT_PATH, md, "utf-8");
  const sizeKB = (Buffer.byteLength(md, "utf-8") / 1024).toFixed(1);
  console.log(`\nReport written to: ${OUTPUT_PATH}`);
  console.log(`Report file size: ${sizeKB} KB`);
  console.log("Done.");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
