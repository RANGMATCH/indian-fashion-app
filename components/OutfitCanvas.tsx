"use client";

import { useState } from "react";
import type { FashionItem } from "@/types/fashion";
import { getHexForItem } from "@/lib/constants";
import { Shirt, Circle, Footprints, Watch } from "lucide-react";
import { cn } from "@/lib/utils";

export type Slot = "top" | "bottom" | "footwear" | "accessories";

const SLOT_LABELS: Record<Slot, string> = {
  top: "Top Wear",
  bottom: "Bottom Wear",
  footwear: "Footwear",
  accessories: "Accessories",
};

const SLOT_ICONS: Record<Slot, typeof Shirt> = {
  top: Shirt,
  bottom: Circle,
  footwear: Footprints,
  accessories: Watch,
};

interface OutfitCanvasProps {
  topItem: FashionItem | null;
  bottomItem: FashionItem | null;
  footwearItem: FashionItem | null;
  accessoriesItem: FashionItem | null;
  onSelectSlot: (slot: Slot) => void;
  selectedSlot: Slot | null;
  onClearSlot: (slot: Slot) => void;
  className?: string;
}

export function OutfitCanvas({
  topItem,
  bottomItem,
  footwearItem,
  accessoriesItem,
  onSelectSlot,
  selectedSlot,
  onClearSlot,
  className,
}: OutfitCanvasProps) {
  const slots: { key: Slot; item: FashionItem | null }[] = [
    { key: "top", item: topItem },
    { key: "bottom", item: bottomItem },
    { key: "footwear", item: footwearItem },
    { key: "accessories", item: accessoriesItem },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {slots.map(({ key, item }) => {
        const Icon = SLOT_ICONS[key];
        const isSelected = selectedSlot === key;
        return (
          <div
            key={key}
            className={cn(
              "rounded-xl border-2 border-dashed p-4 transition",
              isSelected ? "border-primary-navy bg-primary-navy/5" : "border-neutral-grey/40 bg-white"
            )}
          >
            <button
              type="button"
              onClick={() => onSelectSlot(key)}
              className="flex w-full flex-col items-center gap-2 text-left"
            >
              <Icon className="h-8 w-8 text-primary-navy" />
              <span className="font-medium">{SLOT_LABELS[key]}</span>
              {item ? (
                <>
                  <div
                    className="h-12 w-full rounded-lg border border-black/10"
                    style={{ backgroundColor: getHexForItem(item) }}
                  />
                  <p className="line-clamp-2 text-sm text-neutral-grey">
                    {item.keyword_english || item.sub_category || item.unique_id}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onClearSlot(key); }}
                    className="text-xs text-primary-maroon hover:underline"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <span className="text-sm text-neutral-grey">Click to add</span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
