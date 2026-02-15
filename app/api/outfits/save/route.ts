import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured. Run supabase_migration_outfits_profiles.sql and add Supabase env." },
      { status: 503 }
    );
  }
  try {
    const body = await req.json();
    const { name, items, guest_id: guestId } = body as {
      name?: string;
      items: string[];
      guest_id?: string;
    };
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "items array required" },
        { status: 400 }
      );
    }
    const guest_id = guestId ?? null;
    const { data, error } = await supabase
      .from("saved_outfits")
      .insert({
        guest_id,
        name: name ?? "My Outfit",
        items: items as unknown as Record<string, unknown>,
      })
      .select("id, name, created_at")
      .single();
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ id: data.id, success: true, outfit: data });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save" },
      { status: 500 }
    );
  }
}
