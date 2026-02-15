"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { SkinTonePicker } from "./SkinTonePicker";
import { BodyTypeSelector } from "./BodyTypeSelector";
import { OCCASIONS, CONFIDENCE_LEVELS } from "@/types/fashion";
import { cn } from "@/lib/utils";
import type { SearchFilters } from "@/types/fashion";

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (f: SearchFilters) => void;
  className?: string;
}

export function FilterPanel({ filters, onFiltersChange, className }: FilterPanelProps) {
  const [openSection, setOpenSection] = useState<string | null>("skin");

  const update = (key: keyof SearchFilters, value: string | number | undefined) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onFiltersChange({});
  };

  const activeCount = [
    filters.skinTone,
    filters.occasion,
    filters.bodyType,
    filters.confidenceLevel,
    filters.colorFamily,
    filters.priceMin,
    filters.priceMax,
  ].filter((v) => v !== undefined && v !== "").length;

  const COLOR_FAMILIES = ["Navy", "Maroon", "White", "Black", "Olive", "Cream", "Grey", "Blue", "Red", "Green"];

  return (
    <aside className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="font-medium">Filters</span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-primary-maroon hover:underline"
          >
            <X className="h-4 w-4" /> Clear all
          </button>
        )}
      </div>

      {/* Skin Tone */}
      <section className="rounded-lg border border-neutral-grey/30 bg-white p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-medium"
          onClick={() => setOpenSection(openSection === "skin" ? null : "skin")}
        >
          Skin Tone
          <ChevronDown className={cn("h-4 w-4 transition", openSection === "skin" && "rotate-180")} />
        </button>
        {openSection === "skin" && (
          <SkinTonePicker
            value={filters.skinTone ?? null}
            onChange={(v) => update("skinTone", v)}
          />
        )}
      </section>

      {/* Occasion */}
      <section className="rounded-lg border border-neutral-grey/30 bg-white p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-medium"
          onClick={() => setOpenSection(openSection === "occasion" ? null : "occasion")}
        >
          Occasion
          <ChevronDown className={cn("h-4 w-4 transition", openSection === "occasion" && "rotate-180")} />
        </button>
        {openSection === "occasion" && (
          <div className="mt-2 flex flex-wrap gap-2">
            {OCCASIONS.map((occ) => (
              <button
                key={occ}
                type="button"
                onClick={() => update("occasion", filters.occasion === occ ? undefined : occ)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
                  filters.occasion === occ ? "bg-primary-navy text-white" : "bg-neutral-grey/20 hover:bg-neutral-grey/30"
                )}
              >
                {occ}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Body Type */}
      <section className="rounded-lg border border-neutral-grey/30 bg-white p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-medium"
          onClick={() => setOpenSection(openSection === "body" ? null : "body")}
        >
          Body Type
          <ChevronDown className={cn("h-4 w-4 transition", openSection === "body" && "rotate-180")} />
        </button>
        {openSection === "body" && (
          <BodyTypeSelector
            value={filters.bodyType ?? null}
            onChange={(v) => update("bodyType", v)}
          />
        )}
      </section>

      {/* Confidence */}
      <section className="rounded-lg border border-neutral-grey/30 bg-white p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-medium"
          onClick={() => setOpenSection(openSection === "confidence" ? null : "confidence")}
        >
          Confidence Level
          <ChevronDown className={cn("h-4 w-4 transition", openSection === "confidence" && "rotate-180")} />
        </button>
        {openSection === "confidence" && (
          <div className="mt-2 flex flex-wrap gap-2">
            {CONFIDENCE_LEVELS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update("confidenceLevel", filters.confidenceLevel === c ? undefined : c)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
                  filters.confidenceLevel === c ? "bg-primary-navy text-white" : "bg-neutral-grey/20 hover:bg-neutral-grey/30"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Color Family */}
      <section className="rounded-lg border border-neutral-grey/30 bg-white p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-medium"
          onClick={() => setOpenSection(openSection === "color" ? null : "color")}
        >
          Color Family
          <ChevronDown className={cn("h-4 w-4 transition", openSection === "color" && "rotate-180")} />
        </button>
        {openSection === "color" && (
          <div className="mt-2 flex flex-wrap gap-2">
            {COLOR_FAMILIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update("colorFamily", filters.colorFamily === c ? undefined : c)}
                className={cn(
                  "rounded-full px-3 py-1 text-sm",
                  filters.colorFamily === c ? "bg-primary-navy text-white" : "bg-neutral-grey/20 hover:bg-neutral-grey/30"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Price Range */}
      <section className="rounded-lg border border-neutral-grey/30 bg-white p-3">
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-medium"
          onClick={() => setOpenSection(openSection === "price" ? null : "price")}
        >
          Price Range (₹)
          <ChevronDown className={cn("h-4 w-4 transition", openSection === "price" && "rotate-180")} />
        </button>
        {openSection === "price" && (
          <div className="mt-2 space-y-2">
            <label className="block text-xs text-neutral-grey">
              Min: ₹{filters.priceMin ?? 0}
              <input
                type="range"
                min={0}
                max={50000}
                step={500}
                value={filters.priceMin ?? 0}
                onChange={(e) => update("priceMin", parseInt(e.target.value, 10))}
                className="mt-1 w-full"
              />
            </label>
            <label className="block text-xs text-neutral-grey">
              Max: ₹{filters.priceMax ?? 50000}
              <input
                type="range"
                min={0}
                max={50000}
                step={500}
                value={filters.priceMax ?? 50000}
                onChange={(e) => update("priceMax", parseInt(e.target.value, 10))}
                className="mt-1 w-full"
              />
            </label>
          </div>
        )}
      </section>
    </aside>
  );
}
