import { supabase } from "@/lib/supabase";
import type { FashionItem, SearchFilters, SortOption } from "@/types/fashion";
import { MOCK_FASHION_ITEMS } from "@/lib/mockData";

const TABLE = "mens_fashion_items";

function withFallback<T>(data: T[], fallback: T[], maxFallback = 20): T[] {
  if (data && data.length > 0) return data;
  return fallback.slice(0, maxFallback);
}

/** Parse price_range like "₹1,500 – ₹5,000" to min/max */
function parsePriceRange(priceRange: string | null | undefined): { min: number; max: number } | null {
  if (!priceRange || typeof priceRange !== "string") return null;
  const match = priceRange.match(/₹?\s*([\d,]+)\s*[–\-]\s*₹?\s*([\d,]+)/);
  if (!match) return null;
  const min = parseInt(match[1].replace(/,/g, ""), 10);
  const max = parseInt(match[2].replace(/,/g, ""), 10);
  if (isNaN(min) || isNaN(max)) return null;
  return { min, max };
}

function applyPriceFilter(items: FashionItem[], priceMin?: number, priceMax?: number): FashionItem[] {
  if (priceMin == null && priceMax == null) return items;
  return items.filter((item) => {
    const range = parsePriceRange(item.price_range);
    if (!range) return true;
    const avg = (range.min + range.max) / 2;
    if (priceMin != null && avg < priceMin) return false;
    if (priceMax != null && avg > priceMax) return false;
    return true;
  });
}

/**
 * Search items with optional filters and sort. Uses ilike for Hindi/English/Hinglish.
 * Price filter applied in-memory when price_range is text.
 */
export async function searchItems(
  query: string,
  filters: SearchFilters,
  page = 0,
  pageSize = 20
): Promise<{ data: FashionItem[]; error: Error | null; count: number }> {
  const sort: SortOption = filters.sort ?? "popular";
  if (!supabase) {
    let mock = MOCK_FASHION_ITEMS.slice();
    mock = applyPriceFilter(mock, filters.priceMin, filters.priceMax);
    const count = mock.length;
    mock = applySort(mock, sort);
    const from = page * pageSize;
    const data = mock.slice(from, from + pageSize);
    return { data, error: null, count };
  }
  let q = supabase
    .from(TABLE)
    .select("*", { count: "exact" })
    .eq("is_active", true);

  const trimmed = query.trim();
  if (trimmed) {
    const safe = trimmed.replace(/[,()]/g, " ").trim().slice(0, 100);
    const pattern = `%${safe}%`;
    q = q.or(
      `keyword_hindi.ilike.${pattern},keyword_hinglish.ilike.${pattern},keyword_english.ilike.${pattern},sub_category.ilike.${pattern}`
    );
  }
  if (filters.skinTone) q = q.eq("skin_tone", filters.skinTone);
  if (filters.occasion) q = q.eq("occasion", filters.occasion);
  if (filters.bodyType) q = q.eq("body_type", filters.bodyType);
  if (filters.confidenceLevel) q = q.eq("confidence_level", filters.confidenceLevel);
  if (filters.colorFamily) q = q.eq("color_family", filters.colorFamily);
  if (filters.category) q = q.eq("category", filters.category);

  switch (sort) {
    case "recent":
      q = q.order("created_at", { ascending: false });
      break;
    case "price_low":
    case "price_high":
      q = q.order("popularity_score", { ascending: false });
      break;
    default:
      q = q.order("popularity_score", { ascending: false });
  }
  const from = page * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await q.range(from, to);
  let list = (data as FashionItem[]) ?? [];
  list = applyPriceFilter(list, filters.priceMin, filters.priceMax);
  const withMock = withFallback(list, MOCK_FASHION_ITEMS, pageSize);
  const toReturn = withMock === list ? list : applyPriceFilter(withMock, filters.priceMin, filters.priceMax);
  return {
    data: toReturn,
    error: error as Error | null,
    count: count ?? (list.length === 0 ? MOCK_FASHION_ITEMS.length : 0),
  };
}

function applySort(items: FashionItem[], sort: SortOption): FashionItem[] {
  const arr = [...items];
  switch (sort) {
    case "recent":
      return arr.sort((a, b) => {
        const aT = (a as { created_at?: string })?.created_at ?? "";
        const bT = (b as { created_at?: string })?.created_at ?? "";
        return bT.localeCompare(aT);
      });
    case "price_low":
      return arr.sort((a, b) => {
        const aR = parsePriceRange(a.price_range);
        const bR = parsePriceRange(b.price_range);
        const aAvg = aR ? (aR.min + aR.max) / 2 : 0;
        const bAvg = bR ? (bR.min + bR.max) / 2 : 0;
        return aAvg - bAvg;
      });
    case "price_high":
      return arr.sort((a, b) => {
        const aR = parsePriceRange(a.price_range);
        const bR = parsePriceRange(b.price_range);
        const aAvg = aR ? (aR.min + aR.max) / 2 : 0;
        const bAvg = bR ? (bR.min + bR.max) / 2 : 0;
        return bAvg - aAvg;
      });
    default:
      return arr.sort((a, b) => (b.popularity_score ?? 0) - (a.popularity_score ?? 0));
  }
}

/**
 * RPC search (use when search_fashion_items function exists in Supabase)
 */
export async function searchHindiRpc(
  searchQuery: string
): Promise<{ data: FashionItem[]; error: Error | null }> {
  if (!supabase) return { data: [], error: new Error("Supabase not configured") };
  const { data, error } = await supabase.rpc("search_fashion_items", {
    search_query: searchQuery,
  });
  return {
    data: (data as FashionItem[]) ?? [],
    error: error as Error | null,
  };
}

/**
 * Get single item by unique_id
 */
export async function getItem(
  uniqueId: string
): Promise<{ data: FashionItem | null; error: Error | null }> {
  if (!supabase) {
    const mock = MOCK_FASHION_ITEMS.find((x) => x.unique_id === uniqueId) ?? null;
    return { data: mock, error: null };
  }
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("unique_id", uniqueId)
    .eq("is_active", true)
    .single();
  const list = (data as FashionItem | null) ?? null;
  const withMock = list ?? MOCK_FASHION_ITEMS.find((x) => x.unique_id === uniqueId) ?? null;
  return { data: withMock, error: error as Error | null };
}

/**
 * Get outfit suggestions (e.g. bottoms, footwear, accessories) for a given context
 */
export async function getOutfitSuggestions(params: {
  occasion: string;
  skinTone?: string;
  categoryIn: string[];
  limit?: number;
}): Promise<{ data: FashionItem[]; error: Error | null }> {
  if (!supabase) return { data: MOCK_FASHION_ITEMS.slice(0, params.limit ?? 10), error: null };
  let q = supabase
    .from(TABLE)
    .select("*")
    .eq("is_active", true)
    .eq("occasion", params.occasion)
    .in("category", params.categoryIn);

  if (params.skinTone) q = q.eq("skin_tone", params.skinTone);

  const { data, error } = await q
    .limit(params.limit ?? 10)
    .order("popularity_score", { ascending: false });
  const list = (data as FashionItem[]) ?? [];
  const withMock = withFallback(list, MOCK_FASHION_ITEMS, params.limit ?? 10);
  return {
    data: withMock,
    error: error as Error | null,
  };
}

/** Categories in DB: Western Wear, Men's Wear, Footwear, Accessories - we query multiple for top/bottom */
const TOP_BOTTOM_CATEGORIES = ["Western Wear", "Men's Wear"];

/**
 * Fetch items by category for outfit builder (e.g. Top Wear, Bottom Wear, Footwear)
 * For top/bottom we use multiple categories so items show even when DB has "Men's Wear".
 */
export async function getItemsByCategory(
  category: string,
  occasion?: string,
  skinTone?: string,
  limit = 20
): Promise<{ data: FashionItem[]; error: Error | null }> {
  if (!supabase) return { data: MOCK_FASHION_ITEMS.slice(0, limit), error: null };
  const categories = category === "Western Wear" ? TOP_BOTTOM_CATEGORIES : [category];
  let q = supabase
    .from(TABLE)
    .select("*")
    .eq("is_active", true)
    .in("category", categories);

  if (occasion) q = q.eq("occasion", occasion);
  if (skinTone) q = q.eq("skin_tone", skinTone);

  const { data, error } = await q.limit(limit).order("popularity_score", { ascending: false });
  const list = (data as FashionItem[]) ?? [];
  const withMock = withFallback(list, MOCK_FASHION_ITEMS, limit);
  return {
    data: withMock,
    error: error as Error | null,
  };
}
