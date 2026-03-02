"use client";

import { useMemo, useState } from "react";
import type { RefObject } from "react";
import type { GarmentSlot } from "@/hooks/useRecolorEngine";
import { RecolorEngine } from "@/components/rendering/RecolorEngine";
import { calculateHarmonyScore } from "@/lib/canvas/recolor";
import { GARMENT_ASSETS } from "@/lib/data/garmentAssets";
import { GROUP_LABELS, INDIAN_FASHION_PALETTE, PALETTE_GROUPS, type PaletteGroup } from "@/lib/data/indianPalette";

interface SplitScreenPreviewProps {
  colors: Record<GarmentSlot, string>;
  onColorChange: (slot: GarmentSlot, hex: string, colorName: string) => void;
  onSlotClick: (slot: GarmentSlot) => void;
  activeSlot: GarmentSlot;
  onSave: () => void;
  canvasRefs: Record<GarmentSlot, RefObject<HTMLCanvasElement>>;
}

const SLOT_META: Record<GarmentSlot, { label: string; category: "topwear" | "bottomwear" | "footwear" | "accessories" }> = {
  shirt: { label: "Shirt", category: "topwear" },
  trouser: { label: "Trouser", category: "bottomwear" },
  shoes: { label: "Shoes", category: "footwear" },
  belt: { label: "Belt", category: "accessories" },
};

const SLOT_ORDER: GarmentSlot[] = ["shirt", "belt", "trouser", "shoes"];

const DEFAULT_KEYS: Record<GarmentSlot, string> = {
  shirt: "formal_shirt",
  trouser: "trouser",
  shoes: "chelsea_shoes",
  belt: "belt",
};

export function SplitScreenPreview({ colors, onColorChange, onSlotClick, activeSlot, onSave, canvasRefs }: SplitScreenPreviewProps) {
  const [group, setGroup] = useState<PaletteGroup>("classic");
  const [showGarmentPicker, setShowGarmentPicker] = useState(false);
  const [slotAssetKeys, setSlotAssetKeys] = useState<Record<GarmentSlot, string>>(DEFAULT_KEYS);

  const harmonyScore = useMemo(
    () => calculateHarmonyScore([colors.shirt, colors.trouser, colors.shoes, colors.belt]),
    [colors]
  );

  const groupedColors = useMemo(
    () =>
      PALETTE_GROUPS.reduce(
        (acc, g) => {
          acc[g] = INDIAN_FASHION_PALETTE.filter((swatch) => swatch.group === g);
          return acc;
        },
        {} as Record<PaletteGroup, typeof INDIAN_FASHION_PALETTE>
      ),
    []
  );

  const garmentOptions = useMemo(() => {
    const category = SLOT_META[activeSlot].category;
    return Object.entries(GARMENT_ASSETS).filter(([, value]) => value.category === category);
  }, [activeSlot]);

  return (
    <div className="flex h-full flex-col bg-offwhite px-3 pt-3 pb-2">
      <div className="mb-2 flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-card">
        <div>
          <p className="text-xs text-maroon-700">Harmony Score</p>
          <p className="text-sm font-semibold text-maroon-900">{harmonyScore}%</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          className="touch-feedback min-h-[44px] rounded-full bg-maroon-800 px-4 text-xs font-semibold text-white"
        >
          Save karo 💾
        </button>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2 overflow-hidden">
        {SLOT_ORDER.map((slot) => {
          const asset = GARMENT_ASSETS[slotAssetKeys[slot]];
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSlotClick(slot)}
              className={`rounded-xl border bg-white p-2 text-left ${activeSlot === slot ? "border-maroon-700" : "border-maroon-200"}`}
            >
              <div className="mb-1 flex items-center justify-between">
                <p className="text-xs font-semibold text-maroon-900">{SLOT_META[slot].label}</p>
                {slot === activeSlot ? <span className="text-[10px] text-maroon-700">Step 1/3</span> : null}
              </div>
              <RecolorEngine
                canvasRef={canvasRefs[slot]}
                selectedColor={colors[slot]}
                baseUrl={asset.baseUrl}
                maskUrl={asset.maskUrl}
                idmapUrl={asset.idmapUrl}
                width={128}
                height={118}
                className="h-[118px] w-full rounded-lg"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-2 rounded-xl bg-white p-2 shadow-card">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-maroon-900">Active: {SLOT_META[activeSlot].label}</p>
          <button
            type="button"
            onClick={() => setShowGarmentPicker((prev) => !prev)}
            className="touch-feedback min-h-[44px] rounded-full border border-maroon-300 px-3 text-xs font-semibold text-maroon-800"
          >
            Type बदलो
          </button>
        </div>

        <div className="mb-2 flex gap-1 overflow-x-auto scrollbar-hide">
          {PALETTE_GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroup(g)}
              className={`touch-feedback min-h-[44px] rounded-full border px-3 text-xs font-semibold ${
                g === group ? "border-maroon-700 bg-maroon-800 text-white" : "border-maroon-200 text-maroon-800"
              }`}
            >
              {GROUP_LABELS[g].en}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {groupedColors[group].map((swatch) => (
            <button
              key={`${activeSlot}-${swatch.hex}`}
              type="button"
              onClick={() => onColorChange(activeSlot, swatch.hex, swatch.name)}
              className={`touch-feedback min-h-[44px] min-w-[44px] rounded-full border-2 ${
                colors[activeSlot] === swatch.hex ? "border-maroon-900" : "border-maroon-200"
              }`}
              style={{ backgroundColor: swatch.hex }}
              aria-label={`${swatch.name}-${swatch.nameHi}`}
              title={`${swatch.name} / ${swatch.nameHi}`}
            />
          ))}
        </div>
      </div>

      {showGarmentPicker ? (
        <div className="mt-2 rounded-xl border border-maroon-200 bg-white p-2">
          <p className="mb-2 text-xs font-semibold text-maroon-900">Garment type for {SLOT_META[activeSlot].label}</p>
          <div className="flex flex-wrap gap-2">
            {garmentOptions.map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSlotAssetKeys((prev) => ({ ...prev, [activeSlot]: key }));
                  setShowGarmentPicker(false);
                }}
                className={`touch-feedback min-h-[44px] rounded-full border px-3 text-xs font-semibold ${
                  slotAssetKeys[activeSlot] === key ? "border-maroon-700 bg-maroon-50 text-maroon-900" : "border-maroon-200 text-maroon-800"
                }`}
              >
                {item.icon} {item.label.en}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
