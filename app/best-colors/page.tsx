"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SplitScreenPreview } from "@/components/preview/SplitScreenPreview";
import { HinglishChatAdvisor } from "@/components/chat/HinglishChatAdvisor";
import { useChatAdvisor } from "@/hooks/useChatAdvisor";
import { useOnboarding } from "@/hooks/useOnboarding";
import { type GarmentSlot, useRecolorEngine } from "@/hooks/useRecolorEngine";
import { saveOutfitToGallery } from "@/lib/canvas/saveToGallery";
import { TRENDING_COMBOS } from "@/lib/data/trendingCombos";

export default function BestColorsPage() {
  const { prefs } = useOnboarding();
  const [activeSlot, setActiveSlot] = useState<GarmentSlot>("shirt");
  const [index, setIndex] = useState(0);
  const { colors, setItemColor, setAllColors } = useRecolorEngine();
  const shirtRef = useRef<HTMLCanvasElement | null>(null);
  const trouserRef = useRef<HTMLCanvasElement | null>(null);
  const shoesRef = useRef<HTMLCanvasElement | null>(null);
  const beltRef = useRef<HTMLCanvasElement | null>(null);

  const canvasRefs = useMemo(
    () => ({
      shirt: shirtRef,
      trouser: trouserRef,
      shoes: shoesRef,
      belt: beltRef,
    }),
    []
  );

  const chat = useChatAdvisor({
    onColorChange: setItemColor,
    onSlotFocus: setActiveSlot,
    onSave: async () => {
      if (!shirtRef.current || !trouserRef.current || !shoesRef.current || !beltRef.current) return;
      await saveOutfitToGallery({
        shirtCanvas: shirtRef.current,
        trouserCanvas: trouserRef.current,
        shoesCanvas: shoesRef.current,
        beltCanvas: beltRef.current,
        skinTone: prefs.skinTone ?? "wheatish",
        occasion: prefs.occasion ?? "casual",
      });
    },
    skinTone: prefs.skinTone ?? "wheatish",
    occasion: prefs.occasion ?? "casual",
  });

  useEffect(() => {
    const preferred = TRENDING_COMBOS.find(
      (combo) =>
        combo.occasion === (prefs.occasion ?? "casual") &&
        combo.skinTones.includes(prefs.skinTone ?? "wheatish")
    );
    const startIndex = preferred ? TRENDING_COMBOS.findIndex((combo) => combo.id === preferred.id) : 0;
    setIndex(startIndex);
    setAllColors((preferred ?? TRENDING_COMBOS[0]).colors);
  }, [prefs.occasion, prefs.skinTone, setAllColors]);

  const currentCombo = TRENDING_COMBOS[index];

  const applyAndAnnounce = useCallback(
    (nextIndex: number) => {
      const combo = TRENDING_COMBOS[nextIndex];
      setIndex(nextIndex);
      setAllColors(combo.colors);
      chat.pushAdvisorMessage(
        `${combo.chatIntro} ${(combo.likes / 1000).toFixed(1)}k logon ne pasand kiya. Pasand aaye toh save karo.`,
        ["Save karo", "Next dekho", "Back dekho"]
      );
    },
    [chat, setAllColors]
  );

  const handleNext = useCallback(() => {
    applyAndAnnounce((index + 1) % TRENDING_COMBOS.length);
  }, [applyAndAnnounce, index]);

  const handlePrev = useCallback(() => {
    applyAndAnnounce((index - 1 + TRENDING_COMBOS.length) % TRENDING_COMBOS.length);
  }, [applyAndAnnounce, index]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-offwhite">
      <header className="flex items-center justify-between bg-maroon-800 px-4 py-3 text-white">
        <div>
          <h1 className="text-sm font-bold">Best Colors आपके लिए</h1>
          <p className="text-xs text-white/80">
            {index + 1}/{TRENDING_COMBOS.length} · {currentCombo.nameHi} · {(currentCombo.likes / 1000).toFixed(1)}k likes
          </p>
        </div>
        <Link href="/" className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
          Home
        </Link>
      </header>

      <div className="h-[55%] overflow-hidden">
        <SplitScreenPreview
          colors={colors}
          onColorChange={(slot, hex, name) => chat.onCanvasColorChange(slot, hex, name)}
          onSlotClick={(slot) => setActiveSlot(slot)}
          activeSlot={activeSlot}
          onSave={() => chat.handleUserInput("Save karo")}
          canvasRefs={canvasRefs}
        />
      </div>

      <div className="h-[45%] overflow-hidden px-3 pb-2">
        <HinglishChatAdvisor
          messages={chat.messages}
          isTyping={chat.isTyping}
          onUserInput={chat.handleUserInput}
          onNext={handleNext}
          onPrev={handlePrev}
          inputRef={chat.inputRef}
        />
      </div>
    </div>
  );
}
