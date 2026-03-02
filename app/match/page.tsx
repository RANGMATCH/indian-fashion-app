"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { HinglishChatAdvisor } from "@/components/chat/HinglishChatAdvisor";
import { SplitScreenPreview } from "@/components/preview/SplitScreenPreview";
import { type GarmentSlot, useRecolorEngine } from "@/hooks/useRecolorEngine";
import { saveOutfitToGallery } from "@/lib/canvas/saveToGallery";
import { useChatAdvisor } from "@/hooks/useChatAdvisor";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function MatchPage() {
  const router = useRouter();
  const { prefs } = useOnboarding();
  const [activeSlot, setActiveSlot] = useState<GarmentSlot>("shirt");
  const [chatOpen, setChatOpen] = useState(true);
  const { colors, setItemColor } = useRecolorEngine();
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
    onSlotFocus: (slot) => setActiveSlot(slot),
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

  const handleColorChange = useCallback(
    (slot: GarmentSlot, hex: string, colorName: string) => {
      chat.onCanvasColorChange(slot, hex, colorName);
    },
    [chat]
  );

  const handleSlotClick = useCallback(
    (slot: GarmentSlot) => {
      setActiveSlot(slot);
      chat.handleUserInput(
        slot === "shirt"
          ? "Shirt pe kaam karein"
          : slot === "trouser"
            ? "Pant ka rang set karein"
            : slot === "shoes"
              ? "Shoes finalize karein"
              : "Belt match karein"
      );
    },
    [chat]
  );

  const handleSave = useCallback(() => {
    chat.handleUserInput("Save karo 💾");
  }, [chat]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-offwhite">
      <header className="flex flex-shrink-0 items-center gap-3 bg-maroon-800 px-4 py-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="touch-feedback flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 text-white" />
        </button>
        <h1 className="flex-1 text-sm font-bold text-white">Color Match karo 🎨</h1>
        <button
          type="button"
          onClick={() => setChatOpen((prev) => !prev)}
          className="touch-feedback rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
        >
          {chatOpen ? "Chat छुपाओ" : "Chat खोलो"}
        </button>
      </header>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className={`overflow-hidden transition-all duration-300 ${chatOpen ? "h-[55%]" : "flex-1"}`}>
          <SplitScreenPreview
            colors={colors}
            onColorChange={handleColorChange}
            onSlotClick={handleSlotClick}
            activeSlot={activeSlot}
            onSave={handleSave}
            canvasRefs={canvasRefs}
          />
        </div>

        {chatOpen ? (
          <div className="h-[45%] overflow-hidden px-3 pb-2">
            <HinglishChatAdvisor
              messages={chat.messages}
              isTyping={chat.isTyping}
              onUserInput={chat.handleUserInput}
              onNext={chat.handleNext}
              onPrev={chat.handlePrev}
              inputRef={chat.inputRef}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
