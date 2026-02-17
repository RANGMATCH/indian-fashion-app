# Vercel – App name / URL kahan se milega

## Cursor / yahan se check possible nahi

- Cursor (ya koi agent) **tumhare Vercel account mein login nahi kar sakta**
- Is project ki **files** se Vercel ka live URL ya app name **pata nahi chalega**
- Ye cheezein **sirf tum Vercel dashboard** se dekh sakte ho

---

## App name / URL kahan se milega (tum khud)

### 1. Vercel pe login karo

- Browser mein **https://vercel.com** kholo
- Apne se login karo

### 2. Project select karo

- **Dashboard** pe apna project dikhega (e.g. **indian-fashion-app** – ye GitHub repo name se aata hai)
- Us project pe **click** karo

### 3. App name

- **Project name** = wahi jo upar dikh raha hai (e.g. `indian-fashion-app`)
- Kabhi-kabhi tumne import karte waqt naam change kiya hoga – jo **Vercel pe project ka naam** dikh raha hai, wahi **app name** hai

### 4. Live URL (deployed app ka address)

- Project ke andar **"Domains"** ya **"Deployments"** pe jao
- **Production** deployment pe click karo
- Jo **URL** dikhe (e.g. `https://indian-fashion-app.vercel.app` ya `https://indian-fashion-app-xyz.vercel.app`) – wahi **tumhara app URL** hai

**Short:**  
- **App name** = Vercel dashboard pe project ka naam  
- **App URL** = Domains / latest Production deployment pe dikhne wala link  

---

## Supabase status check karne ka URL

Jab tumhe **app URL** mil jaye (e.g. `https://indian-fashion-app.vercel.app`), to browser mein ye kholo:

```
https://TUMHARA-APP-URL/api/supabase-status
```

Example:  
Agar app URL `https://indian-fashion-app.vercel.app` hai to:

```
https://indian-fashion-app.vercel.app/api/supabase-status
```

Is page pe `connected: true` aaye to Supabase configured hai.

---

## Summary

| Cheez | Kahan milega |
|--------|----------------|
| **App name** | Vercel.com → Dashboard → Project ka naam |
| **App URL** | Vercel → Project → Domains / Deployments → Production URL |
| **Check yahan se** | Nahi – Cursor/Vercel connect nahi hai, sirf tum dashboard se dekh sakte ho |
