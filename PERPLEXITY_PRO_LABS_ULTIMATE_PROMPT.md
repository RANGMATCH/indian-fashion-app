# 🎯 ULTIMATE MEN'S FASHION DATABASE CREATOR & SUPABASE ARCHITECT

## मेरा MISSION: Indian Men's Fashion का सबसे Complete & Intelligent Database बनाना

आप एक **Indian Men's Fashion Expert + Data Scientist + Database Architect + Psychology Expert** हैं। मुझे दो CSV files को analyze करके एक production-ready fashion database बनाना है जो:
- Supabase में seamlessly integrate हो
- Indian men की real problems solve करे
- AI-powered recommendations के लिए optimized हो
- Psychological insights include करे
- Regional & cultural sensitivity maintain करे

---

## 📊 UPLOADED FILES:

1. **RangMatch_COMPLETE_WITH_SKIN_TONE (1).csv**
   - Large file with men's fashion data
   - Color matching data included
   - Skin tone recommendations present
   - Keywords in Hindi + English mix

2. **supabase_1.csv**
   - Smaller reference file
   - Existing structure/schema hints
   - Keywords database

---

## 🎯 YOUR COMPREHENSIVE TASKS:

### 📋 TASK 1: DEEP DATA ANALYSIS (सबसे पहले ये करें)

**1.1 Complete Data Audit:**
```
दोनों CSV files का पूरा breakdown दें (Hindi में report):

FILE 1: RangMatch_COMPLETE_WITH_SKIN_TONE (1).csv
├── Total Rows: [number]
├── Total Columns: [number]
├── Column Names: [list all]
├── Data Types Found: [text/number/boolean/etc]
├── Hindi Keywords Count: [number]
├── English Terms Count: [number]
├── Null/Missing Values: [column-wise count]
├── Duplicate Rows: [if any]
└── Data Quality Issues: [list problems]

FILE 2: supabase_1.csv
├── [same structure as above]
```

**1.2 Identify Key Categories:**
- Fashion Articles (कितने types: Shirts, Kurtas, Jeans, etc.)
- Colors (कितने colors और उनके shades)
- Skin Tones (categories found)
- Patterns (Check, Solid, Striped, etc.)
- Occasions (Formal, Casual, Wedding, etc.)
- Body Types (if present)
- Regional Data (North/South/etc.)

**1.3 Hindi Keywords Preservation Analysis:**
```
Hindi Keywords Found: [complete list]
├── Search Terms: [list]
├── Style Terms: [list]
├── Occasion Terms: [list]
└── Regional Terms: [list]

⚠️ CRITICAL: ये सभी keywords EXACTLY SAME रहने चाहिए - कोई modification नहीं
```

---

### 🔄 TASK 2: INTELLIGENT DATA MERGING & CLEANING

**2.1 Merging Strategy:**

```python
# Pseudo-logic for merging:
IF supabase_1.csv contains schema/structure hints:
    Use it as base structure
    Map RangMatch data into this structure
    
IF supabase_1.csv contains keywords:
    Keep ALL keywords intact
    Add RangMatch data as additional entries
    
Smart Deduplication:
    - Check for duplicate items (same name + color + category)
    - Keep entry with MORE complete data
    - Log all removed duplicates with reason
```

**2.2 Data Cleaning Rules:**

✅ **DO:**
- Standardize English terms: "T-Shirt" vs "Tshirt" vs "T shirt" → Choose ONE format
- Add missing skin tone recommendations using Indian fashion rules
- Fill missing occasion tags based on clothing type
- Correct obvious typos
- Standardize color names: "Navy Blue" vs "navy blue" → "Navy Blue"
- Remove invalid/test entries (if any)

❌ **DON'T:**
- Change ANY Hindi keywords
- Delete any unique fashion items
- Modify color hex codes (if present)
- Remove regional/cultural specific terms

**2.3 Enhanced Data Addition (Indian Fashion Expert Advice):**

As an expert, ADD these intelligent suggestions:

**For Each Clothing Item, Add:**
```
1. SKIN TONE COMPATIBILITY:
   - Best For: [Fair/Wheatish/Medium/Dusky/Deep]
   - Why: [brief reason in Hindi-English mix]
   - Example: "Navy Blue - सभी skin tones के लिए perfect, especially Wheatish aur Dusky"

2. OCCASION TAGS (Multi-select):
   - [Office/Casual/Wedding/Party/Festival/Interview/Date/Formal Event]
   - Add based on item type and color

3. BODY TYPE RECOMMENDATIONS:
   - Best For: [Slim/Athletic/Heavy/Tall/Short]
   - Styling Tip: [Hindi mein practical advice]
   - Example: "Vertical Stripes - लंबाई का illusion देते हैं, short height वाले के लिए best"

4. SEASON SUITABILITY:
   - [Summer/Winter/Monsoon/All-Season]
   - Fabric consideration se decide करें

5. AGE GROUP:
   - [18-25/26-35/36-45/45+/All Ages]
   - Style aur trendiness ke basis pe

6. STYLING CONFIDENCE LEVEL:
   - Safe: Traditional/classic looks जो हर जगह acceptable
   - Moderate: Modern but not too bold
   - Bold: Experimental/fashion-forward looks

7. REGIONAL APPROPRIATENESS:
   - Pan India / North India / South India / East / West / specific states
   - Cultural sensitivity maintain करें
```

---

### 🎨 TASK 3: COLOR & IMAGE METADATA GENERATION

**3.1 Color Hex Code Addition:**

```
For EVERY color mentioned, add HEXA CODE:

Structure:
├── colour_name: "Navy Blue"
├── colour_hexa: "#000080"
├── colour_family: "Blue"
├── colour_shade_variant: "Dark"
└── colour_description: "गहरा नीला, professional aur versatile"

Complete Color Families to Process:
1. Red Family: Bright Red (#FF0000), Maroon (#800000), Crimson (#DC143C), 
   Cherry Red (#DE3163), Wine Red (#722F37), Rust Red (#B7410E), 
   Dark Red (#8B0000), Light Red (#FF6B6B)

2. Blue Family: Navy Blue (#000080), Royal Blue (#4169E1), Sky Blue (#87CEEB),
   Turquoise (#40E0D0), Light Blue (#ADD8E6), Dark Blue (#00008B)

3. Green Family: Olive Green (#808000), Forest Green (#228B22), Mint Green (#98FF98),
   Emerald (#50C878), Dark Green (#006400), Lime Green (#32CD32)

4. Neutral Family: White (#FFFFFF), Black (#000000), Grey (#808080), 
   Beige (#F5F5DC), Cream (#FFFDD0), Brown (#A52A2A), Tan (#D2B48C)

5. [Continue for all other colors in data]

⚠️ अगर कोई color already hex code के साथ है, उसे preserve करें
```

**3.2 Image Metadata Creation:**

```
For items WITHOUT actual images, create detailed IMAGE METADATA for future AI generation:

Column: image_metadata (JSON format या detailed text)

Template:
{
  "description": "[Item का complete visual description]",
  "model_type": "Indian male, [age group], [body type], [skin tone]",
  "clothing_details": "[Fabric, fit, style, pattern specifics]",
  "pose": "[Full body / Upper body / Product shot / Flatlay]",
  "setting": "[Studio / Outdoor / Lifestyle / Professional]",
  "lighting": "[Natural / Studio / Dramatic / Soft]",
  "background": "[White / Neutral / Contextual / Environment]",
  "styling_context": "[Complete outfit / Standalone item]",
  "color_accuracy": "[Exact hex codes to match]",
  "occasion_context": "[Where this would be worn]",
  "accessories": "[What accessories should be shown]",
  "ai_prompt": "[Complete Midjourney/DALL-E ready prompt]"
}

Example for "Maroon Check Shirt":
{
  "description": "Maroon check pattern shirt with white base, full sleeves, 
                  cotton fabric, semi-formal style, button-down collar",
  "model_type": "Indian male, 28-32 age, athletic build, wheatish skin tone",
  "clothing_details": "Slim fit cut, visible check pattern (2cm squares), 
                       maroon #800000 lines on white #FFFFFF base, 
                       chest pocket visible",
  "pose": "Full body standing, casual confident pose, hands in pockets",
  "setting": "Urban outdoor, soft natural lighting, slightly blurred background",
  "lighting": "Golden hour natural light, warm tones",
  "background": "City street / modern office building exterior (blurred)",
  "styling_context": "Complete outfit - paired with navy blue chinos, 
                      brown leather loafers, brown watch",
  "color_accuracy": "Maroon #800000, White #FFFFFF - maintain exact shades",
  "occasion_context": "Smart casual, office Friday, casual date",
  "accessories": "Brown leather strap watch, brown leather belt (matching shoes)",
  "ai_prompt": "Professional photo of Indian man, age 30, athletic build, 
                wheatish complexion, wearing maroon check shirt with white base 
                (#800000 and #FFFFFF), slim fit, paired with navy blue chinos 
                and brown leather loafers, brown leather watch, standing 
                confidently, outdoor urban setting, golden hour lighting, 
                soft background blur, full body shot, natural expression, 
                high detail, professional photography, 4K quality"
}
```

---

### 🧠 TASK 4: PSYCHOLOGY-BASED INTELLIGENCE (Indian Men की Real Problems)

**4.1 Add Problem-Solution Mapping:**

```
For relevant items, add PSYCHOLOGICAL INSIGHT columns:

1. solves_problem:
   - "Pet छुपाने के लिए" (For belly concealing)
   - "Height बढ़ाने का illusion" (Height enhancement)
   - "Professional confidence के लिए" (Career boost)
   - "Budget में smart dikhने के लिए" (Budget styling)

2. confidence_level:
   - Beginner Safe (शुरुआत के लिए, कोई risk नहीं)
   - Moderate (थोड़ा style statement के साथ)
   - Advanced (Fashion-forward, bold choices)

3. common_mistake_avoider:
   - "White socks avoid करें formal के साथ"
   - "Belt और shoes ka color match करें"
   - "Proper fit ज़रूरी है, oversized avoid करें"

4. body_type_hack:
   [Specific styling hacks based on body insecurities]

5. social_approval_score:
   - Family-Friendly: 5/5 (Gharwale khush honge)
   - Friend Circle: 4/5 (Friends impress honge)
   - Professional: 5/5 (Office mein appropriate)
   - Dating: 4/5 (Attractive without trying too hard)
```

**4.2 Occasion Psychology:**

```
Add detailed OCCASION INTELLIGENCE:

occasion_details (JSON or separate columns):
{
  "event_type": "Wedding Guest",
  "your_role": "Friend of groom",
  "venue_type": "5-star hotel / Farmhouse / Temple",
  "time_of_day": "Evening",
  "dress_code": "Indian Formal",
  "safe_choice": "[Outfit description with items]",
  "moderate_choice": "[Slightly trendy option]",
  "bold_choice": "[Fashion-forward option]",
  "what_to_avoid": "[Common mistakes for this occasion]",
  "grooming_checklist": ["Haircut fresh", "Beard trimmed", "Shoes polished"],
  "confidence_tips": "[Hindi mein psychological boost advice]"
}
```

---

### 🗄️ TASK 5: SUPABASE SCHEMA DESIGN (Production-Ready)

**5.1 Complete SQL Schema:**

Create comprehensive Supabase-ready schema with:

```sql
-- ============================================
-- CORE TABLES
-- ============================================

-- 1. CLOTHING ITEMS MASTER TABLE
CREATE TABLE clothing_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL,
    item_name_hindi TEXT,
    category TEXT NOT NULL, -- Top Wear, Bottom Wear, Footwear, Accessory
    sub_category TEXT NOT NULL, -- Shirt, Kurta, Jeans, etc.
    style_type TEXT, -- Check, Solid, Striped, Printed, Embroidered
    
    -- Color Information
    primary_colour TEXT NOT NULL,
    primary_colour_hexa TEXT,
    secondary_colour TEXT,
    secondary_colour_hexa TEXT,
    colour_family TEXT, -- Red, Blue, Green, Neutral
    colour_shades JSONB, -- Array of shade variants with hex codes
    
    -- Styling Intelligence
    pattern_details TEXT,
    fabric_type TEXT,
    fit_type TEXT, -- Slim, Regular, Loose, Oversized
    
    -- Occasion & Context
    occasions TEXT[], -- Array: [Office, Casual, Wedding, Party]
    season_suitable TEXT[], -- [Summer, Winter, Monsoon, All-Season]
    region_appropriate TEXT[], -- [Pan India, North, South, etc.]
    
    -- User Targeting
    best_for_skin_tone TEXT[], -- [Fair, Wheatish, Medium, Dusky, Deep]
    best_for_body_type TEXT[], -- [Slim, Athletic, Heavy, Tall, Short]
    best_for_age_group TEXT[], -- [18-25, 26-35, 36-45, 45+]
    
    -- Psychology & Behavior
    confidence_level TEXT, -- Safe, Moderate, Bold
    solves_problem TEXT[],
    social_approval_score JSONB, -- {family: 5, friends: 4, professional: 5}
    
    -- Image & Visual
    image_url TEXT,
    image_metadata JSONB,
    
    -- Search & Discovery
    search_keywords_hindi TEXT[],
    search_keywords_english TEXT[],
    tags TEXT[],
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    popularity_score INTEGER DEFAULT 0,
    
    -- Indexing for performance
    CONSTRAINT valid_category CHECK (category IN ('Top Wear', 'Bottom Wear', 'Footwear', 'Accessory', 'Complete Outfit'))
);

-- Create indexes for fast searching
CREATE INDEX idx_clothing_category ON clothing_items(category);
CREATE INDEX idx_clothing_subcategory ON clothing_items(sub_category);
CREATE INDEX idx_clothing_colour ON clothing_items(primary_colour);
CREATE INDEX idx_clothing_occasions ON clothing_items USING GIN (occasions);
CREATE INDEX idx_clothing_skin_tone ON clothing_items USING GIN (best_for_skin_tone);
CREATE INDEX idx_clothing_search_hindi ON clothing_items USING GIN (search_keywords_hindi);
CREATE INDEX idx_clothing_search_english ON clothing_items USING GIN (search_keywords_english);
CREATE INDEX idx_clothing_tags ON clothing_items USING GIN (tags);

-- Full-text search support (CRITICAL for Hindi keywords)
CREATE INDEX idx_clothing_fulltext ON clothing_items USING GIN (
    to_tsvector('simple', 
        COALESCE(item_name, '') || ' ' || 
        COALESCE(item_name_hindi, '') || ' ' ||
        COALESCE(array_to_string(search_keywords_hindi, ' '), '') || ' ' ||
        COALESCE(array_to_string(search_keywords_english, ' '), '')
    )
);


-- ============================================
-- 2. COLOUR PALETTE TABLE
-- ============================================
CREATE TABLE colour_palette (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    colour_name TEXT NOT NULL UNIQUE,
    colour_name_hindi TEXT,
    colour_hexa TEXT NOT NULL,
    rgb_values TEXT,
    colour_family TEXT NOT NULL, -- Red, Blue, Green, Yellow, Neutral
    shade_type TEXT, -- Bright, Dark, Light, Medium, Pastel
    
    -- Relationships
    complementary_colours TEXT[], -- Colors that pair well
    contrasting_colours TEXT[], -- Bold combinations
    avoid_with_colours TEXT[], -- Combinations to avoid
    
    -- Context
    best_for_skin_tone TEXT[],
    occasion_suitability TEXT[],
    season_best TEXT[],
    psychology_meaning TEXT, -- "Navy = Professional, Trustworthy"
    
    -- Visual
    swatch_image_url TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_colour_family ON colour_palette(colour_family);
CREATE INDEX idx_colour_name ON colour_palette(colour_name);


-- ============================================
-- 3. STYLING RULES ENGINE TABLE
-- ============================================
CREATE TABLE styling_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_name TEXT NOT NULL,
    rule_name_hindi TEXT,
    scenario TEXT NOT NULL, -- "Maroon Check Shirt Styling"
    
    -- Input Item Reference
    input_item_category TEXT NOT NULL,
    input_item_type TEXT,
    input_item_colour TEXT,
    input_item_pattern TEXT,
    
    -- Recommendations (JSONB for flexibility)
    recommended_bottom_wear JSONB, -- [{name, colour, why}, ...]
    recommended_footwear JSONB,
    recommended_accessories JSONB,
    hair_style_suggestions JSONB,
    grooming_tips TEXT[],
    
    -- Complete Look
    complete_look_description TEXT,
    complete_look_description_hindi TEXT,
    outfit_vibe TEXT, -- Professional, Casual, Trendy, Classic
    
    -- Targeting
    best_for_skin_tone TEXT[],
    best_for_body_type TEXT[],
    best_for_age_group TEXT[],
    suitable_occasions TEXT[],
    
    -- Confidence & Psychology
    confidence_level TEXT,
    why_this_works TEXT,
    common_mistakes_to_avoid TEXT[],
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    usage_count INTEGER DEFAULT 0,
    user_rating DECIMAL(2,1), -- Avg rating from users
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_styling_input_category ON styling_rules(input_item_category);
CREATE INDEX idx_styling_input_colour ON styling_rules(input_item_colour);
CREATE INDEX idx_styling_occasions ON styling_rules USING GIN (suitable_occasions);


-- ============================================
-- 4. OCCASION INTELLIGENCE TABLE
-- ============================================
CREATE TABLE occasion_guide (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    occasion_name TEXT NOT NULL,
    occasion_name_hindi TEXT,
    occasion_category TEXT, -- Wedding, Office, Casual, Festival, Interview
    
    -- Context Details
    your_role TEXT[], -- [Guest, Host, Participant, Attendee]
    venue_type TEXT[], -- [Hotel, Outdoor, Temple, Office, Café]
    time_of_day TEXT[], -- [Morning, Afternoon, Evening, Night]
    formality_level TEXT, -- Casual, Semi-Formal, Formal, Black-Tie
    
    -- Outfit Options (JSONB for rich structure)
    safe_outfit JSONB, -- {description, items, why, image_ref}
    moderate_outfit JSONB,
    bold_outfit JSONB,
    what_to_avoid TEXT[],
    
    -- Grooming & Preparation
    grooming_checklist TEXT[],
    confidence_tips TEXT,
    confidence_tips_hindi TEXT,
    
    -- Regional Variations
    north_india_variation TEXT,
    south_india_variation TEXT,
    east_india_variation TEXT,
    west_india_variation TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_occasion_category ON occasion_guide(occasion_category);
CREATE INDEX idx_occasion_formality ON occasion_guide(formality_level);


-- ============================================
-- 5. FASHION MISTAKES DATABASE
-- ============================================
CREATE TABLE common_mistakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mistake_name TEXT NOT NULL,
    mistake_name_hindi TEXT,
    mistake_description TEXT NOT NULL,
    mistake_description_hindi TEXT,
    
    why_wrong TEXT,
    why_wrong_hindi TEXT,
    correct_way TEXT,
    correct_way_hindi TEXT,
    
    severity_level TEXT, -- High, Medium, Low
    category TEXT, -- Color Matching, Fit, Accessories, Grooming
    
    before_image_ref TEXT,
    after_image_ref TEXT,
    
    affects_occasions TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 6. BODY TYPE SOLUTIONS TABLE
-- ============================================
CREATE TABLE body_type_hacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    body_concern TEXT NOT NULL, -- Belly, Short Height, Skinny, Narrow Shoulders
    body_concern_hindi TEXT,
    
    clothing_solutions JSONB, -- [{item_type, why, specific_styles}, ...]
    what_to_avoid TEXT[],
    styling_tricks TEXT[],
    styling_tricks_hindi TEXT[],
    
    accessory_tips TEXT[],
    grooming_integration TEXT[],
    
    confidence_message TEXT,
    confidence_message_hindi TEXT,
    
    visual_examples TEXT[], -- Image URLs
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 7. FABRIC KNOWLEDGE TABLE
-- ============================================
CREATE TABLE fabric_guide (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fabric_name TEXT NOT NULL UNIQUE,
    fabric_name_hindi TEXT,
    
    characteristics TEXT,
    characteristics_hindi TEXT,
    
    best_for_season TEXT[],
    best_for_occasions TEXT[],
    comfort_rating INTEGER, -- 1-5
    durability_rating INTEGER, -- 1-5
    maintenance_level TEXT, -- Easy, Moderate, High
    
    price_range TEXT, -- Budget, Mid-Range, Premium
    care_instructions TEXT,
    care_instructions_hindi TEXT,
    
    how_to_identify_quality TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 8. SEASONAL WARDROBE PLANNER
-- ============================================
CREATE TABLE seasonal_guide (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    season TEXT NOT NULL, -- Summer, Monsoon, Winter
    region TEXT NOT NULL, -- North India, South India, etc.
    
    must_have_items JSONB, -- [{item, why, priority}, ...]
    recommended_fabrics TEXT[],
    recommended_colours TEXT[],
    avoid_items TEXT[],
    
    styling_tips TEXT[],
    styling_tips_hindi TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 9. CELEBRITY STYLE REFERENCE
-- ============================================
CREATE TABLE celebrity_styles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    celebrity_name TEXT NOT NULL,
    
    signature_style TEXT,
    signature_style_hindi TEXT,
    
    best_looks JSONB, -- [{look_name, description, image, occasion}, ...]
    style_personality TEXT, -- Bold, Classic, Quirky, Athletic
    
    how_to_recreate_budget TEXT,
    how_to_recreate_budget_hindi TEXT,
    
    relatable_for_body_type TEXT[],
    relatable_for_age_group TEXT[],
    occasions_suitable TEXT[],
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================
-- 10. AI FALLBACK QUERY LOG
-- ============================================
CREATE TABLE ai_query_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_query TEXT NOT NULL,
    user_query_lang TEXT, -- Hindi, English, Hinglish
    
    ai_response TEXT,
    response_source TEXT, -- OpenAI, Claude, Local
    
    was_helpful BOOLEAN,
    user_rating INTEGER, -- 1-5
    user_feedback TEXT,
    
    should_add_to_db BOOLEAN DEFAULT false,
    converted_to_rule_id UUID REFERENCES styling_rules(id),
    
    query_context JSONB, -- User profile, previous queries
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_query_date ON ai_query_log(created_at DESC);
CREATE INDEX idx_ai_helpful ON ai_query_log(was_helpful) WHERE was_helpful = true;


-- ============================================
-- 11. SEARCH KEYWORDS MASTER TABLE
-- ============================================
CREATE TABLE search_keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    keyword TEXT NOT NULL,
    keyword_lang TEXT NOT NULL, -- Hindi, English
    keyword_type TEXT, -- Item Name, Color, Style, Occasion
    
    search_count INTEGER DEFAULT 0,
    related_clothing_items UUID[] REFERENCES clothing_items(id),
    
    synonyms TEXT[], -- [मैरून, maroon, गहरा लाल]
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_searched_at TIMESTAMPTZ
);

CREATE INDEX idx_keyword_search ON search_keywords(keyword);
CREATE INDEX idx_keyword_lang ON search_keywords(keyword_lang);
CREATE INDEX idx_keyword_popular ON search_keywords(search_count DESC);


-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE clothing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE styling_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_query_log ENABLE ROW LEVEL SECURITY;

-- Public read access for core fashion data
CREATE POLICY "Public read access for clothing" ON clothing_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for styling rules" ON styling_rules
    FOR SELECT USING (is_active = true);

-- AI query log - users can only see their own queries
CREATE POLICY "Users see own queries" ON ai_query_log
    FOR SELECT USING (auth.uid() = user_id);


-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clothing_items_updated_at
    BEFORE UPDATE ON clothing_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_styling_rules_updated_at
    BEFORE UPDATE ON styling_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- HELPER VIEWS
-- ============================================

-- View for popular clothing items
CREATE VIEW popular_clothing AS
SELECT 
    id, item_name, category, sub_category, 
    primary_colour, popularity_score
FROM clothing_items
WHERE is_active = true
ORDER BY popularity_score DESC
LIMIT 100;

-- View for Hindi keyword search
CREATE VIEW hindi_searchable_items AS
SELECT 
    c.id, c.item_name, c.item_name_hindi,
    c.search_keywords_hindi,
    c.primary_colour, c.category
FROM clothing_items c
WHERE c.is_active = true
AND c.search_keywords_hindi IS NOT NULL;
```

**5.2 Data Import Strategy:**

```sql
-- SEED DATA SCRIPT STRUCTURE
-- (Actual data will be generated from CSV analysis)

-- Example structure for inserting from CSV:

INSERT INTO clothing_items (
    item_name,
    item_name_hindi,
    category,
    sub_category,
    primary_colour,
    primary_colour_hexa,
    occasions,
    best_for_skin_tone,
    search_keywords_hindi,
    image_metadata
) VALUES
('Maroon Check Shirt', 
 'मैरून चेक शर्ट',
 'Top Wear',
 'Shirt',
 'Maroon',
 '#800000',
 ARRAY['Office', 'Casual', 'Semi-Formal'],
 ARRAY['Wheatish', 'Medium', 'Dusky', 'Deep'],
 ARRAY['मैरून', 'चेक शर्ट', 'ऑफिस शर्ट'],
 '{"description": "Maroon check pattern shirt...", "ai_prompt": "..."}'::jsonb
),
-- [Next 999 rows in same batch]
...
;

-- Batch size: 1000 rows per INSERT for optimal performance
```

---

### 📊 TASK 6: COMPREHENSIVE DATA REPORT (Hindi में)

**6.1 Executive Summary:**

```
╔═══════════════════════════════════════════════════════════╗
║        INDIAN MEN'S FASHION DATABASE REPORT               ║
║              Final Analysis & Statistics                  ║
╚═══════════════════════════════════════════════════════════╝

📊 OVERALL DATABASE STATISTICS:
├─ Total Unique Clothing Items: [X] pieces
├─ Total Colors Covered: [X] colors ([Y] shades)
├─ Total Fashion Rules Created: [X] rules
├─ Hindi Keywords Preserved: [X] keywords
├─ Image Metadata Entries: [X] items
└─ Supabase Tables Created: 11 comprehensive tables

📈 DATA QUALITY SCORE: [X]/100
├─ Completeness: [X]% (kitne fields populated hain)
├─ Accuracy: [X]% (data validation checks passed)
├─ Consistency: [X]% (formatting uniformity)
└─ Richness: [X]% (additional intelligence added)
```

**6.2 Category-Wise Breakdown:**

```
👔 TOP WEAR ANALYSIS:
├── Shirts: [count] items
│   ├── Check Pattern: [count]
│   ├── Solid: [count]
│   ├── Striped: [count]
│   └── Printed: [count]
├── Kurtas: [count] items
│   ├── Traditional: [count]
│   ├── Modern Cut: [count]
│   └── Fusion Style: [count]
├── T-Shirts: [count] items
├── Ethnic Wear: [count] items
│   ├── Sherwani: [count]
│   ├── Bandhgala: [count]
│   └── Nehru Jacket: [count]
└── Western Formal: [count] items
    ├── Blazers: [count]
    └── Suits: [count]

👖 BOTTOM WEAR ANALYSIS:
├── Jeans: [count] items
├── Trousers: [count] items
│   ├── Formal: [count]
│   └── Casual: [count]
├── Chinos: [count] items
├── Traditional: [count] items
│   ├── Dhoti: [count]
│   ├── Churidar: [count]
│   └── Pajama: [count]
└── Shorts: [count] items

👞 FOOTWEAR ANALYSIS:
├── Formal Shoes: [count] pairs
├── Casual Shoes: [count] pairs
├── Sneakers: [count] pairs
├── Traditional: [count] pairs
│   ├── Juti: [count]
│   ├── Mojari: [count]
│   └── Kolhapuri: [count]
└── Sandals: [count] pairs

💎 ACCESSORIES:
├── Watches: [count] items
├── Belts: [count] items
├── Jewelry: [count] items
├── Bags: [count] items
└── Traditional: [count] items
    ├── Turban/Pagdi: [count]
    └── Stoles: [count]
```

**6.3 Color Intelligence Report:**

```
🎨 COLOR DISTRIBUTION:

NEUTRAL COLORS (सबसे versatile):
├── White: [count] items | Hexa: #FFFFFF
├── Black: [count] items | Hexa: #000000
├── Grey Shades: [count] items
├── Beige/Cream: [count] items
├── Brown Family: [count] items
└── Navy Blue: [count] items | Hexa: #000080

BOLD COLORS:
├── Red Family: [count] items
│   └── Shades: Bright Red, Maroon, Crimson, Cherry, Wine, Rust, Dark Red
├── Blue Family: [count] items
│   └── Shades: Royal Blue, Sky Blue, Turquoise, Light Blue
├── Green Family: [count] items
│   └── Shades: Olive, Forest, Mint, Emerald
└── Other Bold Colors: [count] items

SKIN TONE COMPATIBILITY MATRIX:
├── Best for Fair Skin: [X] items ([top 5 colors list])
├── Best for Wheatish Skin: [X] items ([top 5 colors list])
├── Best for Medium Skin: [X] items ([top 5 colors list])
├── Best for Dusky Skin: [X] items ([top 5 colors list])
└── Best for Deep Skin: [X] items ([top 5 colors list])

⚠️ COLORS MISSING HEXA CODES: [X] items
└── [List if any, with action plan]
```

**6.4 Occasion Coverage:**

```
🎭 OCCASION-WISE AVAILABILITY:

PROFESSIONAL WEAR:
├── Office Daily: [count] complete outfits possible
├── Client Meeting: [count] options
├── Interview: [count] options
└── Business Casual: [count] options

CASUAL & LIFESTYLE:
├── Daily Casual: [count] options
├── Weekend Hangout: [count] options
├── Date/Romantic: [count] options
├── Gym/Sports: [count] options
└── Travel/Comfort: [count] options

TRADITIONAL & FESTIVE:
├── Wedding Guest: [count] options
│   ├── North Indian Wedding: [count]
│   └── South Indian Wedding: [count]
├── Festival Wear: [count] options
│   ├── Diwali: [count]
│   ├── Eid: [count]
│   ├── Holi: [count]
│   └── Regional Festivals: [count]
├── Religious Functions: [count] options
└── Family Gatherings: [count] options

SPECIAL OCCASIONS:
├── Party/Club: [count] options
├── College/Reunion: [count] options
├── First Date: [count] options
└── Formal Events: [count] options
```

**6.5 Psychology & Intelligence Additions:**

```
🧠 SMART FEATURES ADDED:

PROBLEM-SOLVING DATA:
├── Belly-Concealing Options: [count] items with specific styling hacks
├── Height-Enhancement Styles: [count] items with visual tricks
├── Confidence-Boosting Looks: [count] complete outfits
├── Budget-Friendly Combinations: [count] value outfits
└── Age-Appropriate Styles: [breakdown by age groups]

BODY TYPE INTELLIGENCE:
├── For Slim Build: [count] items with styling tips
├── For Athletic Build: [count] items optimized
├── For Heavy Build: [count] items with flattering cuts
├── For Tall Men: [count] proportioned styles
└── For Short Men: [count] lengthening options

CONFIDENCE LEVELS:
├── Safe/Beginner: [count] foolproof combinations
├── Moderate/Trendy: [count] stylish options
└── Bold/Advanced: [count] fashion-forward looks

COMMON MISTAKES ADDRESSED:
├── Color Matching Errors: [count] rules to avoid
├── Fit Issues: [count] guidelines
├── Accessory Mistakes: [count] dos and don'ts
└── Grooming Gaps: [count] integration tips
```

**6.6 Regional & Cultural Data:**

```
🌍 REGIONAL REPRESENTATION:

NORTH INDIA:
├── Punjab: [count] traditional items
│   └── Kurta-Pajama, Turban styles
├── Delhi NCR: [count] urban fusion styles
├── Rajasthan: [count] Bandhgala, Safa items
└── Himachal/J&K: [count] cold-weather traditional

SOUTH INDIA:
├── Tamil Nadu: [count] items
│   └── Veshti/Lungi styling
├── Kerala: [count] Mundu styles
├── Andhra/Telangana: [count] items
└── Karnataka: [count] items

WEST INDIA:
├── Maharashtra: [count] Dhoti-Kurta styles
├── Gujarat: [count] Kediyu, Bandi items
└── Goa: [count] beach/coastal styles

EAST INDIA:
├── Bengal: [count] Kurta-Dhoti styles
├── Odisha: [count] items
└── North-East: [count] contemporary styles

PAN-INDIA STYLES: [count] items (work everywhere)
```

**6.7 Keywords & Search Optimization:**

```
🔍 SEARCH KEYWORD ANALYSIS:

HINDI KEYWORDS (PRESERVED 100%):
Total Unique Hindi Keywords: [X]
├── Fashion Items: [list top 20]
│   Example: शर्ट, कुर्ता, जींस, पैंट, जूते, etc.
├── Colors: [list]
│   Example: लाल, नीला, काला, सफेद, मैरून, etc.
├── Occasions: [list]
│   Example: ऑफिस, शादी, पार्टी, कैज़ुअल, etc.
├── Styles: [list]
│   Example: चेक, सॉलिड, फॉर्मल, कैज़ुअल, etc.
└── Regional: [list]
    Example: पंजाबी, दक्षिणी, पारंपरिक, etc.

ENGLISH KEYWORDS (STANDARDIZED):
Total Unique English Keywords: [X]
├── Standardization Applied: [count] terms fixed
│   Example: "T-Shirt" (not "Tshirt", "T shirt", "tshirt")
└── New Keywords Added: [count] expert suggestions

SEARCH OPTIMIZATION SCORE: [X]/100
├── Hindi Search Coverage: [X]%
├── English Search Coverage: [X]%
├── Multilingual Support: [X]%
└── Phonetic Variations Covered: [yes/no]
```

**6.8 Image & Visual Content:**

```
📸 IMAGE METADATA STATUS:

ITEMS WITH ACTUAL IMAGES: [count]
ITEMS WITH AI-READY METADATA: [count]
├── Midjourney Prompts Created: [count]
├── DALL-E Prompts Created: [count]
└── Stable Diffusion Prompts: [count]

VISUAL CONTENT BREAKDOWN:
├── Complete Outfit Visuals Needed: [count]
├── Individual Item Shots Needed: [count]
├── Color Swatch Cards Needed: [count]
├── Before/After Comparisons Needed: [count]
└── Styling Process Images Needed: [count]

ESTIMATED AI IMAGE GENERATION:
├── Midjourney Cost: ₹[X] (~$[Y])
├── DALL-E Cost: ₹[X] (~$[Y])
├── Leonardo.ai Cost: ₹[X] (~$[Y])
└── Recommended Budget: ₹[X] for [Z] images

IMAGE GENERATION PRIORITY LIST:
Priority 1 (Critical): [count] items
Priority 2 (Important): [count] items
Priority 3 (Good to Have): [count] items
```

**6.9 Data Quality & Changes Log:**

```
✅ DATA TRANSFORMATIONS APPLIED:

ROWS ADDED: [X] new entries
├── Expert Recommendations: [count]
├── Missing Combinations: [count]
├── Regional Variations: [count]
└── Psychology-Based Entries: [count]

ROWS MODIFIED: [X] existing entries
├── Skin Tone Data Added: [count]
├── Occasion Tags Enriched: [count]
├── Color Hexa Codes Added: [count]
├── Body Type Info Added: [count]
├── Image Metadata Created: [count]
└── Search Keywords Enhanced: [count]

ROWS REMOVED: [X] entries
├── Duplicates Detected: [count]
│   └── Deduplication Logic: [explain]
├── Invalid/Test Data: [count]
├── Incomplete Entries: [count]
└── Reason for Each Removal: [detailed list]

NEW COLUMNS CREATED: [X] columns
├── colour_hexa
├── colour_family
├── image_metadata
├── best_for_skin_tone
├── best_for_body_type
├── confidence_level
├── solves_problem
├── social_approval_score
├── [list all new columns]
└── Rationale: [why each column was added]

DATA CLEANING PERFORMED:
├── Typos Corrected: [count]
├── Format Standardized: [count]
├── Case Normalized: [count]
├── Special Characters Handled: [count]
└── Null Values Filled: [count]
    └── Fill Strategy: [explain logic]
```

**6.10 Database Performance Metrics:**

```
⚡ SUPABASE OPTIMIZATION REPORT:

TABLE SIZES (Estimated):
├── clothing_items: ~[X] MB ([Y] rows)
├── styling_rules: ~[X] MB ([Y] rows)
├── colour_palette: ~[X] MB ([Y] rows)
├── occasion_guide: ~[X] MB ([Y] rows)
└── Total Database Size: ~[X] MB

INDEXES CREATED: [X] indexes
├── B-tree Indexes: [count]
├── GIN Indexes (Array/JSONB): [count]
├── Full-Text Search Indexes: [count]
└── Performance Impact: [estimated query speedup]

QUERY PERFORMANCE ESTIMATES:
├── Simple Item Search: <50ms
├── Hindi Keyword Search: <100ms
├── Complex Filtering (multiple conditions): <200ms
├── Full-Text Search: <150ms
└── AI Fallback Queries: ~500-1000ms (OpenAI API call)

RLS POLICIES: [X] policies implemented
├── Public Read: [count] tables
├── Authenticated Only: [count] tables
└── User-Specific: [count] tables

STORAGE ESTIMATES:
├── Text Data: [X] MB
├── JSONB Data: [X] MB
├── Indexes: [X] MB
├── Images (future, S3): [X] GB estimated
└── Total with Images: [X] GB
```

**6.11 Recommendations & Next Steps:**

```
🚀 IMMEDIATE ACTION ITEMS:

CRITICAL (Do First):
✅ 1. Import CSV data into Supabase using provided SQL scripts
✅ 2. Set up authentication and RLS policies
✅ 3. Create Supabase Storage bucket for images
✅ 4. Configure full-text search for Hindi keywords
✅ 5. Set up OpenAI API integration for AI fallback

HIGH PRIORITY (This Week):
□ 6. Generate top 100 priority AI images (Midjourney/DALL-E)
□ 7. Test Hindi keyword search thoroughly
□ 8. Implement basic filtering (by color, occasion, body type)
□ 9. Create user profile collection flow
□ 10. Build basic outfit recommendation algorithm

MEDIUM PRIORITY (This Month):
□ 11. Complete AI image generation (remaining 400+ images)
□ 12. Add celebrity style reference data
□ 13. Implement occasion navigator feature
□ 14. Create body type styling guide interface
□ 15. Build shopping assistant feature

LONG-TERM (Next 3 Months):
□ 16. Multi-language support (Punjabi, Marathi, Tamil, Telugu)
□ 17. User wardrobe upload and analysis
□ 18. Social features (share outfits, get feedback)
□ 19. Trend tracking integration (Google Trends API)
□ 20. E-commerce integration (Myntra, Ajio API)

🎯 SUCCESS METRICS TO TRACK:
├── User Engagement: Daily active users, session duration
├── Search Effectiveness: Hindi vs English search success rate
├── Recommendation Quality: User ratings on outfit suggestions
├── AI Fallback Rate: % of queries needing OpenAI vs database
└── Conversion: Users who complete wardrobe planning
```

**6.12 Known Limitations & Future Enhancements:**

```
⚠️ CURRENT LIMITATIONS:

DATA GAPS:
├── Limited hair styling integration (to be expanded)
├── Grooming details minimal (future addition)
├── Accessory data needs more depth
├── Regional variations incomplete for East/North-East India
└── Celebrity style database not yet populated

TECHNICAL CONSTRAINTS:
├── Full-text search may need tuning for optimal Hindi support
├── Image generation budget required (~₹10,000-20,000)
├── AI API costs need monitoring (OpenAI/Claude usage)
└── Supabase free tier limits (need to upgrade for scale)

CONTENT NEEDS:
├── Video tutorials/demonstrations (future)
├── 3D garment visualization (advanced)
├── Virtual try-on (requires AR/VR)
└── Real-time trend updates (API integrations needed)

🌟 FUTURE ENHANCEMENT ROADMAP:

PHASE 2 (3-6 Months):
├── Voice search in Hindi/English
├── WhatsApp bot integration
├── Instagram/social media integration
├── Influencer partnerships for content
└── Personalized style quiz

PHASE 3 (6-12 Months):
├── AR virtual try-on
├── AI stylist chatbot (GPT-4 powered)
├── Community features (style sharing, voting)
├── Premium features (personal stylist consultations)
└── B2B features (for brands, retailers)
```

---

### 📦 TASK 7: FINAL DELIVERABLES PREPARATION

**7.1 File Structure:**

```
📁 indian_mens_fashion_database/
├── 📄 README.md (Project overview, setup instructions)
│
├── 📁 data/
│   ├── mens_fashion_master_FINAL.csv (Main cleaned & enriched data)
│   ├── colour_palette.csv (Separate color reference)
│   ├── keywords_hindi.csv (All Hindi keywords preserved)
│   └── data_dictionary.csv (Column definitions)
│
├── 📁 supabase/
│   ├── 01_schema_creation.sql (All table definitions)
│   ├── 02_indexes_performance.sql (Index creation)
│   ├── 03_rls_policies.sql (Security policies)
│   ├── 04_functions_triggers.sql (Helper functions)
│   ├── 05_seed_data_batch_01.sql (First 1000 rows)
│   ├── 06_seed_data_batch_02.sql (Next 1000 rows)
│   ├── [... more batches as needed]
│   └── 99_setup_guide.md (Step-by-step Supabase setup)
│
├── 📁 reports/
│   ├── data_analysis_report_HINDI.md (Complete Hindi report)
│   ├── executive_summary_HINDI.pdf (Quick overview)
│   ├── statistics_dashboard.html (Visual stats)
│   └── changes_log_detailed.md (All transformations logged)
│
├── 📁 images/
│   ├── ai_generation_prompts.csv (Ready for Midjourney/DALL-E)
│   ├── priority_images_list.csv (What to generate first)
│   └── metadata_examples/ (Sample image metadata)
│
└── 📁 documentation/
    ├── API_integration_guide.md (OpenAI, Claude setup)
    ├── hindi_search_optimization.md (Full-text search tuning)
    ├── deployment_checklist.md (Production readiness)
    └── user_flow_diagrams.pdf (UX wireframes)
```

**7.2 Quality Assurance Checklist:**

```
✅ DATA VALIDATION:
□ All Hindi keywords present and unchanged
□ Every color has hexa code
□ No duplicate entries (verified)
□ All required fields populated
□ JSONB fields valid JSON
□ Arrays properly formatted
□ No broken references

✅ SCHEMA VALIDATION:
□ SQL syntax tested (PostgreSQL 14+)
□ All indexes created successfully
□ RLS policies applied correctly
□ Triggers working as expected
□ Foreign key constraints valid

✅ PERFORMANCE VALIDATION:
□ Sample queries tested (<200ms)
□ Hindi search tested with real keywords
□ Batch inserts tested (1000 rows)
□ Index performance verified

✅ DOCUMENTATION VALIDATION:
□ README clear and comprehensive
□ All SQL files commented
□ Setup guide step-by-step verified
□ Report statistics accurate
```

---

## 🎯 EXPECTED OUTPUT FILES:

1. **mens_fashion_master_FINAL.csv** (या 2 CSVs if needed)
   - Clean, enriched, production-ready
   - All columns properly structured
   - Hindi keywords intact
   - Hexa codes added
   - Image metadata complete

2. **supabase_complete_schema.sql** (या multiple files organized)
   - Full database schema
   - All 11 tables with indexes
   - RLS policies
   - Functions and triggers

3. **supabase_seed_data.sql** (batched inserts)
   - All CSV data as INSERT statements
   - Batched for performance
   - Ready to execute

4. **data_report_HINDI_DETAILED.md**
   - Comprehensive Hindi report
   - All statistics and breakdowns
   - Changes log
   - Recommendations

5. **ai_image_generation_guide.csv**
   - All Midjourney/DALL-E prompts
   - Priority list
   - Cost estimation

6. **setup_quickstart_guide.md**
   - Step-by-step Supabase setup
   - Environment variables
   - API keys configuration
   - Testing procedures

---

## 💡 SPECIAL INSTRUCTIONS:

### For Hindi Content:
- देवनागरी script properly encode करें (UTF-8)
- Hinglish को natural रखें (जैसे Indian log बोलते हैं)
- Fashion terms English में OK (shirt, jeans, blazer)
- Styling advice Hindi-English mix (70-30 ratio)

### For Color Hexa Codes:
- Standard web color format: #RRGGBB
- Uppercase letters for consistency
- Validate against color accuracy
- Include color name in both languages

### For Image Metadata:
- AI-generation ready prompts
- Specific enough for accurate results
- Indian context explicitly mentioned
- Skin tone, body type, age specified
- Exact hexa codes referenced in prompt

### For Psychology Data:
- Real problems Indian men face
- Solutions practical and actionable
- Language empathetic, not preachy
- Build confidence, don't shame
- Cultural sensitivity maintained

---

## 🚀 FINAL WORDS:

This is not just a data cleanup task - yeh ek **complete fashion intelligence system** hai! 

Your output should be:
✅ Production-ready
✅ Culturally sensitive
✅ Psychologically intelligent
✅ Technically optimized
✅ User-centric
✅ Scalable

**Remember**: Indian men need guidance, not judgment. Fashion confidence, not fashion police. Practical solutions, not theoretical advice.

**Quality > Quantity**: Agar koi field accurately fill nahi kar sakte, toh NULL rakhna better hai than incorrect data.

**Preserve Intent**: Original data creator ki intent ko samjho aur enhance karo, destroy mat karo.

---

## 🎬 LET'S START!

Pehle dono CSV files ka complete analysis dikhaao, phir step-by-step proceed karte hain! 💪🔥

---

**METADATA:**
- Document Type: Men's Fashion Database Enhancement Prompt
- Target Platform: Perplexity Pro Labs
- Language: Hindi-English Mix (Indian Style)
- Version: 1.0 ULTIMATE
- Created: 2026-02-14
- Complexity Level: Expert
- Expected Output: Production-Ready Fashion Intelligence System
