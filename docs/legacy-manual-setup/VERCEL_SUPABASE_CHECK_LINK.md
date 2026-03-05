# Vercel – Supabase check link + SUPABASE_DB_URL

---

## 1. Domain nahi hai to URL kahan se milega?

Domain na ho to bhi **default Vercel URL** hota hai. Wo yahan se milega:

1. **Vercel** → Apna project (**indian-fashion-app**) kholo.
2. **Deployments** tab pe jao (ya project ke home pe hi).
3. Sabse upar wale **Production** deployment pe click karo.
4. **"Visit"** / **"Open"** button ya deployment ke neeche **URL** dikhega – jaise:
   - `https://indian-fashion-app.vercel.app`
   - ya `https://indian-fashion-app-xxxx.vercel.app`
5. Ye hi tumhara **live URL** hai (domain abhi nahi chahiye).

---

## 2. Supabase check link (template)

Is URL ko browser mein open karo (apna Vercel URL laga kar):

```
https://[APNA-VERCEL-URL]/api/supabase-status
```

**Example:**  
Agar Vercel URL hai `https://indian-fashion-app.vercel.app` to check link ye hoga:

```
https://indian-fashion-app.vercel.app/api/supabase-status
```

**Kya dikhega:**
- **connected: true** + count/message → Supabase theek se configured hai.
- **connected: false** → Vercel pe **NEXT_PUBLIC_SUPABASE_URL** aur **NEXT_PUBLIC_SUPABASE_ANON_KEY** add karo, phir Redeploy.

---

## 3. SUPABASE_DB_URL – Vercel pe zaroori hai ya nahi?

**Is app ke liye: NAHI.**

| Variable | Vercel pe chahiye? | Kyon |
|----------|---------------------|------|
| **NEXT_PUBLIC_SUPABASE_URL** | **Haan** | App + `/api/supabase-status` isi se connect hota hai. |
| **NEXT_PUBLIC_SUPABASE_ANON_KEY** | **Haan** | Same. |
| **SUPABASE_DB_URL** | **Nahi** | Ye direct PostgreSQL connection string hai – use hota hai scripts (e.g. schema run) ke liye. App aur `/api/supabase-status` isko use **nahi** karte. |

Matlab: **SUPABASE_DB_URL** Vercel Environment Variables mein **na ho** to bhi Supabase check link kaam karega, jab tak **NEXT_PUBLIC_SUPABASE_URL** aur **NEXT_PUBLIC_SUPABASE_ANON_KEY** set hain.

Agar baad mein koi **script** Vercel se chalana ho jo direct DB use kare, tab **SUPABASE_DB_URL** Vercel pe add kar sakte ho. Abhi check ke liye **zaroori nahi**.

---

## 4. Short

- **Domain nahi** → Vercel project ka **default URL** (Deployments / Visit se) use karo.
- **Supabase check link:**  
  `https://[APNA-VERCEL-URL]/api/supabase-status`  
  (APNA-VERCEL-URL ki jagah jo Vercel pe dikhe woh laga do.)
- **SUPABASE_DB_URL** Vercel pe **optional** hai; check ke liye **NEXT_PUBLIC_SUPABASE_URL** + **NEXT_PUBLIC_SUPABASE_ANON_KEY** kaafi hain.
