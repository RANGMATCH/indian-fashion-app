# Cloud Agent + Supabase – Edit / Keys (Hindi)

---

## 1. Data mil gaya – ab app ke liye kya chahiye?

Tumhare **app** (Vercel + browser) ke liye **sirf yehi kaafi hai:**

- **NEXT_PUBLIC_SUPABASE_URL**
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**

**Service key / service_role key / data key (extra) – app ke liye zaroori NAHI.**  
App anon key se hi read/write karti hai (jitna Supabase RLS allow karta hai).

---

## 2. Cloud Agent kya edit kar sakta hai?

**Cloud Agent** = jo script/CI (e.g. GitHub Actions, ya koi automated step) chalata hai.

- **Agar agent ko env nahi milti** (sirf repo dikhe) → DB se **kuch nahi** kar sakta (na read, na edit).
- **Agar agent ko anon key milti hai** (e.g. GitHub Secrets / Vercel env) → **sirf wahi** kar sakta jo **RLS (Row Level Security)** allow karta hai – jaise app. Insert/update tabhi hoga jab Supabase policies allow karein.
- **Agar agent ko service_role key milti hai** → **poora** DB read/write (RLS bypass). Ye **sirf trusted backend/CI** ke liye, kabhi client/app ya public env mein mat do.

**Short:**  
- Agent **edit** tabhi kar payega jab use **Supabase credentials** milengi (anon ya service_role).  
- **Anon key** = app jaisa access (RLS ke andar).  
- **Service_role** = full admin access – zaroorat ho to hi do, aur **secret** rakho.

---

## 3. Service key / role key / data key dene ki zaroorat?

| Key | App (Vercel) ke liye | Cloud Agent ke liye |
|-----|----------------------|----------------------|
| **NEXT_PUBLIC_SUPABASE_URL** | ✅ Haan (already) | ✅ Agar agent DB use kare |
| **NEXT_PUBLIC_SUPABASE_ANON_KEY** | ✅ Haan (already) | ✅ Same – RLS ke andar read/edit |
| **SUPABASE_SERVICE_ROLE_KEY** | ❌ Nahi | ⚠️ Sirf agar agent ko RLS bypass karke full edit chahiye (e.g. admin script) – **secret** rakho, kabhi client pe mat bhejo |

**Matlab:**  
- **App / normal use:** Anon key kaafi hai, **service key dene ki zaroorat nahi**.  
- **Cloud Agent:**  
  - Sirf anon key se bhi **edit** ho sakta hai (jahan RLS allow kare).  
  - **Service role key** sirf tab do jab agent ko **full DB access** chahiye aur wo **trusted** jagah (e.g. GitHub Secrets) pe chal raha ho.

---

## 4. Best practice (short)

- **Browser / Vercel (client):** Sirf **URL + anon key**. **Service key kabhi mat do.**  
- **Cloud Agent (CI/backend):**  
  - Pehle **anon key** se try karo – jitna RLS allow karega, utna read/edit ho jayega.  
  - **Service role** sirf zaroorat pe, aur **secret** env variable mein (e.g. `SUPABASE_SERVICE_ROLE_KEY`), kabhi public/`NEXT_PUBLIC_` mat banao.

**Conclusion:**  
Data mil gaya to app theek hai. **Service key / role key / extra “data key” dene ki zaroorat nahi** – anon key se hi app + (optional) Cloud Agent edit kar sakta hai, jitna RLS allow kare. Agent ko full DB edit chahiye to hi service_role do, aur hamesha secret rakho.
