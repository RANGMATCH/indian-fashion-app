# 🔐 .env Copy-Paste Guide (Hindi) – Cloud Agent / Deployment ke liye

Cloud Agent ya Vercel/Netlify jahan bhi **"Paste your entire .env"** ya **Secrets** maang rahe ho, wahan ye steps follow karo.

---

## Step 1: .env.local file kholo

1. Apne project folder mein jao: `indian-fashion-app`
2. **.env.local** file dhoondo (ye folder ke andar root pe hoti hai, `package.json` ke paas)
3. Is file ko **Cursor / VS Code** ya **Notepad** se kholo  
   - Agar dikhai nahi de rahi to Cursor left side **Explorer** mein **"Open Folder"** se project kholo, phir `.env.local` pe double-click

---

## Step 2: Saara content select karo

1. File open hone ke baad **Ctrl + A** dabao (Windows)  
   - Saari lines select ho jayengi
2. Phir **Ctrl + C** dabao  
   - Saara content copy ho jayega clipboard mein

**Dhyan:**  
- Sirf **values** copy ho rahi hon, koi extra space ya line mat chhodo  
- Koi line delete mat karo (jaise `NEXT_PUBLIC_SUPABASE_URL=...` sab copy hona chahiye)

---

## Step 3: Cloud Agent / Deployment wale jagah paste karo

1. Jahan **"Paste your entire .env"** ya **"Environment Variables"** / **"Secrets"** ka option hai, us box mein click karo
2. **Ctrl + V** dabao  
   - Jo copy kiya tha wahi yahan paste ho jayega
3. **Save** / **Add** / **Deploy** jaisa button dabao (platform ke hisaab se)

---

## Step 4: Verify karo

Paste ke baad check karo ki ye sab dikh rahe hon (names same hon, values tumhari real wali):

- `NEXT_PUBLIC_SUPABASE_URL=...`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
- Agar use kar rahe ho to: `OPENAI_API_KEY=...`, `NEXT_PUBLIC_APP_URL=...`

Agar platform pe **ek-ek variable alag add karna ho** to:

- **Name:** `NEXT_PUBLIC_SUPABASE_URL`  
  **Value:** jo tumhari .env.local mein URL hai woh (https://….supabase.co)
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
  **Value:** jo tumhari .env.local mein anon key hai woh (eyJ... wali long string)

---

## ⚠️ Security – Yaad rahe

- .env / .env.local **sirf apne computer aur deployment ke Secrets box** tak use karo
- **Kisi ko chat, email ya screenshot mein mat bhejo**
- GitHub / public repo mein **kabhi commit mat karo** (ye already .gitignore mein hai)

---

## Short summary

| Step | Kya karna hai |
|------|----------------|
| 1 | `.env.local` file kholo |
| 2 | **Ctrl + A** (select all) → **Ctrl + C** (copy) |
| 3 | Cloud Agent / Deployment ke env/secrets box mein **Ctrl + V** (paste) |
| 4 | Save / Add karo |

Is tarah Cloud Agent / deployment apne aap saari env values use kar lega, tumhe alag se kuch select nahi karna padega—sirf copy-paste se kaam ho jayega.
