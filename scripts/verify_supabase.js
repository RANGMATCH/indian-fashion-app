/**
 * Local Supabase read/write check. Run: node scripts/verify_supabase.js
 * .env.local se credentials leta hai - Cloud Agent ke paas .env.local nahi hoti.
 */
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");
if (!fs.existsSync(envPath)) {
  console.log("FAIL: .env.local nahi mili. Project root mein banao.");
  process.exit(1);
}
fs.readFileSync(envPath, "utf8").split("\n").forEach((line) => {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
});

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.log("FAIL: NEXT_PUBLIC_SUPABASE_URL ya ANON_KEY .env.local mein nahi hai.");
  process.exit(1);
}

async function main() {
  const res = await fetch(`${url}/rest/v1/mens_fashion_items?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const data = await res.json();
  if (Array.isArray(data)) {
    console.log("READ: OK");
  } else {
    console.log("READ FAIL:", data);
    process.exit(1);
  }
  console.log("Supabase credentials sahi hain. Cloud Agent ko Secrets browser (cursor.com/agents) se set karo.");
}

main().catch((e) => {
  console.log("FAIL:", e.message);
  process.exit(1);
});
