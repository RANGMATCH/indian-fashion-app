# Vercel – Branch Settings Guide (Hindi)

Tumhare paste ke hisaab se: **"No Active Branches"** aur **"Commit using our Git connections"** dikh raha hai. Iska matlab branch settings sahi set karni hain aur ek baar **main** pe push karna hai.

---

## 1. Git / Branch settings kahan set karte hain

1. **Vercel** → Apna project (indian-fashion-app) open karo  
2. **Settings** (top menu)  
3. Left side se **Git** section dhoondo  

---

## 2. Kya set karna hai

### Production Branch

| Setting | Value | Matlab |
|--------|--------|--------|
| **Production Branch** | `main` | Jab bhi `main` pe push karoge, **Production** deployment update hogi (tumhara live site). |

Agar dropdown mein **main** nahi dikhe to type karke **main** select karo. Save karo.

### Preview Branches

| Setting | Value | Matlab |
|--------|--------|--------|
| **Preview** | Sab branches (default) ya sirf **main** | Baaki branches (e.g. `develop`) pe push karne se **Preview** URL banta hai, Production nahi. |

- **Recommendation:** **All branches** rehne do taaki PR/other branch pe bhi preview mile.  
- Agar sirf Production chahiye to **Only production branch** bhi choose kar sakte ho.

### Ignored Build Step

- Zyada tar **chhod do** (empty).  
- Agar kabhi chaho ki kuch commits pe build na chale to yahan command daal sakte ho (optional).

---

## 3. "No Active Branches" ka matlab

- Abhi tak **koi branch se deploy trigger nahi hua** (ya Git connection theek nahi).  
- **Fix:**  
  1. **Settings → Git** mein confirm karo: **Connected Git Repository** = **RANGMATCH/indian-fashion-app** (na ki rangmatch).  
  2. **Production Branch** = **main** set karo.  
  3. **GitHub** pe jao → **RANGMATCH/indian-fashion-app** repo → **main** branch pe koi bhi commit **push** karo.  
  4. Vercel ko **auto** deploy start karna chahiye. Phir **Active Branches** mein **main** dikhna chahiye.

---

## 4. Step-by-step (short)

1. Vercel → Project → **Settings** → **Git**.  
2. **Production Branch** = **main** kar do. Save.  
3. **Connected Repository** = **RANGMATCH/indian-fashion-app** confirm karo.  
4. Agar repo galat hai to **Disconnect** karke **Import** se **indian-fashion-app** dobara connect karo.  
5. GitHub pe **main** pe push karo → deployment trigger hogi.  
6. **Deployments** tab pe ja kar **main** ka build **Ready** hone ka wait karo.

---

## 5. Node.js Version (tumhare paste se)

- **Node.js Version: 24.x** set hai.  
- Next.js 14 ke liye **18.x** ya **20.x** zyada common hai. Agar build fail ho to **Settings → General** ya **Build & Development** mein ja kar **Node.js Version** = **20.x** try karo. Save karke **Redeploy** karo.

---

## Summary

| Setting | Kya karna hai |
|--------|----------------|
| **Production Branch** | **main** set karo (Settings → Git). |
| **Preview** | Default (all branches) theek hai. |
| **Connected Repo** | **RANGMATCH/indian-fashion-app** confirm karo. |
| **No Active Branches** | **main** pe ek push karo, phir deployment se **main** active dikhega. |
| **Node (optional)** | Build fail ho to **20.x** try karo. |

Yeh sab **tum Vercel Dashboard** pe karo – Cursor se Vercel settings change nahi ho sakti.
