"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { GarmentSlot } from "@/hooks/useRecolorEngine";
import type { Occasion, SkinTone, Weather } from "@/hooks/useOnboarding";
import { HINGLISH_RESPONSES } from "@/lib/chat/hinglishResponses";
import { BEHAVIOR_RESPONSES, detectBehavior } from "@/lib/chat/psychologyEngine";
import { TRENDING_COMBOS, type TrendingCombo } from "@/lib/data/trendingCombos";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  quickReplies?: string[];
  createdAt: number;
}

interface UseChatAdvisorOptions {
  onColorChange: (slot: GarmentSlot, hex: string) => void;
  onSlotFocus: (slot: GarmentSlot) => void;
  onSave: () => void;
  skinTone: SkinTone | null;
  occasion: Occasion | null;
  weather: Weather | null;
}

const quick = (...items: string[]) => items.slice(0, 3);
const pick = (arr: readonly string[]) => arr[Math.floor(Math.random() * arr.length)];

export function useChatAdvisor(options: UseChatAdvisorOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const behaviorRef = useRef({
    colorChanges: 0,
    slotsVisited: new Set<GarmentSlot>(),
    timeOnSlot: 0,
    hasTyped: false,
    isReturning: false,
    startedAt: Date.now(),
  });
  const comboIndexRef = useRef(0);

  const firstMessage = useMemo<ChatMessage>(
    () => ({
      id: `m-${Date.now()}`,
      role: "assistant",
      content:
        options.skinTone && options.occasion && options.weather
          ? `Namaste! Step 1/3: shirt color set karein. Aapka skin tone ${options.skinTone} hai, weather ${options.weather} hai — smart combo start karein, tap karo.`
          : "Namaste! Guidance start karne se pehle skin tone, occasion aur weather compulsory hai. Pehle onboarding complete karo, phir exact combo दूंगा — continue karo.",
      quickReplies:
        options.skinTone && options.occasion && options.weather
          ? quick("Shirt light karo", "Shirt dark karo", "Best match dikhao")
          : quick("Onboarding kholo", "Skin tone set", "Occasion set"),
      createdAt: Date.now(),
    }),
    [options.occasion, options.skinTone, options.weather]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([firstMessage]);
  const [isTyping, setIsTyping] = useState(false);

  const pushAssistant = useCallback((content: string, quickReplies?: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content,
        quickReplies: quickReplies?.slice(0, 3),
        createdAt: Date.now(),
      },
    ]);
  }, []);

  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}-${Math.random()}`,
        role: "user",
        content: text,
        createdAt: Date.now(),
      },
    ]);
  }, []);

  const respondWithTyping = useCallback(
    (content: string, replies?: string[]) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        pushAssistant(content, replies);
      }, 350);
    },
    [pushAssistant]
  );

  const pushAdvisorMessage = useCallback(
    (content: string, quickReplies?: string[]) => {
      respondWithTyping(content, quickReplies);
    },
    [respondWithTyping]
  );

  const behaviorNudge = useCallback(() => {
    const elapsed = Date.now() - behaviorRef.current.startedAt;
    const behavior = detectBehavior({
      colorChanges: behaviorRef.current.colorChanges,
      slotsVisited: behaviorRef.current.slotsVisited.size,
      timeOnSlot: elapsed,
      hasTyped: behaviorRef.current.hasTyped,
      isReturning: behaviorRef.current.isReturning,
    });
    const text = pick(BEHAVIOR_RESPONSES[behavior]);
    respondWithTyping(`${text} Step 2/3 continue karein — next tap karo.`, quick("Best match", "Office combo", "Save karo"));
  }, [respondWithTyping]);

  const navigateCombo = useCallback(
    (direction: "next" | "prev", combos: TrendingCombo[] = TRENDING_COMBOS) => {
      const len = combos.length;
      comboIndexRef.current = direction === "next" ? (comboIndexRef.current + 1) % len : (comboIndexRef.current - 1 + len) % len;
      const combo = combos[comboIndexRef.current];
      options.onColorChange("shirt", combo.colors.shirt);
      options.onColorChange("trouser", combo.colors.trouser);
      options.onColorChange("shoes", combo.colors.shoes);
      options.onColorChange("belt", combo.colors.belt);

      const social = `${(combo.likes / 1000).toFixed(1)}k logon ne pasand kiya`;
      const badge = comboIndexRef.current === 0 ? " 👑 BEST MATCH" : "";
      respondWithTyping(
        `${combo.chatIntro}${badge} (${social}). Occasion ${options.occasion ?? "casual"} aur weather ${options.weather ?? "summer"} ke hisaab se tuned hai. Step 3/3: pasand ho toh save karo.`,
        quick("Save karo", "Next combo", "Shirt light karo")
      );
      return comboIndexRef.current;
    },
    [options, respondWithTyping]
  );

  const onCanvasColorChange = useCallback(
    (slot: GarmentSlot, hex: string, colorName: string) => {
      behaviorRef.current.colorChanges += 1;
      behaviorRef.current.slotsVisited.add(slot);
      options.onColorChange(slot, hex);
      options.onSlotFocus(slot);

      const praise = pick(HINGLISH_RESPONSES.colorPraise);
      respondWithTyping(`${praise} Step 1/3 done on ${slot}.`, quick("Next combo", "Occasion tip", "Save karo"));

      if (behaviorRef.current.colorChanges % 4 === 0) behaviorNudge();
    },
    [behaviorNudge, options, respondWithTyping]
  );

  const handleUserInput = useCallback(
    (text: string) => {
      const normalized = text.trim().toLowerCase();
      if (!normalized) return;
      behaviorRef.current.hasTyped = true;
      pushUser(text);

      if (!options.skinTone || !options.occasion || !options.weather) {
        respondWithTyping(
          "Personal recommendation ke liye skin tone + occasion + weather compulsory hai. Pehle onboarding complete karo, phir main exact guide dunga — ab setup karo.",
          quick("Onboarding kholo", "Skin tone set", "Weather set")
        );
        return;
      }

      if (normalized.includes("save")) {
        options.onSave();
        respondWithTyping("Maza aa gaya! Outfit save trigger kar diya. Kal naya look banayenge — ab save confirm check karo.", quick("Next combo", "Office tip", "Wedding tip"));
        return;
      }

      if (normalized.includes("next")) {
        navigateCombo("next", TRENDING_COMBOS);
        return;
      }

      if (normalized.includes("back") || normalized.includes("prev")) {
        navigateCombo("prev", TRENDING_COMBOS);
        return;
      }

      if (normalized.includes("occasion")) {
        respondWithTyping(
          `${pick(HINGLISH_RESPONSES.occasionTips)} Occasion ${options.occasion} set hai — apply karo.`,
          quick("Office combo", "Wedding combo", "Save karo")
        );
        return;
      }

      if (normalized.includes("skin")) {
        respondWithTyping(
          `${pick(HINGLISH_RESPONSES.skinToneTips)} Aapka tone ${options.skinTone} hai — tap karke test karo.`,
          quick("Shirt light karo", "Shirt dark karo", "Best match")
        );
        return;
      }

      if (normalized.includes("weather")) {
        respondWithTyping(
          `${pick(HINGLISH_RESPONSES.weatherTips)} Ab weather ${options.weather} ke hisaab se combo apply karo.`,
          quick("Best match", "Next combo", "Save karo")
        );
        return;
      }

      if (normalized.includes("best")) {
        comboIndexRef.current = 0;
        navigateCombo("next", TRENDING_COMBOS);
        return;
      }

      const fallback = `${pick(HINGLISH_RESPONSES.colorAdjust)} CTA: neeche quick reply tap karo.`;
      respondWithTyping(fallback, quick("Next combo", "Skin tip", "Save karo"));
    },
    [navigateCombo, options, pushUser, respondWithTyping]
  );

  return {
    messages,
    isTyping,
    inputRef,
    handleUserInput,
    onCanvasColorChange,
    navigateCombo,
    setComboIndex: (index: number) => {
      comboIndexRef.current = Math.max(0, index);
    },
    handleNext: () => navigateCombo("next"),
    handlePrev: () => navigateCombo("prev"),
    pushAdvisorMessage,
  };
}
