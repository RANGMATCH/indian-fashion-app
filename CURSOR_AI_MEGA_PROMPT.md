# 🎯 CURSOR AI - COMPLETE WEB APP BUILD PROMPT
## Indian Men's Fashion Intelligence System

---

## 📋 PROJECT OVERVIEW

I want you to build a **complete, production-ready web application** for Indian men's fashion recommendations. This is a full-stack project with Next.js frontend, Supabase backend, and AI-powered recommendations.

---

## 🎯 WHAT TO BUILD

A comprehensive fashion web app that:
- Helps Indian men find perfect outfits for any occasion
- Provides skin tone-based color recommendations
- Offers body type-specific styling advice
- Supports Hindi/English/Hinglish search
- Shows AI-generated outfit visualizations
- Gives psychological confidence-building tips

---

## 📊 DATA FILES PROVIDED

I will upload these files to the project:
1. `mens_fashion_master_FINAL.csv` (128,743 items)
2. `supabase_schema_complete.sql` (Database schema)
3. `data_dictionary.csv` (Column reference)

**Critical Data Points:**
- **Hindi keywords preserved:** 100% (keyword_hindi column)
- **Skin tones:** Fair, Wheatish, Medium, Dusky, Deep
- **Occasions:** Wedding, Formal, Party, Casual, Date Night, etc.
- **Body types:** Regular, Athletic, Plus Size, Slim, Tall
- **Psychology data:** Confidence levels, social approval scores, styling hacks

---

## 🏗️ TECH STACK (MANDATORY)

```
Frontend:
├── Next.js 14 (App Router)
├── React 18
├── TypeScript
├── Tailwind CSS
├── Shadcn/ui components
└── Framer Motion (animations)

Backend:
├── Supabase (PostgreSQL)
├── Supabase Auth
├── Supabase Storage (for images)
└── Supabase Realtime (optional)

AI/ML:
├── OpenAI API (GPT-4 for fallback)
└── Anthropic Claude API (alternative)

Deployment:
├── Vercel (frontend)
└── Supabase Cloud (backend)
```

---

## 📱 APP STRUCTURE

Create the following pages and components:

### **1. Landing Page (`/`)**
```typescript
Features:
- Hero section with search bar
- "Upload your wardrobe" CTA
- Trending outfit combinations
- Testimonials (dummy data)
- How it works section
- Footer with links

Design:
- Modern, minimal, Indian aesthetic
- Colors: Navy (#000080), Maroon (#800000), Cream (#FFFDD0)
- Typography: Inter for English, Noto Sans Devanagari for Hindi
- Mobile-first responsive
```

### **2. Search Page (`/search`)**
```typescript
Features:
- Multi-language search (Hindi/English/Hinglish)
- Voice search button (Web Speech API)
- Filters:
  ├── Skin Tone selector (visual color picker)
  ├── Occasion dropdown
  ├── Body Type selector
  ├── Confidence Level (Safe/Moderate/Bold)
  ├── Price Range slider
  └── Color Family selector

- Results display:
  ├── Grid view (default)
  ├── List view toggle
  ├── Sort: Popular, Recent, Price
  └── Pagination (20 items/page)

- Each result card shows:
  ├── Item name (Hindi + English)
  ├── Color preview (hex color)
  ├── Skin tone compatibility badge
  ├── Confidence level indicator
  ├── Quick "Get Outfit" button
  └── Favorite/Save option

API Integration:
- Supabase query with filters
- Full-text search for Hindi keywords
- Caching with React Query
```

### **3. Outfit Builder (`/outfit-builder`)**
```typescript
Features:
- Interactive outfit creation
- Drag & drop interface
- Real-time preview

Sections:
├── Top Wear selector (shirts, kurtas, t-shirts)
├── Bottom Wear selector (jeans, trousers, dhoti)
├── Footwear selector (shoes, mojari, sneakers)
├── Accessories (watch, belt, sunglasses)
└── Complete look preview (center canvas)

AI Assistance:
- "Auto-suggest complete outfit" button
- Color harmony checker
- Occasion appropriateness score
- Social approval prediction (family/friends/professional/dating)

Save & Share:
- Save outfit to profile
- Generate shareable link
- Download as image
- WhatsApp share button
```

### **4. Profile Page (`/profile`)**
```typescript
Features:
- User info (name, age, body type, skin tone)
- Profile setup wizard (first time)
- My wardrobe (uploaded items)
- Saved outfits
- Favorite items
- Style preferences
- Purchase history (future)

Onboarding Flow:
Step 1: Basic Info (name, age)
Step 2: Skin tone selector (visual guide with examples)
Step 3: Body type selector (illustrations)
Step 4: Style preference quiz (5 questions)
Step 5: Upload existing wardrobe (optional)
```

### **5. Occasion Guide (`/occasions`)**
```typescript
Features:
- List of occasions with cards
- Each card shows:
  ├── Occasion name (Hindi + English)
  ├── Example outfit image
  ├── Formality level
  ├── Best colors
  └── "Get Outfits" CTA

Occasions to include:
- Wedding (शादी)
- Office/Formal (ऑफिस)
- Party (पार्टी)
- Casual Hangout (कैज़ुअल)
- Date Night (डेट)
- Interview (इंटरव्यू)
- Festival (त्योहार)
- Gym/Sports (जिम)

Detail Page (`/occasions/[slug]`):
- Complete guide for that occasion
- Safe, Moderate, Bold outfit options
- Regional variations (North/South India)
- Psychology tips ("How to feel confident")
- What to avoid
- Celebrity inspiration
```

### **6. Style Guide (`/style-guide`)**
```typescript
Features:
- Body type styling hacks
- Skin tone & color guide
- Fabric knowledge base
- Common mistakes to avoid
- Seasonal wardrobe tips

Interactive Elements:
- Body type selector → See your recommendations
- Color picker → See matching colors
- Fabric comparison tool
- Before/After visuals (illustrations)
```

### **7. AI Stylist Chat (`/chat`)**
```typescript
Features:
- Conversational AI interface
- Ask anything in Hindi/English
- Context-aware responses
- Image upload (future: analyze user's outfit)

Example Queries:
- "Wedding mein kya pehnu? Main 30 saal ka hoon, wheatish skin hai"
- "Maroon check shirt ke saath kya match karega?"
- "Office ke liye budget outfit suggest karo"

Implementation:
- GPT-4 or Claude API
- System prompt with database context
- Fallback to database when possible
- Save chat history
```

---

## 🎨 DESIGN SYSTEM

### **Colors**
```typescript
const colors = {
  primary: {
    navy: '#000080',
    maroon: '#800000',
  },
  neutral: {
    cream: '#FFFDD0',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#808080',
  },
  accent: {
    olive: '#556B2F',
    gold: '#FFD700',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  }
};
```

### **Typography**
```typescript
Font Family:
- Headings: 'Inter', sans-serif (weights: 600, 700, 800)
- Body: 'Inter', sans-serif (weights: 400, 500)
- Hindi: 'Noto Sans Devanagari', sans-serif

Font Sizes (Tailwind):
- h1: text-5xl (48px)
- h2: text-4xl (36px)
- h3: text-2xl (24px)
- body: text-base (16px)
- small: text-sm (14px)
```

### **Components to Create**
```typescript
1. SearchBar
   - Input with Hindi/English placeholder
   - Voice search button
   - Clear button
   - Loading state

2. FilterPanel
   - Collapsible sections
   - Visual selectors (not just dropdowns)
   - Active filter badges
   - Clear all button

3. ItemCard
   - Image placeholder (with color preview)
   - Title (bilingual)
   - Color badge with hex
   - Skin tone compatibility
   - Confidence indicator
   - Quick actions

4. OutfitCanvas
   - Drag & drop zones
   - Item preview
   - Color harmony indicator
   - Save/Share buttons

5. ConfidenceIndicator
   - Visual meter (Safe/Moderate/Bold)
   - Color-coded
   - Tooltip with explanation

6. SocialApprovalScore
   - 4 scores: Family, Friends, Professional, Dating
   - Visual representation (stars/hearts)
   - Hover for details

7. SkinTonePicker
   - Visual color swatches
   - Indian skin tone names
   - Description on hover
   - Selected state

8. BodyTypeSelector
   - Illustrations (simple SVG)
   - Hover for styling tips
   - Selected state

9. LoadingStates
   - Skeleton loaders
   - Spinner for actions
   - Progress bars for uploads

10. ErrorStates
    - Empty states (no results)
    - Error messages (user-friendly Hindi)
    - Retry buttons
```

---

## 🔌 SUPABASE INTEGRATION

### **Database Connection**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions (auto-generated from schema)
export type FashionItem = {
  unique_id: string;
  product_id: string;
  keyword_english: string;
  keyword_hindi: string;
  keyword_hinglish: string;
  category: string;
  sub_category: string;
  color_family: string;
  hex_color_enhanced: string;
  fabric: string;
  occasion: string;
  body_type: string;
  age_group: string;
  skin_tone: string;
  confidence_level: string;
  social_approval_score: {
    family: number;
    friends: number;
    professional: number;
    dating: number;
  };
  body_type_hack: string;
  // ... all other columns
};
```

### **API Functions**
```typescript
// lib/api/fashion.ts

// Search items
export async function searchItems(query: string, filters: Filters) {
  const { data, error } = await supabase
    .from('mens_fashion_items')
    .select('*')
    .ilike('keyword_hindi', `%${query}%`)
    .eq('skin_tone', filters.skinTone)
    .eq('occasion', filters.occasion)
    .limit(20);
  
  return { data, error };
}

// Get item by ID
export async function getItem(id: string) {
  const { data, error } = await supabase
    .from('mens_fashion_items')
    .select('*')
    .eq('unique_id', id)
    .single();
  
  return { data, error };
}

// Get outfit suggestions
export async function getOutfitSuggestions(params: {
  topColor: string;
  skinTone: string;
  occasion: string;
}) {
  // Complex query to find matching items
  const { data, error } = await supabase
    .from('mens_fashion_items')
    .select('*')
    .eq('occasion', params.occasion)
    .eq('skin_tone', params.skinTone)
    .in('category', ['Bottom Wear', 'Footwear', 'Accessories'])
    .limit(10);
  
  return { data, error };
}

// Full-text search (Hindi)
export async function searchHindi(query: string) {
  const { data, error } = await supabase
    .rpc('search_fashion_items', { search_query: query });
  
  return { data, error };
}
```

### **Authentication Setup**
```typescript
// Simple email auth (optional for MVP)
// For full version: Google, Phone OTP

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}
```

---

## 🤖 AI INTEGRATION

### **OpenAI Setup**
```typescript
// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIStylingAdvice(query: string, context: any) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an expert Indian men's fashion stylist. 
        You understand Indian skin tones, body types, and occasions.
        Respond in Hindi-English mix (Hinglish) naturally.
        Be practical and confidence-building, not judgmental.
        
        Context: ${JSON.stringify(context)}`
      },
      {
        role: "user",
        content: query
      }
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content;
}
```

### **Database-First, AI-Fallback Strategy**
```typescript
// lib/recommendations.ts

export async function getRecommendations(query: string, userProfile: any) {
  // Step 1: Try database search
  const dbResults = await searchItems(query, {
    skinTone: userProfile.skinTone,
    bodyType: userProfile.bodyType,
    occasion: userProfile.preferredOccasion,
  });

  // Step 2: If good results, return them
  if (dbResults.data && dbResults.data.length >= 5) {
    return {
      source: 'database',
      results: dbResults.data,
    };
  }

  // Step 3: If poor results, use AI
  const aiAdvice = await getAIStylingAdvice(query, {
    userProfile,
    existingResults: dbResults.data,
  });

  return {
    source: 'ai',
    advice: aiAdvice,
    partialResults: dbResults.data,
  };
}
```

---

## 📱 RESPONSIVE DESIGN REQUIREMENTS

### **Mobile (320px - 768px)**
```
- Stack layout (no sidebars)
- Bottom navigation bar
- Swipeable cards
- Touch-friendly buttons (min 44px)
- Collapsible filters
- Simplified outfit builder (step-by-step)
```

### **Tablet (768px - 1024px)**
```
- 2-column grid for items
- Side panel for filters
- Larger touch targets
- Outfit builder with 2 columns
```

### **Desktop (1024px+)**
```
- 3-4 column grid
- Persistent filter sidebar
- Full outfit builder canvas
- Hover states
- Keyboard navigation
```

---

## 🔍 SEARCH & FILTERING LOGIC

### **Search Priority**
```typescript
1. Exact Hindi keyword match
2. Hinglish keyword match
3. English keyword match
4. Sub-category match
5. Color family match
6. Occasion match
```

### **Filter Combinations**
```typescript
Must support these combinations:
- Skin Tone + Occasion + Color
- Body Type + Confidence Level + Occasion
- Occasion + Price Range
- Any filter solo

Smart suggestions:
- If skin tone = Wheatish → Suggest Maroon, Navy, Olive
- If body type = Plus Size → Show dark colors first
- If occasion = Wedding → Show traditional items first
```

---

## 🎯 PSYCHOLOGY FEATURES

### **Confidence Boosting**
```typescript
Show for each outfit:
1. Confidence Level indicator
   - Safe: ✅ शुरुआत के लिए perfect
   - Moderate: ⚡ Stylish but acceptable
   - Bold: 🔥 Fashion-forward

2. Social Approval Prediction
   - Family: ❤️❤️❤️❤️❤️ (5/5)
   - Friends: ⭐⭐⭐⭐ (4/5)
   - Professional: 💼💼💼💼💼 (5/5)
   - Dating: 💕💕💕 (3/5)

3. Body Type Hack (Hindi)
   - "Dark colors pet ko chhupate hain"
   - "Vertical stripes lambe dikhte hain"

4. Problem Solved
   - "Professional confidence के लिए"
   - "Budget में smart dikhने के लिए"
```

---

## 🌐 LANGUAGE SUPPORT

### **Implementation**
```typescript
// Use next-intl or react-i18next

const translations = {
  en: {
    search: "Search outfits...",
    filters: "Filters",
    skinTone: "Skin Tone",
    occasion: "Occasion",
  },
  hi: {
    search: "आउटफिट खोजें...",
    filters: "फ़िल्टर",
    skinTone: "त्वचा का रंग",
    occasion: "अवसर",
  },
  hinglish: {
    search: "Outfit search karein...",
    filters: "Filter",
    skinTone: "Skin tone",
    occasion: "Occasion",
  }
};

// Default: Hinglish (most natural for Indian users)
```

---

## ⚡ PERFORMANCE REQUIREMENTS

```
Loading Times:
- Initial page load: < 2 seconds
- Search results: < 500ms
- Outfit builder: < 1 second
- AI response: < 3 seconds (with loading indicator)

Optimization:
- Next.js Image component (lazy loading)
- React Query for caching
- Supabase connection pooling
- Edge functions for API
- Bundle size < 300KB (gzipped)
```

---

## 🧪 TESTING REQUIREMENTS

```typescript
Create tests for:
1. Search functionality (Hindi keywords)
2. Filter combinations
3. Outfit builder logic
4. AI fallback mechanism
5. Responsive design (mobile/tablet/desktop)

Use:
- Jest for unit tests
- React Testing Library for components
- Playwright for E2E tests
```

---

## 📦 DEPLOYMENT

### **Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Deployment Steps**
```bash
1. Push code to GitHub
2. Connect Vercel to repo
3. Add environment variables in Vercel
4. Deploy
5. Custom domain (optional)
```

---

## 🎨 UI/UX POLISH

### **Micro-interactions**
```
- Button hover states
- Card flip on hover (show more info)
- Smooth transitions (200-300ms)
- Loading skeletons (not just spinners)
- Success animations (checkmark)
- Error shakes
- Drag & drop feedback
```

### **Accessibility**
```
- ARIA labels for all interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader support
- Color contrast (WCAG AA)
- Focus indicators
- Alt text for images
```

---

## 📊 ANALYTICS (Optional but Recommended)

```typescript
Track:
- Search queries (most popular)
- Filter usage
- Outfit saves
- Page views
- User journey (funnel)

Use: Vercel Analytics or Google Analytics
```

---

## 🚀 MVP SCOPE (Build This First)

### **Phase 1: Core Features**
```
✅ Landing page
✅ Search with basic filters
✅ Item detail page
✅ Outfit builder (basic)
✅ Supabase integration
✅ Responsive design
```

### **Phase 2: Enhancement**
```
✅ AI stylist chat
✅ User profiles
✅ Save outfits
✅ Advanced filters
✅ Occasion guide
```

### **Phase 3: Advanced**
```
✅ Image upload & analysis
✅ Social features (share outfits)
✅ Shopping integration
✅ Trend tracking
```

---

## 📝 FILE STRUCTURE

```
indian-mens-fashion-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/
│   │   ├── page.tsx (landing)
│   │   ├── search/
│   │   ├── outfit-builder/
│   │   ├── profile/
│   │   ├── occasions/
│   │   ├── style-guide/
│   │   └── chat/
│   ├── api/
│   │   ├── search/
│   │   ├── recommendations/
│   │   └── ai/
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── SearchBar.tsx
│   ├── FilterPanel.tsx
│   ├── ItemCard.tsx
│   ├── OutfitCanvas.tsx
│   └── ...
├── lib/
│   ├── supabase.ts
│   ├── openai.ts
│   ├── api/
│   │   └── fashion.ts
│   └── utils.ts
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── types/
│   └── fashion.ts
├── data/
│   └── mens_fashion_master_FINAL.csv
└── package.json
```

---

## 🎯 SUCCESS CRITERIA

The app is successful if:
- ✅ All pages render correctly
- ✅ Search works with Hindi keywords
- ✅ Filters produce accurate results
- ✅ Outfit builder is functional
- ✅ Responsive on mobile/tablet/desktop
- ✅ Loading times meet requirements
- ✅ No critical bugs
- ✅ Deployed to production

---

## 💬 COMMUNICATION STYLE

When coding, Cursor AI should:
- Write clean, documented code
- Use TypeScript strictly
- Follow Next.js 14 best practices
- Add comments for complex logic
- Create reusable components
- Handle errors gracefully
- Show loading states
- Provide user-friendly error messages (Hindi)

---

## 🔥 START BUILDING NOW!

Begin with:
1. ✅ Initialize Next.js 14 project with TypeScript
2. ✅ Install dependencies (Supabase, Shadcn/ui, etc.)
3. ✅ Set up Tailwind CSS with custom colors
4. ✅ Create basic layout and navigation
5. ✅ Connect to Supabase
6. ✅ Build landing page
7. ✅ Implement search functionality

---

## 💡 IMPORTANT NOTES

**For Cursor AI:**
- Reference the `mens_fashion_master_FINAL.csv` for data structure
- Use `supabase_schema_complete.sql` to understand database schema
- Preserve Hindi keywords exactly as they are
- Focus on user experience (simple, intuitive)
- Build incrementally (test each feature)
- Ask for clarification if needed

**Data Guidelines:**
- Never modify Hindi keywords
- Respect skin tone categories (Fair/Wheatish/Medium/Dusky/Deep)
- Use hex codes for colors
- Include psychology data in UI (confidence, social approval)
- Show body type hacks in Hindi

---

## 🎊 FINAL CHECKLIST

Before considering the app complete:
- [ ] All pages built and functional
- [ ] Supabase connected and querying
- [ ] Search works with Hindi/English/Hinglish
- [ ] Filters working correctly
- [ ] Outfit builder functional
- [ ] Responsive design implemented
- [ ] Loading states everywhere
- [ ] Error handling implemented
- [ ] TypeScript types defined
- [ ] Code documented
- [ ] Environment variables set
- [ ] Ready to deploy

---

**BUILD KAR DO CURSOR! BEST APP BANANA HAI! 🚀💪🔥**
