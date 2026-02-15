-- ============================================
-- INDIAN MEN'S FASHION DATABASE SCHEMA
-- For Supabase / PostgreSQL 14+
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. MAIN CLOTHING ITEMS TABLE
-- ============================================
CREATE TABLE mens_fashion_items (
    -- Primary Identifiers
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unique_id TEXT UNIQUE NOT NULL,
    product_id TEXT,
    
    -- Search Keywords (CRITICAL - Hindi Support)
    keyword_english TEXT,
    keyword_hindi TEXT,
    keyword_hinglish TEXT,
    
    -- Category & Classification
    category TEXT NOT NULL,
    sub_category TEXT,
    
    -- Color Information
    color_family TEXT,
    hex_color TEXT,
    hex_color_enhanced TEXT,
    
    -- Fashion Details
    fabric TEXT,
    occasion TEXT,
    body_type TEXT,
    age_group TEXT,
    skin_tone TEXT,
    
    -- Pricing
    price_range TEXT,
    
    -- Psychology & Intelligence (NEW!)
    confidence_level TEXT, -- Safe, Moderate, Bold
    solves_problem TEXT, -- What problem this solves
    social_approval_score JSONB, -- {family: 5, friends: 4, professional: 5, dating: 4}
    body_type_hack TEXT, -- Hindi styling hacks
    season_recommendation TEXT,
    
    -- Search & Discovery
    query_type TEXT,
    intent TEXT,
    search_volume TEXT,
    competition TEXT,
    trend TEXT,
    
    -- Answers & Advice
    answer_english TEXT,
    answer_hindi TEXT,
    answer_hinglish TEXT,
    advice_line1 TEXT,
    advice_line2 TEXT,
    advice_line3 TEXT,
    advice_line4 TEXT,
    advice_line5 TEXT,
    
    -- Styling
    combination TEXT,
    color_top TEXT,
    color_bottom TEXT,
    accessories TEXT,
    psychology TEXT,
    fabric_suggestion TEXT,
    weather_best TEXT,
    match_score TEXT,
    
    -- Metadata
    data_source TEXT DEFAULT 'RangMatch',
    image_metadata JSONB, -- AI generation prompts
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    popularity_score INTEGER DEFAULT 0
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Category & Classification
CREATE INDEX idx_category ON mens_fashion_items(category);
CREATE INDEX idx_sub_category ON mens_fashion_items(sub_category);
CREATE INDEX idx_occasion ON mens_fashion_items(occasion);

-- User Targeting
CREATE INDEX idx_skin_tone ON mens_fashion_items(skin_tone);
CREATE INDEX idx_body_type ON mens_fashion_items(body_type);
CREATE INDEX idx_age_group ON mens_fashion_items(age_group);

-- Color Search
CREATE INDEX idx_color_family ON mens_fashion_items(color_family);
CREATE INDEX idx_hex_color_enhanced ON mens_fashion_items(hex_color_enhanced);

-- Psychology
CREATE INDEX idx_confidence_level ON mens_fashion_items(confidence_level);

-- Full-Text Search (CRITICAL for Hindi Keywords)
CREATE INDEX idx_fulltext_search ON mens_fashion_items USING GIN (
    to_tsvector('simple',
        COALESCE(keyword_english, '') || ' ' ||
        COALESCE(keyword_hindi, '') || ' ' ||
        COALESCE(keyword_hinglish, '') || ' ' ||
        COALESCE(sub_category, '') || ' ' ||
        COALESCE(color_family, '')
    )
);

-- JSONB Indexes
CREATE INDEX idx_social_approval ON mens_fashion_items USING GIN (social_approval_score);
CREATE INDEX idx_image_metadata ON mens_fashion_items USING GIN (image_metadata);

-- Active items
CREATE INDEX idx_active_items ON mens_fashion_items(is_active) WHERE is_active = true;

-- ============================================
-- 2. COLOR PALETTE REFERENCE TABLE
-- ============================================
CREATE TABLE color_palette (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    color_name TEXT NOT NULL UNIQUE,
    color_name_hindi TEXT,
    hex_code TEXT NOT NULL,
    rgb_values TEXT,
    color_family TEXT,
    
    -- Relationships
    complementary_colors TEXT[], -- Colors that pair well
    contrasting_colors TEXT[], -- Bold combinations
    avoid_with_colors TEXT[], -- Combinations to avoid
    
    -- Context
    best_for_skin_tone TEXT[], -- [Fair, Wheatish, Medium, Dusky, Deep]
    occasion_suitability TEXT[], -- [Wedding, Formal, Casual, etc.]
    season_best TEXT[], -- [Summer, Winter, Monsoon, All-Season]
    
    -- Psychology
    color_meaning TEXT, -- "Navy = Professional, Trustworthy"
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_color_name ON color_palette(color_name);
CREATE INDEX idx_color_hex ON color_palette(hex_code);

-- ============================================
-- 3. STYLING RULES ENGINE
-- ============================================
CREATE TABLE styling_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_name TEXT NOT NULL,
    rule_name_hindi TEXT,
    
    -- Input Item Reference
    input_category TEXT NOT NULL,
    input_sub_category TEXT,
    input_color TEXT,
    
    -- Recommendations
    recommended_bottom_wear JSONB, -- [{name, color, why}, ...]
    recommended_footwear JSONB,
    recommended_accessories JSONB,
    
    -- Complete Look
    complete_look_description TEXT,
    complete_look_description_hindi TEXT,
    
    -- Targeting
    best_for_skin_tone TEXT[],
    best_for_body_type TEXT[],
    best_for_age_group TEXT[],
    suitable_occasions TEXT[],
    
    -- Psychology
    confidence_level TEXT,
    why_this_works TEXT,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_styling_category ON styling_rules(input_category);
CREATE INDEX idx_styling_occasions ON styling_rules USING GIN (suitable_occasions);

-- ============================================
-- 4. OCCASION INTELLIGENCE
-- ============================================
CREATE TABLE occasion_guide (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    occasion_name TEXT NOT NULL,
    occasion_name_hindi TEXT,
    occasion_category TEXT, -- Wedding, Office, Casual, Festival
    
    -- Context
    formality_level TEXT, -- Casual, Semi-Formal, Formal
    venue_types TEXT[], -- [Hotel, Outdoor, Temple, etc.]
    time_of_day TEXT[], -- [Morning, Afternoon, Evening, Night]
    
    -- Outfit Options
    safe_outfit JSONB,
    moderate_outfit JSONB,
    bold_outfit JSONB,
    what_to_avoid TEXT[],
    
    -- Psychology
    confidence_tips TEXT,
    confidence_tips_hindi TEXT,
    
    -- Regional Variations
    north_india_variation TEXT,
    south_india_variation TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_occasion_category ON occasion_guide(occasion_category);

-- ============================================
-- 5. BODY TYPE SOLUTIONS
-- ============================================
CREATE TABLE body_type_hacks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    body_concern TEXT NOT NULL, -- Belly, Short Height, Skinny
    body_concern_hindi TEXT,
    
    clothing_solutions JSONB, -- [{item_type, why, specific_styles}, ...]
    what_to_avoid TEXT[],
    styling_tricks TEXT[],
    styling_tricks_hindi TEXT[],
    
    confidence_message TEXT,
    confidence_message_hindi TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. FABRIC KNOWLEDGE
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
    maintenance_level TEXT, -- Easy, Moderate, High
    
    price_range TEXT,
    care_instructions TEXT,
    care_instructions_hindi TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE mens_fashion_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE styling_rules ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Public read active items" ON mens_fashion_items
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read styling rules" ON styling_rules
    FOR SELECT USING (is_active = true);

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

CREATE TRIGGER update_mens_fashion_items_timestamp
    BEFORE UPDATE ON mens_fashion_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HELPER VIEWS
-- ============================================

-- Popular items view
CREATE VIEW popular_fashion_items AS
SELECT 
    unique_id,
    sub_category,
    color_family,
    occasion,
    skin_tone,
    confidence_level,
    popularity_score
FROM mens_fashion_items
WHERE is_active = true
ORDER BY popularity_score DESC
LIMIT 100;

-- Hindi searchable items
CREATE VIEW hindi_searchable_items AS
SELECT 
    unique_id,
    keyword_hindi,
    keyword_hinglish,
    sub_category,
    color_family,
    occasion,
    skin_tone
FROM mens_fashion_items
WHERE is_active = true
AND keyword_hindi IS NOT NULL;

-- Occasion-wise items
CREATE VIEW occasion_fashion_items AS
SELECT 
    occasion,
    COUNT(*) as item_count,
    array_agg(DISTINCT sub_category) as available_items,
    array_agg(DISTINCT color_family) as available_colors
FROM mens_fashion_items
WHERE is_active = true
GROUP BY occasion
ORDER BY item_count DESC;

-- ============================================
-- SAMPLE QUERIES FOR TESTING
-- ============================================

-- Search by Hindi keyword
-- SELECT * FROM mens_fashion_items 
-- WHERE keyword_hindi LIKE '%शादी%' 
-- AND skin_tone = 'Wheatish'
-- LIMIT 10;

-- Search by occasion and body type
-- SELECT * FROM mens_fashion_items
-- WHERE occasion = 'Wedding'
-- AND body_type = 'Regular'
-- AND confidence_level = 'Moderate'
-- LIMIT 10;

-- Full-text search
-- SELECT * FROM mens_fashion_items
-- WHERE to_tsvector('simple', keyword_hindi || ' ' || keyword_english) 
-- @@ to_tsquery('simple', 'शादी | wedding')
-- LIMIT 10;

-- ============================================
-- NOTES FOR DEVELOPERS
-- ============================================

-- 1. Hindi Keywords:
--    - All Hindi keywords from original CSV are preserved
--    - Use full-text search for best performance
--    - UTF-8 encoding mandatory

-- 2. Psychology Data:
--    - confidence_level: Safe, Moderate, Bold
--    - social_approval_score: JSONB with family/friends/professional/dating scores
--    - body_type_hack: Hindi styling advice

-- 3. Image Metadata:
--    - JSONB field with AI generation prompts
--    - Includes Midjourney/DALL-E ready prompts

-- 4. Performance:
--    - GIN indexes for full-text search
--    - Indexes on frequently queried columns
--    - RLS enabled for security

-- 5. Supabase Free Tier Limits:
--    - 500MB database
--    - 50,000 monthly active users
--    - Unlimited API requests

-- ============================================
-- END OF SCHEMA
-- ============================================
