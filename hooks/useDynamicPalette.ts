"use client";

import { useEffect, useMemo, useState } from "react";
import { GROUP_LABELS, INDIAN_FASHION_PALETTE, PALETTE_GROUPS, type PaletteGroup } from "@/lib/data/indianPalette";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";

interface PaletteRow {
  name: string;
  name_hi: string | null;
  hex: string;
  group_name: PaletteGroup;
  sort_order: number | null;
}

export interface DynamicSwatch {
  name: string;
  nameHi: string;
  hex: string;
  group: PaletteGroup;
}

const FALLBACK_SWATCHES: DynamicSwatch[] = INDIAN_FASHION_PALETTE;

export function useDynamicPalette() {
  const [swatches, setSwatches] = useState<DynamicSwatch[]>(FALLBACK_SWATCHES);

  useEffect(() => {
    let mounted = true;

    async function loadPalette() {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      const { data, error } = await supabase
        .from("webgpu_color_palette")
        .select("name,name_hi,hex,group_name,sort_order")
        .order("sort_order", { ascending: true })
        .limit(120);

      if (error || !data?.length || !mounted) return;

      const mapped: DynamicSwatch[] = (data as PaletteRow[])
        .filter((row) => PALETTE_GROUPS.includes(row.group_name))
        .map((row) => ({
          name: row.name,
          nameHi: row.name_hi || row.name,
          hex: row.hex,
          group: row.group_name,
        }));

      if (mapped.length) setSwatches(mapped);
    }

    loadPalette().catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const grouped = useMemo(
    () =>
      PALETTE_GROUPS.reduce(
        (acc, group) => {
          acc[group] = swatches.filter((swatch) => swatch.group === group);
          return acc;
        },
        {} as Record<PaletteGroup, DynamicSwatch[]>
      ),
    [swatches]
  );

  return { swatches, grouped, labels: GROUP_LABELS };
}
