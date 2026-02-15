import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  if (!supabase) {
    return NextResponse.json({ profile: null });
  }
  const { searchParams } = new URL(req.url);
  const guestId = searchParams.get("guest_id");
  if (!guestId) {
    return NextResponse.json({ profile: null });
  }
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("guest_id", guestId)
    .maybeSingle();
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({
    profile: data
      ? {
          name: data.name,
          age: data.age,
          skinTone: data.skin_tone,
          bodyType: data.body_type,
          preferredOccasion: data.preferred_occasion,
        }
      : null,
  });
}

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json({ success: true });
  }
  try {
    const body = await req.json();
    const {
      guest_id: guestId,
      name,
      age,
      skinTone,
      bodyType,
      preferredOccasion,
    } = body;
    if (!guestId) {
      return NextResponse.json(
        { error: "guest_id required" },
        { status: 400 }
      );
    }
    const { error } = await supabase.from("user_profiles").upsert(
      {
        guest_id: guestId,
        name: name ?? null,
        age: age != null ? Number(age) : null,
        skin_tone: skinTone ?? null,
        body_type: bodyType ?? null,
        preferred_occasion: preferredOccasion ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "guest_id" }
    );
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save profile" },
      { status: 500 }
    );
  }
}
