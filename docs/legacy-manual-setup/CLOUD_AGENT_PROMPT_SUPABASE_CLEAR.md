# Prompt for Cloud Agent – Supabase “not connected” clear karo

**Ye poora prompt copy karke Cloud Agent ko bhejo (ya paste karo).**

---

## COPY FROM BELOW (prompt for Cloud Agent)

```
Supabase connection check – context aur fix clear karo

CONTEXT:
1. This Next.js app is already DEPLOYED on Vercel (indian-fashion-app project).
2. On Vercel we have set in Dashboard → Settings → Environment Variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   (Both are set for Production. We have also done Redeploy after adding them.)
3. There is NO .env.local in the Git repo BY DESIGN – it is in .gitignore for security. So when you (Cloud Agent) look at the repo or run checks from the repo, you will never see .env.local. That does NOT mean the app is unconfigured.
4. On Vercel, the app gets credentials from Vercel’s Environment Variables at build/runtime – not from .env.local. So the DEPLOYED app can be connected to Supabase even when the repo has no .env.local.

WHAT WE NEED FROM YOU (Cloud Agent):
1. Do NOT report “Supabase not configured” or “create .env.local” solely because .env.local is missing in the repo. That is expected.
2. To verify Supabase connection, CHECK THE DEPLOYED APP:
   - Call or open: https://[OUR-VERCEL-PROJECT-URL]/api/supabase-status
   - (Replace [OUR-VERCEL-PROJECT-URL] with the actual Vercel production URL, e.g. indian-fashion-app.vercel.app or whatever the project’s domain is.)
   - If that endpoint returns {"connected": true, ...} then Supabase IS configured for production. Report that.
   - If it returns connected: false, then report: “Production deployment is not receiving env vars – check Vercel project Settings → Environment Variables and Redeploy.”
3. Document YOUR check settings:
   - Where do you run (e.g. GitHub Actions, local script, only repo file scan)?
   - Do you have access to Vercel env vars when you run? (We expect: No.)
   - So: “Repo has no .env.local” should be marked as EXPECTED; “Production /api/supabase-status returns connected: false” should be the only failure condition for “Supabase not configured.”

SUMMARY FOR YOUR REPORTS:
- If you only see repo files: Say “Repo has no .env.local (expected). To verify Supabase, check the deployed URL: https://[vercel-project-url]/api/supabase-status”
- If you can hit the deployed URL: Use that result (connected: true/false) as the source of truth for “Supabase configured” and report accordingly.
- Do not ask us to “create .env.local” for production – production uses Vercel env vars. .env.local is for local dev only.
```

---

## COPY ENDS

---

## Tum kya karo

1. Upar wala **COPY FROM BELOW** se **COPY ENDS** tak ka block copy karo.
2. Cloud Agent ko ye prompt paste karo (jahan bhi tum usse baat karte ho – e.g. Cursor Cloud Agent, ya koi dashboard).
3. Agent ko apna **actual Vercel URL** bata do (e.g. `indian-fashion-app.vercel.app`) taaki wo `[OUR-VERCEL-PROJECT-URL]` ki jagah use kar sake, ya agent se kahe: “Our Vercel production URL is https://indian-fashion-app.vercel.app – use that for /api/supabase-status check.”

Isse agent samjh jayega ki repo mein .env.local nahi hona normal hai, aur asli check **deployed URL** pe karna chahiye; aur tumhe pata chal jayega ki agent ki “problem” kahan se aa rahi hai (repo-only check vs deployment check).
