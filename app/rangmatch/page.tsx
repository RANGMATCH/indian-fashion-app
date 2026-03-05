// /app/rangmatch/page.tsx
"use client";

import React from "react";
import { useRangMatchController } from "@/lib/rangmatch/useRangMatchController";
import { PreviewSection } from "@/components/PreviewSection";
import { GateSelector } from "@/components/GateSelector";
import { SuggestionCard } from "@/components/SuggestionCard";
import { SwipeController } from "@/components/SwipeController";
import { FeatureBlocks } from "@/components/FeatureBlocks";
import { WebGPUPlaceholder } from "@/components/WebGPUPlaceholder";
import { Sparkles } from "lucide-react";

export default function RangMatchPage() {
  const { 
    gate, 
    preview, 
    suggestions, 
    currentIndex, 
    currentSuggestion, 
    actions 
  } = useRangMatchController();

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Dynamic Cyberpunk Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-pink-900/10 rounded-full blur-[100px]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="relative z-10">
        {/* 1. Preview Section (Sticky Top) */}
        <PreviewSection 
          preview={preview} 
          onReset={actions.reset} 
        />

        <main className="flex flex-col pb-24">
          {/* Header / Intro */}
          <header className="px-4 py-12 max-w-md mx-auto w-full text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-cyan-500/50 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(0,243,255,0.2)] animate-in fade-in slide-in-from-top-4 duration-700">
              <Sparkles size={12} className="animate-pulse" /> Indian Men's Fashion AI
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              RANG<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 animate-gradient-x">MATCH</span>
            </h1>
            <p className="text-sm text-gray-400 font-mono tracking-wide">
              // SYSTEM: READY FOR COLOR ANALYSIS
            </p>
          </header>

          {/* 2. Gate Selector */}
          <section>
            <GateSelector 
              gate={gate}
              onSkinToneSelect={actions.setSkinTone}
              onWeatherSelect={actions.setWeather}
              onOccasionSelect={actions.setOccasion}
            />
          </section>

          {/* 3. Suggestion Card */}
          <section className="mt-8">
            <SuggestionCard 
              suggestion={currentSuggestion || null}
              isLocked={preview.isLocked}
            />
          </section>

          {/* 4. Swipe Controller */}
          <section>
            <SwipeController 
              currentIndex={currentIndex}
              total={suggestions.length}
              isLocked={preview.isLocked}
              onNext={actions.nextSuggestion}
              onPrev={actions.prevSuggestion}
            />
          </section>

          {/* Divider */}
          <div className="max-w-md mx-auto w-full px-4 my-8">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent w-full" />
          </div>

          {/* 5. Feature Blocks */}
          <FeatureBlocks />

          {/* 6. WebGPU Placeholder */}
          <WebGPUPlaceholder />

          {/* Footer */}
          <footer className="px-4 py-8 text-center border-t border-white/5 bg-black/80 backdrop-blur-md">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
              RangMatch AI © 2026 • Cyber Delhi Edition
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
