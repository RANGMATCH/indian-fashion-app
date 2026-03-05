# Cursor Cloud Agent – पूरी सेटअप गाइड (हिंदी)

Cloud Agent सेट करने के **सारे स्टेप** यहाँ हिंदी में। **Slack connect करना ज़रूरी नहीं** — वो ऑप्शनल है (बाद में चाहो तो कर सकते हो)।

---

## Slack के बारे में (पहले साफ कर लो)

**क्या Slack connect करना है?**  
**नहीं।** Cloud Agent सेट करने के लिए **Slack ज़रूरी नहीं**।  
Slack बाद में अगर नोटिफिकेशन या टीम चैट से जोड़ना चाहो तो कर सकते हो — पहले सिर्फ Cursor + GitHub + Secrets से सेटअप करो।

---

## स्टेप 1: इस प्रोजेक्ट को GitHub पर पहुँचाओ

Cloud Agent को **GitHub (या GitLab)** पर रखा हुआ repo चाहिए। अगर अभी नहीं है तो:

1. **github.com** पर जाओ → Login → **New repository**।
2. Repo का नाम रखो (जैसे `indian-fashion-app`) → **Create repository**।
3. अपने कंप्यूटर पर इसी प्रोजेक्ट फोल्डर में Terminal/CMD खोलो।
4. ये कमांड चलाओ (अपना repo URL लगाओ):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/APNA_USERNAME/indian-fashion-app.git
   git branch -M main
   git push -u origin main
   ```
5. Push हो जाने के बाद **यही repo** Cloud Agent में कनेक्ट करोगे।

---

## स्टेप 2: Cursor में Cloud Agent सेटअप शुरू करो

1. **Cursor** खोलो (जिस project में ये कोड है)।
2. **Command Palette** खोलो:
   - Windows/Linux: **`Ctrl + Shift + P`**
   - Mac: **`Cmd + Shift + P`**
3. ऊपर टाइप करो: **`Cursor: Start Cloud Agent Setup`**।
4. जो ऑप्शन दिखे उसे **Enter** से चुनो।
5. अगर ये कमांड न मिले तो ब्राउज़र में **cursor.com/agents** खोलो और वहाँ से सेटअप शुरू करो।

---

## स्टेप 3: GitHub repo कनेक्ट करो

1. सेटअप में जब **Repository** चुनने को कहे:
   - **GitHub** (या GitLab) चुनो।
   - Login/authorize करो अगर पूछे।
2. लिस्ट में से **इसी प्रोजेक्ट का repo** चुनो (जो तुमने स्टेप 1 में push किया)।
3. **Next / Continue** करो।  
   Agent इसी code पर काम करेगा — same code।

---

## स्टेप 4: Same settings डालो (Secrets / Environment)

जो values तुम **`.env.local`** में use करते हो, वही Cloud Agent को भी देनी होंगी ताकि **same settings** रहें।

1. सेटअप स्क्रीन में **Secrets** या **Environment variables** वाला सेक्शन ढूँढो।
2. नीचे दिए **नाम** और **value** add करो (value अपनी `.env.local` से copy करो):

   | नाम (Name) | कहाँ से लें (Value) |
   |------------|---------------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` की इसी variable की value |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` की इसी variable की value |
   | `OPENAI_API_KEY` | (optional) अगर AI chat use करते हो |
   | `NEXT_PUBLIC_APP_URL` | (optional) जैसे `http://localhost:3000` |
   | `SUPABASE_DB_URL` | (optional) सिर्फ अगर agent DB scripts चलाएगा |

3. **Save / Add** करो। किसी को भी **Slack** से जोड़ने की ज़रूरत नहीं।

---

## स्टेप 5: Install और Startup commands

1. **Install command** वाली जगह पर लिखो: **`npm install`**
2. **Startup command** (अगर पूछे): optional में **`npm run dev`** लिख सकते हो — ताकि agent cloud पर app चला सके।
3. **Save / Next** करो।

---

## स्टेप 6: सेटअप खत्म करो और Agent चलाओ

1. अगर **Agent का नाम** पूछे तो कोई नाम दो (जैसे `RangMatch Agent`)।
2. सब कुछ ठीक दिखे तो **Finish / Complete setup** करो。
3. Agent चलाने के लिए:
   - Cursor में जहाँ Agent चुनते हो वहाँ **Cloud** ऑप्शन चुनो, या
   - ब्राउज़र में **cursor.com/agents** खोलकर वहाँ से agent start करो।

इसके बाद agent **इसी repo** और **इन्हीं settings** के साथ काम करेगा।

---

## एक पन्ने में सार (Summary)

| स्टेप | क्या करना है |
|-------|----------------|
| 1 | प्रोजेक्ट **GitHub** पर push करो (नया repo बनाकर)। |
| 2 | Cursor में **`Ctrl+Shift+P`** → **`Cursor: Start Cloud Agent Setup`** चलाओ। |
| 3 | **GitHub repo** कनेक्ट करो (इसी प्रोजेक्ट वाला)। |
| 4 | **Secrets** में वही variables डालो जो `.env.local` में हैं (ऊपर टेबल देखो)। |
| 5 | **Install:** `npm install` लिखो। **Startup (optional):** `npm run dev`। |
| 6 | सेटअप **Complete** करो। बाद में Agent को **Cloud** से start करो। |

**Slack:** सेटअप के लिए **connect नहीं करना**। बाद में चाहो तो Cursor की Integrations में जाकर Slack जोड़ सकते हो।

---

## अगर कुछ पूछे (FAQ)

- **Slack जोड़ना ज़रूरी है?** → नहीं। Cloud Agent चलाने के लिए सिर्फ Cursor + GitHub + Secrets काफी हैं।
- **Secrets कहाँ से लूँ?** → अपनी **`.env.local`** फाइल से same names और values copy करो।
- **Repo पहले से GitHub पर है?** → तो सिर्फ स्टेप 2 से शुरू करो और स्टेप 3 में वही repo चुनो।

इस गाइड के बाद तुम्हें बस ये स्टेप्स फॉलो करने हैं — **Slack connect करना ज़रूरी नहीं**।
