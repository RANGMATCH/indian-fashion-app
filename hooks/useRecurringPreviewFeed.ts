"use client";

import { useEffect, useState } from "react";
import type { RecurringLook, RecurringSection } from "@/lib/data/recurringFeed";
import { FALLBACK_RECURRING_SECTIONS } from "@/lib/data/recurringFeed";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";

interface PreviewImageRow {
  id: string;
  name: string;
  url: string | null;
  storage_path: string | null;
  combo_type: string | null;
  rules_description: string | null;
  type: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const PREVIEW_BUCKET = process.env.NEXT_PUBLIC_PREVIEW_BUCKET || "recolor_assets";

function buildPreviewUrl(row: PreviewImageRow) {
  if (row.url) return row.url;
  if (!row.storage_path || !SUPABASE_URL) return "";
  const cleanPath = row.storage_path.replace(/^\/+/, "");
  return `${SUPABASE_URL}/storage/v1/object/public/${PREVIEW_BUCKET}/${cleanPath}`;
}

function normalizeSectionId(v: string) {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function toRecurringSections(rows: PreviewImageRow[]): RecurringSection[] {
  const grouped = rows.reduce(
    (acc, row) => {
      const key = row.combo_type?.trim() || row.type || "featured";
      if (!acc[key]) acc[key] = [];
      acc[key].push(row);
      return acc;
    },
    {} as Record<string, PreviewImageRow[]>
  );

  return Object.entries(grouped)
    .slice(0, 4)
    .map(([key, groupRows]) => {
      const looks: RecurringLook[] = groupRows.slice(0, 8).map((row) => ({
        id: row.id,
        title: row.name,
        subtitle: row.rules_description || "Handpicked recurring color recipe",
        imageUrl: buildPreviewUrl(row),
        tag: row.type,
      }));

      return {
        id: normalizeSectionId(key),
        heading: key.replace(/_/g, " "),
        subheading: "Supabase live feed se curated outfits",
        looks,
      };
    })
    .filter((section) => section.looks.some((look) => Boolean(look.imageUrl)));
}

export function useRecurringPreviewFeed() {
  const [sections, setSections] = useState<RecurringSection[]>(FALLBACK_RECURRING_SECTIONS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      const { data, error } = await supabase
        .from("preview_images")
        .select("id,name,url,storage_path,combo_type,rules_description,type")
        .order("sort_order", { ascending: true })
        .limit(48);

      if (error) return;
      setIsLive(true);
      if (!data?.length) return;

      const transformed = toRecurringSections(data as PreviewImageRow[]);
      if (!transformed.length || !mounted) return;

      setSections(transformed);
      setIsLive(true);
    }

    load().catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  return { sections, isLive };
}
