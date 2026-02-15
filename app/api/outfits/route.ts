import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { SavedOutfit } from "@/types/fashion";

export async function GET(req: Request) {
  if (!supabase) {
    return NextResponse.json({ outfits: [] });
  }
  const { searchParams } = new URL(req.url);
  const guestId = searchParams.get("guest_id");
  if (!guestId) {
    return NextResponse.json({ outfits: [] });
  }
  const { data, error } = await supabase
    .from("saved_outfits")
    .select("id, name, items, image_url, created_at")
    .eq("guest_id", guestId)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  const outfits: SavedOutfit[] = (data ?? []).map((row: { id: string; name: string; items: unknown; image_url: string | null; created_at: string }) => ({
    id: row.id,
    name: row.name,
    items: Array.isArray(row.items) ? row.items : [],
    image_url: row.image_url,
    created_at: row.created_at,
  }));
  return NextResponse.json({ outfits });
}
