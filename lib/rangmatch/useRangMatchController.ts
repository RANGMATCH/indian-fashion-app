// /lib/rangmatch/useRangMatchController.ts
"use client";

import { useState, useCallback, useMemo } from "react";
import { 
  SkinToneId, 
  WeatherId, 
  OccasionId, 
  GateState, 
  GateStep, 
  OutfitSuggestion 
} from "./types";
import { isGateUnlocked, getSuggestionsForGate } from "./suggestionEngine";
import { derivePreview } from "./previewDerivation";

export function useRangMatchController() {
  const [gate, setGate] = useState<GateState>({
    skinTone: null,
    weather: null,
    occasion: null,
    step: "skinTone",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestions = useMemo(() => getSuggestionsForGate(gate), [gate]);
  
  const currentSuggestion = suggestions[currentIndex];

  const preview = useMemo(
    () => derivePreview(gate, currentSuggestion),
    [gate, currentSuggestion]
  );

  const setSkinTone = useCallback((id: SkinToneId) => {
    setGate(prev => ({
      ...prev,
      skinTone: id,
      weather: null, // Reset dependent gates
      occasion: null,
      step: "weather",
    }));
    setCurrentIndex(0);
  }, []);

  const setWeather = useCallback((id: WeatherId) => {
    if (gate.skinTone === null) return;
    setGate(prev => ({
      ...prev,
      weather: id,
      occasion: null,
      step: "occasion",
    }));
    setCurrentIndex(0);
  }, [gate.skinTone]);

  const setOccasion = useCallback((id: OccasionId) => {
    if (gate.skinTone === null || gate.weather === null) return;
    setGate(prev => ({
      ...prev,
      occasion: id,
      step: "unlocked",
    }));
    setCurrentIndex(0);
  }, [gate.skinTone, gate.weather]);

  const reset = useCallback(() => {
    setGate({
      skinTone: null,
      weather: null,
      occasion: null,
      step: "skinTone",
    });
    setCurrentIndex(0);
  }, []);

  const nextSuggestion = useCallback(() => {
    if (suggestions.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % suggestions.length);
  }, [suggestions.length]);

  const prevSuggestion = useCallback(() => {
    if (suggestions.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
  }, [suggestions.length]);

  return {
    gate,
    preview,
    suggestions,
    currentIndex,
    currentSuggestion,
    actions: {
      setSkinTone,
      setWeather,
      setOccasion,
      reset,
      nextSuggestion,
      prevSuggestion,
    }
  };
}
