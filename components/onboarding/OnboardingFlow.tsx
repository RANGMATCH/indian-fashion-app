"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type Occasion, type SkinTone, useOnboarding } from "@/hooks/useOnboarding";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const SKIN_TONES: Array<{ value: SkinTone; label: string; labelHi: string; emoji: string }> = [
  { value: "fair", label: "Fair", labelHi: "गोरा", emoji: "✨" },
  { value: "medium", label: "Medium", labelHi: "मीडियम", emoji: "🌟" },
  { value: "wheatish", label: "Wheatish", labelHi: "गेहुआं", emoji: "🤎" },
  { value: "dusky", label: "Dusky", labelHi: "सांवला", emoji: "🟤" },
  { value: "deep", label: "Deep", labelHi: "डीप", emoji: "🖤" },
];

const OCCASIONS: Array<{ value: Occasion; label: string; labelHi: string; emoji: string }> = [
  { value: "formal", label: "Formal", labelHi: "फॉर्मल", emoji: "💼" },
  { value: "casual", label: "Casual", labelHi: "कैजुअल", emoji: "🧢" },
  { value: "wedding", label: "Wedding", labelHi: "शादी", emoji: "🎊" },
  { value: "party", label: "Party", labelHi: "पार्टी", emoji: "🎉" },
  { value: "date", label: "Date", labelHi: "डेट", emoji: "❤️" },
  { value: "office", label: "Office", labelHi: "ऑफिस", emoji: "🏢" },
  { value: "festival", label: "Festival", labelHi: "त्योहार", emoji: "🪔" },
  { value: "gym", label: "Gym", labelHi: "जिम", emoji: "🏋️" },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedSkinTone, setSelectedSkinTone] = useState<SkinTone | null>(null);
  const { setSkinTone, setOccasion } = useOnboarding();

  const handleSkinTone = (tone: SkinTone) => {
    setSelectedSkinTone(tone);
    setSkinTone(tone);
    setTimeout(() => setStep(2), 300);
  };

  const handleOccasion = (occasion: Occasion) => {
    setOccasion(occasion);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-maroon-800">
      <header className="px-6 pt-8 pb-5 text-white">
        <h1 className="text-3xl font-bold">RangMatch</h1>
        <p className="mt-1 text-sm text-white/80">AI Fashion Advisor</p>
        <div className="mt-4 flex gap-2">
          <span className={`h-2.5 w-8 rounded-full ${step === 1 ? "bg-white" : "bg-white/40"}`} />
          <span className={`h-2.5 w-8 rounded-full ${step === 2 ? "bg-white" : "bg-white/40"}`} />
        </div>
      </header>

      <div className="flex-1 px-4 pb-6">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step-1"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <h2 className="mb-4 text-xl font-semibold text-white">Aapka Skin Tone? आपके लिए best colors suggest करेंगे 🎨</h2>
              <div className="space-y-3">
                {SKIN_TONES.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleSkinTone(item.value)}
                    className={`touch-feedback flex min-h-[56px] w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                      selectedSkinTone === item.value
                        ? "border-white bg-white text-maroon-900"
                        : "border-white/40 bg-white/10 text-white"
                    }`}
                  >
                    <span>
                      <span className="block text-base font-semibold">{item.label}</span>
                      <span className="block text-sm opacity-90">{item.labelHi}</span>
                    </span>
                    <span className="text-xl">{item.emoji}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <h2 className="mb-4 text-xl font-semibold text-white">Occasion select karein / अवसर चुनें</h2>
              <div className="grid grid-cols-2 gap-3">
                {OCCASIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleOccasion(item.value)}
                    className="touch-feedback min-h-[56px] rounded-2xl border border-white/40 bg-white/10 px-3 py-3 text-left text-white"
                  >
                    <span className="block text-sm">{item.emoji}</span>
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block text-xs opacity-90">{item.labelHi}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
