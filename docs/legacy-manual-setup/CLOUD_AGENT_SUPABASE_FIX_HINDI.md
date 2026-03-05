# Cloud Agent – Supabase Access Fix (हिंदी गाइड)

Cloud Agent की रिपोर्ट के मुताबिक **समस्या क्या है** और **आपको क्या करना है** — सब एक जगह।

---

## 1. मुख्य समस्या क्या है?

**Cloud Agent के पास Supabase की credentials नहीं मिल रही हैं.**

- Agent जिस environment में चलता है, वहाँ **NEXT_PUBLIC_SUPABASE_URL** और **NEXT_PUBLIC_SUPABASE_ANON_KEY** set नहीं हैं।
- Repo में **.env.local** होती ही नहीं (gitignore में है), सिर्फ **.env.example** होता है।
- इसलिए Agent बोल रहा है: "Supabase env in this Cloud session: none found"।

**निष्कर्ष:** समस्या **Supabase की नहीं**, **Cursor Cloud Agent की settings** में है — Secrets/Env vars Agent के runtime तक पहुँच नहीं रहे।

---

## 2. क्या करना है (आपके स्टेप)

### A. Cursor में Cloud Agent की Settings ठीक करो

1. **cursor.com/agents** खोलो → अपना **Cloud Agent** चुनो।
2. **Manage** / **Settings** / **Edit configuration** में जाओ。
3. **Secrets** या **Environment variables** वाला सेक्शन ढूँढो।
4. इन **दोनों** को add/verify करो (नाम बिल्कुल ऐसे ही):

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | अपनी .env.local से copy (Supabase project URL) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | अपनी .env.local से copy (anon key) |

5. अगर कोई option हो **"Expose to runtime"** / **"Available in session"** / **"Inject as env"** — उसे **ON** करो।
6. **Save** करो। फिर **नया Agent session** शुरू करो (पुराना बंद करके)।

यही **सबसे ज़रूरी** कदम है। इसके बाद Agent को env vars मिलने चाहिए।

### B. SUPABASE_DB_URL – डिलीट करूँ या नहीं?

**नहीं, डिलीट मत करो।**  

- **DB URL** का इस्तेमाल direct DB connection के लिए होता है (schema run, import script)। App और Agent की ज़्यादातर बातें **URL + Anon Key** से चलती हैं।
- समस्या DB URL की वजह से नहीं है — समस्या यह है कि **कोई भी env (URL, Anon Key, DB URL)** Agent session में load नहीं हो रहा।
- तो: **Secrets में सब रखो** (URL, Anon Key, और अगर DB changes करवाने हैं तो DB URL भी)। डिलीट करने की ज़रूरत नहीं।

### C. RLS / Write वाली बात (Critical write issue)

Agent ने कहा: schema में सिर्फ SELECT policy है, anon key से insert/update fail हो सकता है।

- **आपके actual Supabase में** पहले हमने **INSERT policy** add कर दिया था (fix_rls_allow_insert.sql चलाकर)। तो **अभी आपके DB में anon key से insert चलना चाहिए**।
- Repo में जो **supabase_schema_complete.sql** है उसमें सिर्फ SELECT लिखा है — उसे बदलने की ज़रूरत नहीं। Live DB में policy add हो चुकी है।
- अगर कभी नया project बनाओ तो उस DB में भी INSERT policy add करना होगा (वही SQL चलाकर)।  
**अभी के लिए:** सिर्फ **Cursor में env vars ठीक करो** — RLS की वजह से block नहीं होना चाहिए।

---

## 3. समस्या कहाँ हो सकती है? (Checklist)

| जगह | क्या चेक करो |
|------|----------------|
| **Cursor Cloud Agent Secrets** | Names बिल्कुल `NEXT_PUBLIC_SUPABASE_URL` और `NEXT_PUBLIC_SUPABASE_ANON_KEY` हों, values .env.local जैसे। |
| **Env vars expose हो रहे हैं?** | Settings में "Expose to runtime" / "Environment" जैसा option ON हो। |
| **Session पुराना तो नहीं?** | Secrets add/change के बाद **नया Cloud Agent session** शुरू करो। |
| **.env.local** | उसे **delete मत करो** — वो आपके local के लिए है। Agent को Cursor की Secrets से vars मिलने चाहिए। |

---

## 4. Supabase के बिना काम चलेगा?

- **नहीं** — आपका app और Agent दोनों **Supabase** पर data के लिए निर्भर हैं (search, outfit, profile, DB changes)。
- इसलिए **Supabase को हटाना या disable नहीं करना**। बस **Agent को credentials दो** (Cursor Secrets में)।

---

## 5. Short Summary

1. **मुख्य समस्या:** Cloud Agent को env vars नहीं मिल रहे (Cursor settings में Secrets/Env सही से set या expose नहीं)।  
2. **क्या करो:** Cursor → Cloud Agent → Manage/Settings → Secrets/Environment में **NEXT_PUBLIC_SUPABASE_URL** और **NEXT_PUBLIC_SUPABASE_ANON_KEY** डालो/ठीक करो, "expose to runtime" ON करो, Save करो, **नया session** शुरू करो।  
3. **DB URL:** डिलीट मत करो। रखो।  
4. **RLS:** आपके live DB में INSERT policy है, anon key से write चलना चाहिए।  
5. **Supabase necessary है** — हटाना नहीं, बस Agent को access दो।

इसके बाद Agent से फिर "Supabase health check" या "count batao" जैसा task दो — अगर vars सही मिल गए तो reply आ जाना चाहिए।
