"use client";

import { SKIN_TONES } from "@/types/fashion";
import { cn } from "@/lib/utils";

const SWATCH_COLORS: Record<string, string> = {
  Fair: "#f5d0c5",
  Wheatish: "#e8c4a0",
  Medium: "#c4a574",
  Dusky: "#8d5524",
  Deep: "#5c3317",
};

interface SkinTonePickerProps {
  value: string | null;
  onChange: (tone: string) => void;
  className?: string;
}

export function SkinTonePicker({ value, onChange, className }: SkinTonePickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-neutral-black">Skin Tone / त्वचा का रंग</p>
      <div className="flex flex-wrap gap-3">
        {SKIN_TONES.map((tone) => (
          <button
            key={tone}
            type="button"
            onClick={() => onChange(tone)}
            className={cn(
              "flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm transition",
              value === tone
                ? "border-primary-navy bg-primary-navy/10"
                : "border-neutral-grey/30 hover:border-primary-navy/50"
            )}
          >
            <span
              className="h-6 w-6 shrink-0 rounded-full border border-neutral-grey/50 shadow-inner"
              style={{ backgroundColor: SWATCH_COLORS[tone] ?? "#ccc" }}
              aria-hidden
            />
            <span>{tone}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
