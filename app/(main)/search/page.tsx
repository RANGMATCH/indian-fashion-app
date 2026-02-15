"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { ItemCard } from "@/components/ItemCard";
import { SearchResultsSkeleton } from "@/components/SearchResultsSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { searchItems } from "@/lib/api/fashion";
import type { FashionItem, SearchFilters, SortOption } from "@/types/fashion";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 20;
const SORT_LABELS: Record<SortOption, string> = {
  popular: "Popular",
  recent: "Recent",
  price_low: "Price (low)",
  price_high: "Price (high)",
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";
  const occasionFromUrl = searchParams.get("occasion") ?? undefined;

  const [query, setQuery] = useState(qFromUrl);
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    ...(occasionFromUrl && { occasion: occasionFromUrl }),
  }));
  const [items, setItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortOption>("popular");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(qFromUrl);
  }, [qFromUrl]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchItems(query, { ...filters, sort }, page, PAGE_SIZE).then(({ data, error: err, count }) => {
      if (cancelled) return;
      setItems(data);
      setTotalCount(count);
      setLoading(false);
      if (err) setError("कुछ गड़बड़ हो गई। फिर से कोशिश करें।");
    });
    return () => { cancelled = true; };
  }, [query, filters, sort, page]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">
      <h1 className="text-2xl font-bold text-neutral-black">Search</h1>
      <p className="text-neutral-grey">Hindi / English / Hinglish — search karein</p>

      <div className="mt-4">
        <SearchBar
          defaultValue={query}
          placeholder="आउटफिट खोजें... / Search outfits"
          onSearch={(q) => { setQuery(q); setPage(0); }}
          loading={loading}
        />
      </div>

      <div className="mt-6 flex gap-6">
        <div className="hidden w-64 shrink-0 lg:block">
          <FilterPanel filters={filters} onFiltersChange={(f) => { setFilters(f); setPage(0); }} />
        </div>

        <div className="min-w-0 flex-1">
          <details className="mb-4 lg:hidden">
            <summary className="cursor-pointer font-medium">Filters / फ़िल्टर</summary>
            <div className="mt-2">
              <FilterPanel filters={filters} onFiltersChange={(f) => { setFilters(f); setPage(0); }} />
            </div>
          </details>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-neutral-grey">
              {loading ? "Loading..." : `${totalCount} results`}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-grey">Sort:</span>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortOption); setPage(0); }}
                className="rounded border border-neutral-grey/50 px-2 py-1 text-sm"
                aria-label="Sort results"
              >
                <option value="popular">{SORT_LABELS.popular}</option>
                <option value="recent">{SORT_LABELS.recent}</option>
                <option value="price_low">{SORT_LABELS.price_low}</option>
                <option value="price_high">{SORT_LABELS.price_high}</option>
              </select>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn("rounded p-1", viewMode === "grid" && "bg-primary-navy/20")}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={cn("rounded p-1", viewMode === "list" && "bg-primary-navy/20")}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <SearchResultsSkeleton viewMode={viewMode} />
          ) : error ? (
            <ErrorState
              icon="🔍"
              title="कोई outfit नहीं मिला"
              message="Filters बदलकर फिर से try करें"
              action={{
                label: "Reset Filters",
                onClick: () => { setQuery(""); setFilters({}); setPage(0); setError(null); },
              }}
            />
          ) : items.length === 0 ? (
            <ErrorState
              icon="🔍"
              title="कोई outfit नहीं मिला"
              message="No results. Try different keywords or filters. कीवर्ड या फ़िल्टर बदलें।"
              action={{
                label: "Reset Filters",
                onClick: () => { setQuery(""); setFilters({}); setPage(0); },
              }}
            />
          ) : (
            <div
              className={cn(
                "grid gap-4",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {items.map((item) => (
                <ItemCard
                  key={item.unique_id}
                  item={item}
                  showSocialScore
                  compact={viewMode === "list"}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && !loading && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-lg border border-primary-navy px-4 py-2 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center px-4 text-sm">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="rounded-lg border border-primary-navy px-4 py-2 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
