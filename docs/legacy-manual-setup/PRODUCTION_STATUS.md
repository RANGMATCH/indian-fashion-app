# Production status – reference

**Live app:** https://indian-fashion-app.vercel.app/  
**Vercel project:** https://vercel.com/rangmatchs-projects/indian-fashion-app  

---

## Supabase connection (source of truth)

**Check URL:** https://indian-fashion-app.vercel.app/api/supabase-status  

- **connected: true** + **count: 128744** = Production Supabase configured, data accessible.
- Credentials come from **Vercel → Settings → Environment Variables** (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).
- Repo has **no .env.local** by design (.gitignore). That is expected; production does not use .env.local.

---

## Summary

| Check | Result |
|-------|--------|
| Production Supabase | ✅ Connected |
| Row count (mens_fashion_items) | 128,744 |
| Repo .env.local | Not present (expected) |
| Env in production | Vercel Environment Variables |

Last verified: Cloud Agent production check – connected, data mil raha hai.
