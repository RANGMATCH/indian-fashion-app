import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const previewBucket = process.env.NEXT_PUBLIC_PREVIEW_BUCKET || "recolor_assets";

  if (!url || !anonKey) {
    return NextResponse.json(
      {
        ok: false,
        message: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
      },
      { status: 500 }
    );
  }

  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });

  const previewCheck = await supabase.from("preview_images").select("id,url,storage_path", { count: "exact", head: false }).limit(3);
  const paletteCheck = await supabase.from("webgpu_color_palette").select("id", { count: "exact", head: true });

  return NextResponse.json({
    ok: !previewCheck.error && !paletteCheck.error,
    previewBucket,
    previewImages: {
      count: previewCheck.count ?? 0,
      error: previewCheck.error?.message ?? null,
      sample: previewCheck.data ?? [],
    },
    palette: {
      count: paletteCheck.count ?? 0,
      error: paletteCheck.error?.message ?? null,
    },
  });
}
