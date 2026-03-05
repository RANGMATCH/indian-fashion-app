// /lib/rangmatch/types.ts

export type SkinToneId = "Fair" | "Medium" | "Deep";
export type WeatherId = "Hot" | "Mild" | "Cold" | "Rainy";
export type OccasionId = "Casual" | "Work" | "Party" | "Wedding";

export interface ItemColor {
  name: string;
  hex: string;
}

export interface OutfitSuggestion {
  id: string;
  title: string;
  confidence: number; // 0 to 100
  whyThisWorks: string;
  top: ItemColor;
  bottom: ItemColor;
  shoes: ItemColor;
}

export interface PreviewState {
  isLocked: boolean;
  headline: string;
  subtitle: string;
  currentSuggestion?: OutfitSuggestion;
}

export type GateStep = "skinTone" | "weather" | "occasion" | "unlocked";

export interface GateState {
  skinTone: SkinToneId | null;
  weather: WeatherId | null;
  occasion: OccasionId | null;
  step: GateStep;
}
