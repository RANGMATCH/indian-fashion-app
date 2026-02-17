# Vercel – Environment Variables Guide (Hindi)

Vercel pe env vars add karne ke **do tareeke** hain. Dono theek hain.

---

## Option 1: Import .env (sab ek saath)

**"Import .env"** ya **"Paste .env contents"** use karo agar tumhe saari variables ek saath add karni hain.

### Steps

1. **Vercel** → Apna project → **Settings** → **Environment Variables**
2. **"Import .env"** / **"Paste .env"** pe click karo
3. Apni **.env.local** file kholo → **Ctrl+A** (select all) → **Ctrl+C** (copy)
4. Jo box dikhe (Key input / text area) usme **Ctrl+V** paste karo
5. **Import** / **Save** dabao

Vercel saari lines padh kar **har line se ek variable** bana dega (jaise `NEXT_PUBLIC_SUPABASE_URL=...` → name `NEXT_PUBLIC_SUPABASE_URL`, value `...`).

**Environments:**  
- **Production** = live site (e.g. yourapp.vercel.app)  
- **Preview** = har branch/PR ke liye preview URL  
- **Development** = local `vercel dev` (optional)  

Agar **"Available for Production and Preview only"** likha hai to **Production** aur **Preview** dono select karo (ya jo default ho wahi rakho).

---

## Option 2: Ek ek variable add karna

Agar Import use nahi karna:

1. **Key** (name): `NEXT_PUBLIC_SUPABASE_URL`  
   **Value**: `https://xxxx.supabase.co`  
   **Environments**: Production + Preview select karo → **Save**
2. Phir naya add karo:  
   **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   **Value**: `eyJhbGci...` (apni key)  
   **Environments**: Production + Preview → **Save**

---

## "Paste .env contents in Key input" ka matlab

Matlab: **Key** wale box mein tum **pura .env ka content** paste kar sakte ho (ek ek line `NAME=value`).

- Vercel detect karega ki multiple lines hain aur unhe alag-alag variables mein split kar dega
- Paste karke **Save** / **Import** karo

**Dhyan:**  
- Sirf **.env / .env.local** ka content paste karo (naam mat likho jaise "Variable" etc.)  
- Har line `KEY=value` format mein honi chahiye

---

## Branch

- **Branch** = kis git branch ke liye ye env vars use hon (optional)
- Zyada tar **sab branches** ke liye same env rehte hain
- Agar kuch nahi select kiya to usually **Production** branch (e.g. `main`) ke liye apply hota hai

---

## Summary

| Option | Kab use karo |
|--------|----------------|
| **Import .env / Paste .env contents** | Jab tumhe pura .env ek baar mein add karna ho – copy .env.local → paste → Save |
| **Ek ek add** | Jab 2–3 hi vars hon (Supabase URL + Anon Key) |

**Environments:** Production + Preview select karo taaki live aur preview dono pe Supabase kaam kare.

Save ke baad **Redeploy** karo (Deployments → latest → three dots → Redeploy).
