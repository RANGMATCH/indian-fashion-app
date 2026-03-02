"use client";

import { useState, useCallback } from "react";

export type GarmentSlot = "shirt" | "trouser" | "shoes" | "belt";

type ColorState = Record<GarmentSlot, string>;

const DEFAULT_COLORS: ColorState = {
  shirt: "#F5F0EB",
  trouser: "#111827",
  shoes: "#111827",
  belt: "#4E342E",
};

export function useRecolorEngine() {
  const [colors, setColors] = useState<ColorState>(DEFAULT_COLORS);

  const setItemColor = useCallback((slot: GarmentSlot, hex: string) => {
    setColors((prev) => ({ ...prev, [slot]: hex }));
  }, []);

  const setAllColors = useCallback((next: Partial<ColorState>) => {
    setColors((prev) => ({ ...prev, ...next }));
  }, []);

  return { colors, setItemColor, setAllColors };
}
