"use client";

import { cn } from "@/lib/utils";

export function SearchResultsSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          : "grid-cols-1"
      )}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-neutral-grey/30 bg-white p-4"
          role="status"
          aria-label="Loading"
        >
          <div className="mb-3 h-24 w-full rounded-lg shimmer" />
          <div className="mb-2 h-3 w-1/3 rounded shimmer" />
          <div className="mb-2 h-4 w-full rounded shimmer" />
          <div className="h-4 w-2/3 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}
