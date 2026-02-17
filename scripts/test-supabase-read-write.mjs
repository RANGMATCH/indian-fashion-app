#!/usr/bin/env node
/**
 * Supabase read/write test - runs in Node (local or CI).
 * Uses process.env.NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * Run: node scripts/test-supabase-read-write.mjs
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing env. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  console.log("READ – mens_fashion_items (count)...");
  const { count, error: readErr } = await supabase
    .from("mens_fashion_items")
    .select("*", { count: "exact", head: true });
  if (readErr) {
    console.error("READ failed:", readErr.message);
    process.exit(1);
  }
  console.log("READ OK. Count:", count ?? 0);

  const testId = "test-" + Date.now();
  console.log("WRITE – user_profiles upsert (test row)...");
  const { error: writeErr } = await supabase.from("user_profiles").upsert(
    { guest_id: testId, name: "Test Cloud Agent", updated_at: new Date().toISOString() },
    { onConflict: "guest_id" }
  );
  if (writeErr) {
    console.error("WRITE failed:", writeErr.message);
    process.exit(1);
  }
  console.log("WRITE OK.");

  const { error: delErr } = await supabase.from("user_profiles").delete().eq("guest_id", testId);
  if (delErr) console.warn("Cleanup delete warning:", delErr.message);
  else console.log("Cleanup OK.");

  console.log("Supabase read/write check – PASSED");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
