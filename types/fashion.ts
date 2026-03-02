/**
 * Types for Indian Men's Fashion app - aligned with Supabase schema & CSV
 */

export interface SocialApprovalScore {
  family?: number;
  friends?: number;
  professional?: number;
  dating?: number;
}

export interface FashionItem {
  id?: string;
  unique_id: string;
  product_id?: string | null;
  keyword_english?: string | null;
  keyword_hindi?: string | null;
  keyword_hinglish?: string | null;
  category: string;
  sub_category?: string | null;
  color_family?: string | null;
  hex_color?: string | null;
  hex_color_enhanced?: string | null;
  fabric?: string | null;
  occasion?: string | null;
  body_type?: string | null;
  age_group?: string | null;
  skin_tone?: string | null;
  price_range?: string | null;
  confidence_level?: string | null;
  solves_problem?: string | null;
  social_approval_score?: SocialApprovalScore | null;
  body_type_hack?: string | null;
  season_recommendation?: string | null;
  image_metadata?: Record<string, unknown> | null;
  is_active?: boolean;
  popularity_score?: number;
}

export type SortOption = "popular" | "recent" | "price_low" | "price_high";

export interface SearchFilters {
  skinTone?: string;
  occasion?: string;
  bodyType?: string;
  confidenceLevel?: string;
  colorFamily?: string;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  sort?: SortOption;
}

export interface SavedOutfit {
  id: string;
  name: string;
  items: string[];
  image_url?: string | null;
  created_at: string;
}

export interface UserProfile {
  name?: string;
  age?: number;
  skinTone?: string;
  bodyType?: string;
  preferredOccasion?: string;
}

export const SKIN_TONES = ["Fair", "Wheatish", "Medium", "Dusky", "Deep"] as const;
export const BODY_TYPES = ["Regular", "Athletic", "Plus Size", "Slim", "Tall"] as const;
export const CONFIDENCE_LEVELS = ["Safe", "Moderate", "Bold"] as const;
export const OCCASIONS = [
  "Wedding",
  "Formal",
  "Party",
  "Casual",
  "Date Night",
  "Interview",
  "Festival",
  "Gym/Sports",
] as const;

/** Feel-good preview image (outfit combo or UI asset) from Supabase Storage */
export interface PreviewImage {
  id?: string;
  prompt_id: number;
  name: string;
  url?: string | null;
  storage_path?: string | null;
  tags?: string[];
  fabric?: string | null;
  color?: string | null;
  type: string;
  combo_type?: string | null;
  rules_description?: string | null;
  rules?: string | null;
  preview_type?: "outfit" | "ui_element" | "hero" | "card";
  feel_good_factor?: ("confidence_boost" | "cultural_pride" | "excitement" | "freedom" | "exploration")[];
  occasion?: string[];
  skin_tone?: string[];
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

/** Prompt for AI image generation (Kaggle Flux etc.) */
export interface PreviewImagePrompt {
  id: number;
  prompt: string;
  tags: string[];
  fabric: string;
  type: string;
  rules: string;
}
