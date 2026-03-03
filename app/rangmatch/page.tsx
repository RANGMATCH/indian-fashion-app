"use client";

import { useEffect, useRef } from "react";
import { useRangMatchController } from "@/lib/rangmatch/useRangMatchController";
import { SKIN_TONES, WEATHERS, OCCASIONS } from "@/lib/rangmatch/dummyData";
import { PreviewSection } from "@/components/PreviewSection";
import { FashionPreviewStrip } from "@/components/FashionPreviewStrip";
import { AdvisorChatBox } from "@/components/AdvisorChatBox";
import { GateSelector } from "@/components/GateSelector";
import { SuggestionCard } from "@/components/SuggestionCard";
import { SwipeController } from "@/components/SwipeController";
import { FeatureBlocks } from "@/components/FeatureBlocks";

/**
 * RangMatch — Header → Selections (small) → Preview (auto-scroll till unlock, then selection preview) → Chatbox → Selections (small) + rest.
 */
export default function RangMatchPage() {
  const { state, actions } = useRangMatchController();
  const currentSuggestion =
    state.suggestions.length > 0
      ? state.suggestions[state.nav.index]
      : null;
  const unlocked = state.step === "unlocked";
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unlocked) {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [unlocked]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-maroon-950/20 text-zinc-100">
      <PreviewSection
        preview={state.preview}
        onResetGate={actions.reset}
      />
      <GateSelector
        value={state.gate}
        step={state.step}
        skinToneOptions={SKIN_TONES}
        weatherOptions={WEATHERS}
        occasionOptions={OCCASIONS}
        onPickSkinTone={actions.pickSkinTone}
        onPickWeather={actions.pickWeather}
        onPickOccasion={actions.pickOccasion}
        onReset={actions.reset}
        compact
      />
      <div ref={previewRef}>
        <FashionPreviewStrip
          unlocked={unlocked}
          selectionTitle={unlocked ? currentSuggestion?.title ?? null : null}
        />
      </div>
      <AdvisorChatBox />
      <div className="max-w-[360px] mx-auto px-4 pb-8">
        <div className="pt-2 pb-4">
          <GateSelector
            value={state.gate}
            step={state.step}
            skinToneOptions={SKIN_TONES}
            weatherOptions={WEATHERS}
            occasionOptions={OCCASIONS}
            onPickSkinTone={actions.pickSkinTone}
            onPickWeather={actions.pickWeather}
            onPickOccasion={actions.pickOccasion}
            onReset={actions.reset}
            compact
          />
        </div>
        <div className="mt-4">
          <SuggestionCard
            locked={state.step !== "unlocked"}
            suggestion={currentSuggestion}
          />
        </div>
        <SwipeController
          disabled={state.step !== "unlocked"}
          onNext={actions.next}
          onBack={actions.back}
        />
        <FeatureBlocks />
      </div>
    </main>
  );
}
