# Secrets copy ka sahi tareeka – confusion khatam (हिंदी)

Cloud Agent ko credentials nahi mil rahe. **Sabse aasaan aur galati-free** tarika — step by step.

---

## 1. Secrets kahaan set karne hain? (Ek hi jagah)

**Sirf browser mein:** **cursor.com/agents** → apna Agent → **Manage** → **My Secrets**

- **Cursor app** mein jo "Cloud Agent select karke Secrets" dikhte hain, wo bhi **isी same account** ke hote hain.  
- **Dono jagah paste kar diya to koi problem nahi** — dono sync ho sakte hain.  
- **Sabse simple:** Browser (**cursor.com/agents** → Manage → My Secrets) use karo, wahi **asli Cloud Agent settings** hoti hain.

---

## 2. .env.local se copy kaise karein (space/error na rahe)

### URL copy (NEXT_PUBLIC_SUPABASE_URL)

1. **Cursor** mein project kholo → **.env.local** open karo.
2. **Line 2** pe jo line hai:  
   `NEXT_PUBLIC_SUPABASE_URL=https://pykzlebnrzcdksfyoukz.supabase.co`
3. **Sirf value wala hissa** select karo: **`https://pykzlebnrzcdksfyoukz.supabase.co`**  
   - Pehle `=` ke baad se start karo, end tak.  
   - **NEXT_PUBLIC_SUPABASE_URL=** select mat karo, sirf URL.
4. **Ctrl+C** (copy). Koi space aage-peeche nahi honi chahiye.
5. Browser → Edit Secret → **New Value** mein **Ctrl+V** → **Save**.

### Anon Key copy (NEXT_PUBLIC_SUPABASE_ANON_KEY)

1. **.env.local** ki **Line 3**:  
   `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...` (poori lambi key)
2. **Sirf key wala hissa** select karo:  
   `eyJhbGci...` se start, line ke end tak — **sirf key, naam nahi**.
3. **Ctrl+C** (copy).  
   - Line ke end pe **Enter** ya space na ho.  
   - Copy ke baad Notepad mein paste karke dekho: ek hi line honi chahiye, koi extra line nahi.
4. Browser → Edit Secret (Anon Key) → **New Value** mein paste → **Save**.

---

## 3. Kaun si cheezein galti karwa sakti hain?

| Galati | Result | Solution |
|--------|--------|----------|
| **`NEXT_PUBLIC_SUPABASE_ANON_KEY=`** bhi copy ho gaya | Key invalid lag sakti hai | Sirf `=` ke **baad** wala part copy karo |
| **Aage ya peeche space** | Auth fail | Copy se pehle/baad space mat chhorna |
| **Key ke beech line break** | Invalid key | Ek hi line copy karo, Enter na aaye |
| **Koi character kam** (key kaat ke paste) | Invalid | Poori key copy karo, end tak |

---

## 4. Cloud Agent ko ab bhi "workspace mein .env.local nahi" kyon bolta hai?

- **Cloud Agent** jo workspace use karta hai, wo **GitHub repo ka clone** hota hai.  
- **.env.local** repo mein **hoti hi nahi** (`.gitignore` ki wajah se) — isliye cloud workspace mein bhi **nahi hogi**.  
- **Ye normal hai.** Cloud Agent ko credentials **Cursor ke Secrets** se milne chahiye (env vars ki tarah), **.env.local** se nahi.

Agar aapne **browser (cursor.com/agents) → My Secrets** mein dono values **sahi paste** karke Save kar diye, to **aapka kaam ho chuka**.  
Agar phir bhi agent bolta hai "credentials nahi mil rahe", to **Cursor** abhi Secrets ko Cloud Agent run ke dauran env vars ki tarah inject nahi kar raha — ye **Cursor ki limitation** hai, aapki copy galat hone ki nahi.

---

## 5. Verify karna (confidence ke liye)

**Local pe check:** Keys sahi hain ya nahi, ye dekhne ke liye:

```bash
node scripts/verify_supabase.js
```

Agar **"READ: OK"** aaye to **.env.local** ki values **bilkul sahi** hain. Phir Cloud Agent ke liye **sirf browser Secrets** mein wahi values dalna hai (upar wale tarike se copy karke).

---

## 6. Short summary

| Sawal | Jawab |
|--------|--------|
| Secrets kahaan set karoon? | **cursor.com/agents** → Manage → My Secrets (browser). Cursor app wale bhi isी account ke hain. |
| Copy ka sabse aasaan tareeka? | .env.local mein se **sirf value** copy karo (`=` ke baad), aage-peeche space na ho, **New Value** mein paste → Save. |
| Space/error se bachna? | Sirf URL / sirf key copy karo; paste ke baad extra line/space mat chhodo. |
| Cloud Agent phir bhi .env.local maangta hai? | Workspace mein .env.local hoti hi nahi (repo mein nahi). Credentials **Secrets** se aane chahiye; agar nahi aa rahe to Cursor side ki baat hai. |
| Keys sahi hain ya nahi? | Local pe `node scripts/verify_supabase.js` chalao — READ: OK aaye to keys sahi hain. |

Is tarah copy karo to **confusion nahi rahegi** aur **galati kam se kam** hogi.
