import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * GET /api/supabase-status
 * Checks if Supabase is linked and returns row count for mens_fashion_items.
 * Use this to verify: Supabase se application link hai ya nahi.
 */
export async function GET() {
  if (!supabase) {
    return NextResponse.json({
      connected: false,
      message: "Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
    });
  }

  try {
    const { count, error } = await supabase
      .from("mens_fashion_items")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json({
        connected: true,
        error: error.message,
        message: "Connected but query failed. Maybe table not created yet? Run supabase_schema_complete.sql",
      });
    }

    return NextResponse.json({
      connected: true,
      count: count ?? 0,
      message: count && count > 0 ? "Data mil raha hai." : "Connected. Table empty - run import_data.py to load CSV.",
      note: "This endpoint is the source of truth for production. Repo has no .env.local by design; production uses Vercel Environment Variables.",
    });
  } catch (err) {
    return NextResponse.json({
      connected: true,
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
