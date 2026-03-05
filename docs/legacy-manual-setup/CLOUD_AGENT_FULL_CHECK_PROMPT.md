# Kya problem thi + Cloud Agent full check prompt

---

## 1. Kya problem thi (short)

**Problem:** Cloud Agent sirf **Git repo** dekhta tha. Repo mein **.env.local** hoti hi nahi (security – .gitignore). Isliye agent bolta tha: "Supabase not configured, create .env.local."

**Asli baat:** App **Vercel** pe chal rahi hai. Vercel pe **Environment Variables** mein NEXT_PUBLIC_SUPABASE_URL aur NEXT_PUBLIC_SUPABASE_ANON_KEY set the. Production app ko credentials **wahi** se milte hain, .env.local se nahi.

**Fix:** Agent ko **instruction** di ki "repo check mat use karo; **deployed URL** pe `/api/supabase-status` call karke dekho." Jab agent ne **https://indian-fashion-app.vercel.app/api/supabase-status** check kiya to **connected: true** mila. Toh problem **agent ka check method** tha (repo-only), **app/Vercel config** galat nahi tha.

---

## 2. Cloud Agent – full check prompt (copy-paste)

**Ye prompt Cloud Agent ko do – Supabase, Vercel, aur baaki sab ek saath verify karne ke liye.**

```
FULL PRODUCTION CHECK – Supabase, Vercel, and overall status

PROJECT LINKS (use these for all checks):
- Live app: https://indian-fashion-app.vercel.app/
- Vercel project: https://vercel.com/rangmatchs-projects/indian-fashion-app
- Supabase status API: https://indian-fashion-app.vercel.app/api/supabase-status
- GitHub repo: RANGMATCH/indian-fashion-app (if you need to reference it)

RUN THESE CHECKS AND REPORT:

1) SUPABASE (production)
- GET https://indian-fashion-app.vercel.app/api/supabase-status
- If response has "connected": true and "count" (e.g. 128744) → Supabase: ✅ CONNECTED, data accessible.
- If "connected": false → Supabase: ❌ Check Vercel → indian-fashion-app → Settings → Environment Variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY), then Redeploy.
- Do NOT use "repo has no .env.local" as reason for "not configured". Production uses Vercel env vars; .env.local is for local dev only and is correctly not in the repo.

2) VERCEL DEPLOYMENT
- Open https://indian-fashion-app.vercel.app/ – homepage should load (RangMatch, Browse outfits, etc.).
- If 404 or error → Deployment may have failed or wrong URL. Check Vercel dashboard → Deployments → latest build status.
- Optional: Check https://indian-fashion-app.vercel.app/search and https://indian-fashion-app.vercel.app/outfit-builder – pages should load.

3) REPO vs PRODUCTION (clarification)
- Repo: No .env.local = EXPECTED (security). Do not ask to add .env.local for production.
- Production: Supabase status = result of step 1 above. Vercel env vars = source for production credentials.

4) OTHER (optional)
- If you can check build logs: ensure build succeeds (Next.js, no critical errors).
- If you report "Supabase not configured", always mention whether you checked the REPO only or the LIVE URL (https://indian-fashion-app.vercel.app/api/supabase-status). Prefer live URL as source of truth.

OUTPUT FORMAT:
- Supabase: [CONNECTED / NOT CONNECTED] – [one line reason, e.g. "Live API returned connected: true, count: 128744"]
- Vercel: [OK / ISSUE] – [one line]
- Repo .env.local: Expected absent. Production env: Vercel Environment Variables.
- Overall: [Healthy / Action needed] – [one line]
```

---

## 3. Short summary

- **Problem thi:** Agent repo-only check karta tha → .env.local nahi dikhti → "not configured" bolta tha. **Agent change** = usko ye rule diya ki **live URL** se check kare.
- **Full check ke liye:** Upar wala prompt copy karke Cloud Agent ko do – Supabase (live API), Vercel (homepage + deploy), repo vs production clarification, sab ek prompt mein cover ho jayega.
