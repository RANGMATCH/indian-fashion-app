# Vercel par deploy (simple steps)

## 1. GitHub par code push karo

```bash
cd a:\indian-fashion-app
git add .
git commit -m "RangMatch UI + home redirect to /rangmatch"
git push origin main
```

(Agar repo abhi tak GitHub par nahi hai, pehle GitHub par new repo banao, phir `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git` aur `git push -u origin main`.)

---

## 2. Vercel par project connect karo

1. Browser mein jao: **https://vercel.com**
2. Login karo (GitHub se sign in kar sakte ho).
3. **Add New…** → **Project**.
4. **Import Git Repository** se apna `indian-fashion-app` repo select karo.
5. **Framework Preset:** Next.js (auto-detect ho jana chahiye).
6. **Root Directory** empty chhod do (project root hi hai).
7. **Deploy** par click karo.

---

## 3. Live link

Deploy khatam hone ke baad Vercel tumhe ek URL dega, jaise:

**https://indian-fashion-app-xxxxx.vercel.app**

- **Home open karte hi** ab naya RangMatch UI dikhega (kyunki `/` redirect ho kar `/rangmatch` par jata hai).
- Seedha naya UI dekhne ke liye: **https://YOUR_PROJECT.vercel.app** ya **https://YOUR_PROJECT.vercel.app/rangmatch**

---

## 4. (Optional) Vercel CLI se deploy

Agar Vercel CLI use karna ho:

```bash
npm i -g vercel
cd a:\indian-fashion-app
vercel
```

Pehli baar run par login + project link ho jayega. Phir `vercel --prod` se production deploy.
