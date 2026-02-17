# Vercel – Abhi Abhi Step-by-Step (Screen pe kya karna hai)

Line-by-line, screen pe kya click karna hai, sab Hindi mein.

---

## STEP 1: Vercel kholo

1. Browser mein **vercel.com** likho, Enter dabao.
2. Apne se **login** karo (agar nahi ho).

---

## STEP 2: Apna project open karo

3. **Dashboard** pe aate hi upar **"RANGMATCH's projects"** ya **"Projects"** dikhega.
4. **Projects** list mein se **indian-fashion-app** wala project pe **click** karo.
   - Agar **rangmatch** dikhe to usko mat kholna – **indian-fashion-app** naam wala project dhoondo.
   - Agar sirf **rangmatch** hai to pehle **naya project** banao (Add New → **indian-fashion-app** repo import karo), phir usko kholo.

---

## STEP 3: Settings pe jao

5. Project open hone ke baad **upar wali menu** mein **"Settings"** likha hoga.
6. **Settings** pe **click** karo.

---

## STEP 4: Git section kholo

7. Left side mein list dikhegi: **General**, **Domains**, **Git**, **Environment Variables**, **Deployments**, etc.
8. **Git** pe **click** karo.

---

## STEP 5: Production Branch set karo

9. Page pe **"Production Branch"** ya **"Git Branch"** jaisa section dikhega.
10. Uske saamne **dropdown** ya **input box** hoga.
11. Usme **main** likho / select karo.
    - Agar dropdown hai to **main** choose karo.
    - Agar kuch aur likha hai (e.g. master) to **main** type karke replace karo.
12. **Save** button dabao (agar dikhe).

---

## STEP 6: Connected repository check karo

13. Upar hi **"Connected Git Repository"** ya **"Repository"** section dikhega.
14. Usme likha hoga: **RANGMATCH/indian-fashion-app** (ya kuch aur).
15. **Agar RANGMATCH/indian-fashion-app likha hai** → theek hai, aage badho.
16. **Agar RANGMATCH/rangmatch ya kuch aur hai** to:
    - **Disconnect** / **Change** pe click karo.
    - Phir **Import Git Repository** se **indian-fashion-app** dhoondh kar connect karo.
    - Save karo.

---

## STEP 7: Environment Variables (Supabase keys)

17. Left side list se **"Environment Variables"** pe click karo.
18. **Agar pehle se 2 variables nahi dikh rahe** (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) to:
    - **Add New** / **Add** button dabao.
    - **Key** box mein: `NEXT_PUBLIC_SUPABASE_URL` likho.
    - **Value** box mein: apna Supabase URL paste karo (https://….supabase.co).
    - **Environment** mein **Production** (aur agar chaho to **Preview** bhi) select karo.
    - **Save** dabao.
    - Phir dobara **Add New** → Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Value: apni anon key paste karo → Save.

---

## STEP 8: Deployments check karo

19. Left side se **"Deployments"** pe click karo (ya upar menu se).
20. List mein **sabse upar wala** deployment dekho.
21. **Status** green / **Ready** hai to theek.
22. **Failed** hai to us deployment pe click karo → **View Function Logs** / **Building** khol kar error padho, fix karo, phir **Redeploy** dabao.

---

## STEP 9: Apna live URL kholo

23. **Domains** section (Settings ya project home pe) kholo.
24. **Production** ke saamne jo URL likha hai (e.g. indian-fashion-app.vercel.app) use **copy** karo.
25. Naye tab mein **https://** laga kar paste karo, Enter dabao.
26. **Homepage** load honi chahiye. Agar **404** aaye to **STEP 8** dobara karo (build success) aur **STEP 5** confirm karo (Production Branch = main).

---

## Short list – abhi kya karna hai (order mein)

| Line | Kya karna hai |
|------|----------------|
| 1 | vercel.com kholo, login karo |
| 2 | **indian-fashion-app** project open karo |
| 3 | **Settings** pe click karo |
| 4 | Left se **Git** pe click karo |
| 5 | **Production Branch** = **main** set karo, Save |
| 6 | **Connected Repository** = **RANGMATCH/indian-fashion-app** confirm karo |
| 7 | **Environment Variables** mein Supabase dono keys add karo (agar nahi hain) |
| 8 | **Deployments** se latest build **Ready** hai ya nahi dekho |
| 9 | **Domains** se Production URL copy karke browser mein kholo |

Bas inhi lines pe screen pe set karna hai – step-by-step yahi follow karo.
