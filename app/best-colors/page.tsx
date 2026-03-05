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
    skinTone: prefs.skinTone ?? null,
    occasion: prefs.occasion ?? null,
    weather: prefs.weather ?? null,
  });

  useEffect(() => {
    const preferred = TRENDING_COMBOS.find(
      (combo) =>
        combo.occasion === (prefs.occasion ?? "casual") &&
        combo.skinTones.includes(prefs.skinTone ?? "wheatish")
    );
    const startIndex = preferred ? TRENDING_COMBOS.findIndex((combo) => combo.id === preferred.id) : 0;
    setIndex(startIndex);
    chat.setComboIndex(startIndex);
    setAllColors((preferred ?? TRENDING_COMBOS[0]).colors);
  }, [chat, prefs.occasion, prefs.skinTone, setAllColors]);

  const currentCombo = TRENDING_COMBOS[index];

  const handleNext = useCallback(() => {
    const next = chat.navigateCombo("next", TRENDING_COMBOS);
    setIndex(next);
  }, [chat]);

  const handlePrev = useCallback(() => {
    const prev = chat.navigateCombo("prev", TRENDING_COMBOS);
    setIndex(prev);
  }, [chat]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-offwhite">
      <header className="flex items-center justify-between bg-maroon-800 px-4 py-3 text-white">
        <div>
          <h1 className="text-sm font-bold">Best Colors आपके लिए</h1>
          <p className="text-xs text-white/80">
            {index + 1}/{TRENDING_COMBOS.length} · {currentCombo.nameHi} · {(currentCombo.likes / 1000).toFixed(1)}k likes
          </p>
          {index === 0 ? (
            <span className="mt-1 inline-flex rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">👑 BEST MATCH</span>
          ) : null}
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
