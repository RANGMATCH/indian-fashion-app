import { NextResponse } from "next/server";
import { searchItems } from "@/lib/api/fashion";
import type { SearchFilters } from "@/types/fashion";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const skinTone = searchParams.get("skinTone") ?? undefined;
  const occasion = searchParams.get("occasion") ?? undefined;
  const bodyType = searchParams.get("bodyType") ?? undefined;
  const confidenceLevel = searchParams.get("confidenceLevel") ?? undefined;
  const colorFamily = searchParams.get("colorFamily") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const page = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));
  const pageSize = Math.min(50, Math.max(10, parseInt(searchParams.get("pageSize") ?? "20", 10)));

  const filters: SearchFilters = {
    ...(skinTone && { skinTone }),
    ...(occasion && { occasion }),
    ...(bodyType && { bodyType }),
    ...(confidenceLevel && { confidenceLevel }),
    ...(colorFamily && { colorFamily }),
    ...(sort && (sort === "popular" || sort === "recent" || sort === "price_low" || sort === "price_high") && { sort }),
    ...(priceMin != null && priceMin !== "" && { priceMin: parseInt(priceMin, 10) }),
    ...(priceMax != null && priceMax !== "" && { priceMax: parseInt(priceMax, 10) }),
  };

  const { data, error, count } = await searchItems(q, filters, page, pageSize);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}
