# Supabase ko App se Link Karne Ka Tarika

Application ko Supabase se data lene ke liye ye steps follow karein.

---

## Step 1: Supabase Dashboard se URL aur Key copy karein

1. **https://supabase.com** par jao → **Login** karo  
2. Apna **project** select karo (ya naya project banao)  
3. Left side **Project Settings** (gear icon) par click karo  
4. **API** section mein jao  
5. Yahan se copy karo:
   - **Project URL** — jaise `https://abcdefgh.supabase.co`
   - **anon public** key — jaise `eyJhbGciOiJIUzI1NiIsInR5cCI6...` (pura key copy karo)

---

## Step 2: `.env.local` file banao / update karo

1. Project folder **indian-fashion-app** ke andar  
2. Agar **`.env.local`** nahi hai to **`.env.example`** ko copy karke **`.env.local`** banao  
3. **`.env.local`** open karo aur ye values **apne actual values** se replace karo:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...paste_full_key_here
```

- `YOUR_PROJECT_REF` — Supabase project URL wala part (e.g. `abcdefgh`)  
- `eyJhbGci...` — anon public key **puri** paste karo  

4. File **save** karo  

**Important:** `.env.local` ko **git mein commit mat karo** (already .gitignore mein hai).

---

## Step 3: Dev server restart karo

Environment variables load hone ke liye server dubara start karo:

```bash
# Terminal band karo (Ctrl+C) phir:
npm run dev
```

---

## Step 4: Verify karo — Data aa raha hai ya nahi

1. Browser mein **http://localhost:3000** kholo  
2. **Search** page par jao (`/search`) — kuch search karo (e.g. "wedding" ya "शादी")  
3. Agar Supabase mein **mens_fashion_items** table mein data hai to results dikhenge  

**Connection check:** Browser mein ye URL kholo:  
**http://localhost:3000/api/supabase-status**  

- Agar **connected: true** aur **count** dikhe to link sahi hai  
- Agar **connected: false** to `.env.local` check karo (URL + key sahi hai, server restart kiya?)

---

## Agar abhi tak database mein data nahi hai

Pehle **schema** aur **CSV import** karna hoga:

1. **SUPABASE_SETUP_STEPBYSTEP.md** open karo  
2. **Step 2:** Supabase SQL Editor mein **supabase_schema_complete.sql** run karo  
3. **Step 3:** Search RPC wala SQL run karo  
4. **Step 4:** **scripts/import_data.py** mein `SUPABASE_URL` aur `SUPABASE_KEY` dalo (same as .env.local)  
5. Run: `python scripts/import_data.py`  

Uske baad app Search / Outfit Builder se data dikhayegi.

---

## Summary

| Kya karna hai        | Kahan / Kaise |
|----------------------|----------------|
| URL + Key leni hai   | Supabase Dashboard → Project Settings → API |
| App ko deni hai      | `.env.local` mein `NEXT_PUBLIC_SUPABASE_URL` aur `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Server restart       | `npm run dev` |
| Link check           | http://localhost:3000/api/supabase-status |

Iske baad application Supabase se data lene ke liye link ho chuki hogi.
