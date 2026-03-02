-- ============================================
-- PREVIEW IMAGES TABLE - Feel-good outfit previews
-- For RangMatch: 450 images (previews/formal, previews/casual, ui/elements)
-- ============================================

-- Storage bucket: create in Supabase Dashboard > Storage > New bucket "previews" (public)
-- Subfolders: previews/formal, previews/casual, previews/fusion, previews/accessories, ui/elements

CREATE TABLE IF NOT EXISTS preview_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  url TEXT,
  storage_path TEXT,
  tags TEXT[] DEFAULT '{}',
  fabric TEXT,
  color TEXT,
  type TEXT NOT NULL,
  combo_type TEXT,
  rules_description TEXT,
  rules TEXT,
  preview_type TEXT DEFAULT 'outfit',
  feel_good_factor TEXT[] DEFAULT '{}',
  occasion TEXT[] DEFAULT '{}',
  skin_tone TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_preview_images_type ON preview_images(type);
CREATE INDEX IF NOT EXISTS idx_preview_images_combo_type ON preview_images(combo_type);
CREATE INDEX IF NOT EXISTS idx_preview_images_tags ON preview_images USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_preview_images_occasion ON preview_images USING GIN(occasion);
CREATE INDEX IF NOT EXISTS idx_preview_images_feel_good ON preview_images USING GIN(feel_good_factor);
CREATE INDEX IF NOT EXISTS idx_preview_images_sort ON preview_images(sort_order);

COMMENT ON TABLE preview_images IS 'Feel-good outfit preview images for RangMatch; URLs from Supabase Storage.';
COMMENT ON COLUMN preview_images.preview_type IS 'outfit | ui_element | hero | card';
COMMENT ON COLUMN preview_images.feel_good_factor IS 'confidence_boost | cultural_pride | excitement | freedom | exploration';
