"use client";

import { useEffect, useState } from "react";

export type SkinTone = "fair" | "medium" | "wheatish" | "dusky" | "deep";
export type Occasion = "formal" | "casual" | "wedding" | "party" | "date" | "office" | "festival" | "gym";
export type Weather = "summer" | "rainy" | "winter" | "humid";

export interface UserPreferences {
  skinTone: SkinTone | null;
  occasion: Occasion | null;
  weather: Weather | null;
  onboardingComplete: boolean;
}

const STORAGE_KEY = "rangmatch_prefs";

export function useOnboarding() {
  const [prefs, setPrefs] = useState<UserPreferences>({
    skinTone: null,
    occasion: null,
    weather: null,
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

  const setSkinTone = (skinTone: SkinTone) =>
    setPrefs((prev) => {
      const next = {
        ...prev,
        skinTone,
        onboardingComplete: Boolean(skinTone && prev.occasion && prev.weather),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

  const setOccasion = (occasion: Occasion) =>
    setPrefs((prev) => {
      const next = {
        ...prev,
        occasion,
        onboardingComplete: Boolean(prev.skinTone && occasion && prev.weather),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

  const setWeather = (weather: Weather) =>
    setPrefs((prev) => {
      const next = {
        ...prev,
        weather,
        onboardingComplete: Boolean(prev.skinTone && prev.occasion && weather),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

  const resetOnboarding = () => {
    const initial: UserPreferences = {
      skinTone: null,
      occasion: null,
      weather: null,
      onboardingComplete: false,
    };
    setPrefs(initial);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return { prefs, setSkinTone, setOccasion, setWeather, resetOnboarding };
}
