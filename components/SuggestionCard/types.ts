// /components/SuggestionCard/types.ts
import { OutfitSuggestion } from "@/lib/rangmatch/types";

export interface SuggestionCardProps {
  suggestion: OutfitSuggestion | null;
  isLocked: boolean;
}
