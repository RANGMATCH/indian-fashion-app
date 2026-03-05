// /lib/rangmatch/suggestionEngine.ts
import { GateState, OutfitSuggestion } from "./types";
import { SUGGESTIONS } from "./dummyData";

export function isGateUnlocked(gate: GateState): boolean {
  return gate.skinTone !== null && gate.weather !== null && gate.occasion !== null;
}

export function getSuggestionsForGate(gate: GateState): OutfitSuggestion[] {
  if (isGateUnlocked(gate)) {
    // For UI phase, return 3 dummy suggestions as specified
    return SUGGESTIONS.slice(0, 3);
  }
  return [];
}
