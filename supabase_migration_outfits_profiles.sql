-- Migration: saved_outfits + user_profiles for RangMatch
-- Run this in Supabase SQL Editor after main schema.

-- Saved outfits (user_id nullable for guest users via guest_id)
CREATE TABLE IF NOT EXISTS saved_outfits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_id TEXT,
  name TEXT NOT NULL DEFAULT 'My Outfit',
  items JSONB NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_outfits_user ON saved_outfits(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_outfits_guest ON saved_outfits(guest_id);

-- User profiles (guest_id for anonymous; user_id when signed in)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  guest_id TEXT UNIQUE,
  name TEXT,
  age INTEGER,
  skin_tone TEXT,
  body_type TEXT,
  preferred_occasion TEXT,
  budget_range TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_guest ON user_profiles(guest_id);

-- RLS (optional): enable if you use auth
-- ALTER TABLE saved_outfits ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
