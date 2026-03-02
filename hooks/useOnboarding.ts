"use client";

import { useEffect, useState } from "react";

export type SkinTone = "fair" | "medium" | "wheatish" | "dusky" | "deep";
export type Occasion = "formal" | "casual" | "wedding" | "party" | "date" | "office" | "festival" | "gym";

export interface UserPreferences {
  skinTone: SkinTone | null;
  occasion: Occasion | null;
  onboardingComplete: boolean;
}

const STORAGE_KEY = "rangmatch_prefs";

export function useOnboarding() {
  const [prefs, setPrefs] = useState<UserPreferences>({
    skinTone: null,
    occasion: null,
    onboardingComplete: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPrefs(JSON.parse(stored) as UserPreferences);
    } catch {
      // ignore
    }
  }, []);

  const savePrefs = (updates: Partial<UserPreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const setSkinTone = (skinTone: SkinTone) => savePrefs({ skinTone });
  const setOccasion = (occasion: Occasion) => savePrefs({ occasion, onboardingComplete: true });

  const resetOnboarding = () => {
    const initial: UserPreferences = {
      skinTone: null,
      occasion: null,
      onboardingComplete: false,
    };
    setPrefs(initial);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { prefs, setSkinTone, setOccasion, resetOnboarding };
}
