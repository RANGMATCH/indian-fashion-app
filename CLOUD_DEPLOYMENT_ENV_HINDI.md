# ☁️ Cloud par Supabase / env ka problem – Fix (Hindi)

**Problem:** Cloud Agent / deployment pe "Supabase not configured" aa raha hai, jabki tumne full .env copy-paste kiya.

**Reason:** Cloud par **.env.local file hoti hi nahi**. Git mein .env.local commit nahi hoti. Toh deployment server pe sirf wahi env vars aate hain jo tum **deployment platform ke Dashboard** mein **alag se** set karte ho.

---

## ✅ Kya karna hai (step by step)

### 1. Jis platform pe deploy kiya (Vercel / Netlify / Railway / etc.)

- Project open karo → **Settings** → **Environment Variables** (ya **Secrets**).

### 2. Har variable ALAG se add karo

Sirf "paste .env" pe depend mat karo. Ye **do variables zaroor add karo** (name exact same hona chahiye):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://YOUR_PROJECT_REF.supabase.co` (apna real URL) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` (apni real anon key) |

- **Name** column mein bilkul yehi likho (copy-paste karo).
- **Value** column mein apne .env.local wali value paste karo.
- Save / Add karo. Dono ke liye repeat karo.

Agar OpenAI use karte ho to ye bhi add karo:

| Name | Value |
|------|--------|
| `OPENAI_API_KEY` | `sk-...` |

### 3. Redeploy karo

Env vars add karne ke baad **Redeploy** / **Build again** zaroor chalao. Purani build purane (empty) env use karti hai.

### 4. Supabase side – koi setting?

- **Supabase Dashboard** → **Project Settings** → **API**
- **Project URL** aur **anon public key** wahi use karo jo .env mein daale ho.
- Agar app **custom domain** pe chal rahi hai (e.g. `https://yourapp.vercel.app`), to **Authentication → URL Configuration** mein **Site URL** / **Redirect URLs** mein apna deployment URL add kar sakte ho (auth use karte ho to).

**Note:** Sirf read/write (data fetch, insert, update) ke liye **extra Supabase setting ki zaroorat nahi**. Anon key se kaam chal jata hai. Problem sirf ye thi ki cloud pe env vars set nahi the.

---

## 🔍 Kaise check karo ki ab theek hai

1. **Deployment URL** open karo (e.g. `https://indian-fashion-app.vercel.app`).
2. Browser mein jao: `https://YOUR-DEPLOY-URL/api/supabase-status`
3. Response mein `connected: true` aur `count` (ya message) aana chahiye.

Agar ab bhi `connected: false` aaye to:

- Confirm karo ki **Environment Variables** mein **name** exactly `NEXT_PUBLIC_SUPABASE_URL` aur `NEXT_PUBLIC_SUPABASE_ANON_KEY` hai (extra space nahi).
- Redeploy kiya hai ya nahi.

---

## Short summary

| Jagah | Kya hai |
|--------|--------|
| **Local** | .env.local file → app usse padh leti hai ✅ |
| **Cloud** | .env.local file hoti nahi → **Dashboard se har variable alag add karo** ✅ |
| **Supabase** | Read/write ke liye koi extra cloud-agent setting nahi chahiye ✅ |

**Fix:** Deployment platform pe **Settings → Environment Variables** → `NEXT_PUBLIC_SUPABASE_URL` aur `NEXT_PUBLIC_SUPABASE_ANON_KEY` dono **alag-alag** add karo, value paste karo, phir **Redeploy** karo.
