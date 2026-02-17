# Cloud Agent Settings – चेक और गाइड (हिंदी)

आपने जो settings दिखाई, उनका चेक और आगे क्या करें — स्टेप बाय स्टेप।

---

## 1. सेटिंग्स चेक – कुछ गलत है?

**नहीं। आपकी सेटिंग्स ठीक लग रही हैं。**

| सेटिंग | आपका वैल्यू | स्टेटस |
|--------|----------------|--------|
| Default Model | Codex 5.3 High | ✅ ठीक |
| Default Repository | RANGMATCH/indian-fashion-app | ✅ ठीक |
| Base Branch | खाली (default use होगा) | ✅ ठीक |
| Branch Prefix | cursor/ | ✅ ठीक |
| Create PRs | On | ✅ ठीक |
| PR Review | GitHub | ✅ ठीक |
| **My Secrets (3)** | | |
| → NEXT_PUBLIC_SUPABASE_ANON_KEY | All Repositories, Redacted | ✅ सेट है |
| → NEXT_PUBLIC_SUPABASE_URL | All Repositories, Redacted | ✅ सेट है |
| → SUPABASE_DB_URL | All Repositories, Redacted | ✅ सेट है |

**Redacted** का मतलब: value सेव है, सिर्फ सुरक्षा के लिए दिखाई नहीं दे रही। तीनों Supabase keys **सही नाम से** सेट हैं।

---

## 2. क्या सारी Supabase keys डिलीट करके फिर से डालूँ?

**ज़रूरी नहीं।** पहले **एक बार** ये करो:

1. **नया Cloud Agent session** शुरू करो (पुराना बंद करके नया खोलो)।
2. Agent से लिखो: **"Supabase se mens_fashion_items ka count batao"** या **"Check Supabase connection"**।
3. अगर अब भी बोले "env none found" तो **तब** एक बार सिर्फ **दो** keys डिलीट करके फिर से डालो:
   - **NEXT_PUBLIC_SUPABASE_URL** – डिलीट करो → Add Secret → नाम और value (.env.local से) दोबारा डालो।
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY** – वही करो।
   - **SUPABASE_DB_URL** को **मत हटाओ** (जब तक ज़रूरत न हो)।

ज्यादातर बार नया session ही काफी होता है।

---

## 3. क्या मैं (या Agent) Supabase में read/write कर पा रहा हूँ?

**यहाँ (आपके कंप्यूटर पर Cursor में):**  
हाँ। आपके `.env.local` से **Supabase READ** चेक किया गया – **काम कर रहा है** (mens_fashion_items से एक row मिली)।  
तो **local** से Supabase read/write दोनों चलने चाहिए (RLS policy पहले से add है)।

**Cloud Agent session में:**  
Agent बोल रहा था कि उसके पास env vars नहीं मिल रहे। जब तक Cursor उस session में Secrets को **environment variables** की तरह नहीं देगा, तब तक Cloud Agent Supabase में **direct** read/write नहीं कर पाएगा।  
यानी समस्या **Supabase में नहीं**, **Cloud Agent को vars मिलने** में है।

---

## 4. स्टेप बाय स्टेप – अब आप क्या करें (आसान हिंदी)

### स्टेप 1: कुछ भी मत डिलीट करो
- सारी Supabase keys **रखो**। सेटिंग्स गलत नहीं लग रहीं।

### स्टेप 2: नया Cloud Agent session
1. cursor.com/agents पर जाओ।
2. जो भी chat/session पुराना है उसे **बंद करो**।
3. **नया Agent session** शुरू करो (New / Start fresh)।

### स्टेप 3: फिर से टेस्ट
- Agent को लिखो: **"Supabase connection check karo, mens_fashion_items count batao."**
- अगर अब count या data दिखे तो **read/write access मिल गया**।
- अगर फिर भी "env none found" आए तो आगे स्टेप 4।

### स्टेप 4: सिर्फ अगर अभी भी env न मिले
1. **Manage / My Secrets** में जाओ।
2. **NEXT_PUBLIC_SUPABASE_URL** को **Edit** करो → value फिर से **.env.local** से copy-paste करो → Save।
3. **NEXT_PUBLIC_SUPABASE_ANON_KEY** के साथ भी वही करो।
4. **SUPABASE_DB_URL** को **मत हटाओ**।
5. फिर से **नया Agent session** शुरू करो और स्टेप 3 दोहराओ।

### स्टेप 5: Slack / Notifications
- **Slack Notifications** और **Repository routing** – ये **optional** हैं। Supabase read/write के लिए **ज़रूरी नहीं**। चाहो तो बाद में सेट कर सकते हो।

---

## 5. छोटा सार

- **सेटिंग्स:** ठीक हैं, कुछ गलत नहीं।
- **Keys डिलीट करके दोबारा डालना:** पहले **नया session** आज़माओ; नहीं चला तो सिर्फ URL + Anon Key दोबारा डालो, **सारी keys मत हटाओ**।
- **Supabase read/write:** यहाँ (local) से **काम कर रहा है**; Cloud Agent के लिए **नया session** + अगर ज़रूरत हो तो Secrets दोबारा सेव करना काफी होना चाहिए।

इसी order में स्टेप फॉलो करो – पहले नया session, फिर ज़रूरत पड़े तो Secrets फिर से सेव।
