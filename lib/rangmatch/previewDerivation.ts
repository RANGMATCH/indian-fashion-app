// /lib/rangmatch/previewDerivation.ts
import { GateState, OutfitSuggestion, PreviewState } from "./types";
import { isGateUnlocked } from "./suggestionEngine";

export function derivePreview(gate: GateState, currentSuggestion?: OutfitSuggestion): PreviewState {
  if (!isGateUnlocked(gate)) {
    return {
      isLocked: true,
      headline: "Select Skin Tone, Weather, Occasion",
      subtitle: "Suggestions unlock after all selections",
    };
  }

  if (currentSuggestion) {
    return {
      isLocked: false,
      headline: "Suggestion",
      subtitle: currentSuggestion.whyThisWorks,
      currentSuggestion,
    };
  }

  return {
    isLocked: false,
    headline: "Suggestions Unlocked",
    subtitle: "Select a suggestion below to preview colors.",
  };
}
