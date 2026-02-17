# connected: false – Vercel pe env vars fix (step-by-step)

Jab **/api/supabase-status** se `"connected": false` aaye, to ye karo:

---

## 1. Sahi project open karo

- Vercel mein **wo project** kholo jis ka URL tum **check link** ke liye use kar rahe ho.
- Agar tum **indian-fashion-app.vercel.app** (ya similar) khol rahe ho to **indian-fashion-app** project open karo (rangmatch nahi).

---

## 2. Environment Variables kholo

- **Settings** → left side **Environment Variables** pe click karo.

---

## 3. Dono variables add / check karo (name bilkul same)

**Pehla variable:**

| Field | Value (copy-paste karo) |
|-------|-------------------------|
| **Key** (name) | `NEXT_PUBLIC_SUPABASE_URL` |
| **Value** | Apna Supabase URL, e.g. `https://xxxxx.supabase.co` |
| **Environment** | Production (aur agar chaho to Preview bhi) |

**Dusra variable:**

| Field | Value |
|-------|--------|
| **Key** (name) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Value** | Apni anon key (eyJ... wali long string) |
| **Environment** | Production (aur agar chaho to Preview) |

**Dhyan:**
- **Key** mein spelling exact honi chahiye – extra space ya alag letter mat rehne do.
- **NEXT_PUBLIC_** dono ke saath hona chahiye (capital letters).
- Value apni **.env.local** se copy karke paste karo.

---

## 4. Save karo

- Har variable ke baad **Save** dabao.
- Dono add hone ke baad list mein **NEXT_PUBLIC_SUPABASE_URL** aur **NEXT_PUBLIC_SUPABASE_ANON_KEY** dikhne chahiye.

---

## 5. Redeploy zaroor karo

- Sirf Save se purani deployment update **nahi** hoti.
- **Deployments** tab pe jao → sabse upar wale deployment pe **three dots (⋯)** click karo → **Redeploy** choose karo → **Redeploy** confirm karo.
- Build complete hone tak wait karo (1–2 min).
- Phir wahi **check link** dobara kholo:  
  `https://[apna-vercel-url]/api/supabase-status`  
  Ab **connected: true** aana chahiye.

---

## 6. Agar phir bhi connected: false aaye

- **Settings → Environment Variables** mein dobara dekho: dono variables **Production** ke liye dikh rahe hain?
- **Key** exact ye honi chahiye:  
  `NEXT_PUBLIC_SUPABASE_URL`  
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
  (copy-paste karo, type mat karo.)
- Redeploy ke baad **nayi** deployment (latest) open ho rahi hai ya purani? **Latest** deployment ka URL use karo.
- Agar **Preview** URL khol rahe ho to **Preview** environment ke liye bhi dono variables add karo, ya **Production** URL use karo.

---

## Short checklist

1. [ ] Sahi Vercel project (indian-fashion-app) open kiya
2. [ ] **NEXT_PUBLIC_SUPABASE_URL** add kiya (name exact), value paste
3. [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY** add kiya (name exact), value paste
4. [ ] Dono ke liye **Production** select kiya, Save kiya
5. [ ] **Redeploy** kiya (Deployments → ⋯ → Redeploy)
6. [ ] Build complete hone ke baad check link dobara khola

Iske baad bhi false aaye to same project ke **Environment Variables** screenshot bhejo (keys dikha kar, values hide karke) ya batao exactly kya dikh raha hai.
