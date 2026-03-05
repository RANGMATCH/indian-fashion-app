// /lib/rangmatch/dummyData.ts
import { SkinToneId, WeatherId, OccasionId, OutfitSuggestion } from "./types";

export const SKIN_TONES: SkinToneId[] = ["Fair", "Medium", "Deep"];
export const WEATHERS: WeatherId[] = ["Hot", "Mild", "Cold", "Rainy"];
export const OCCASIONS: OccasionId[] = ["Casual", "Work", "Party", "Wedding"];

export const SUGGESTIONS: OutfitSuggestion[] = [
  {
    id: "s1",
    title: "Black tee + charcoal chinos",
    confidence: 95,
    whyThisWorks: "Deep tones highlight your features and create a sleek, professional silhouette.",
    top: { name: "Black", hex: "#000000" },
    bottom: { name: "Charcoal", hex: "#36454F" },
    shoes: { name: "White Sneaker", hex: "#FFFFFF" },
  },
  {
    id: "s2",
    title: "Olive overshirt + beige trousers",
    confidence: 88,
    whyThisWorks: "Earthy tones provide a relaxed yet sophisticated look suitable for mild weather.",
    top: { name: "Olive", hex: "#556B2F" },
    bottom: { name: "Beige", hex: "#F5F5DC" },
    shoes: { name: "Tan Loafer", hex: "#D2B48C" },
  },
  {
    id: "s3",
    title: "Navy blazer + white shirt",
    confidence: 92,
    whyThisWorks: "Classic contrast that exudes authority and style for formal occasions.",
    top: { name: "Navy", hex: "#000080" },
    bottom: { name: "White", hex: "#FFFFFF" },
    shoes: { name: "Black Oxford", hex: "#000000" },
  },
];
