// /components/SuggestionCard/SuggestionCard.tsx
"use client";

import React from "react";
import { SuggestionCardProps } from "./types";
import { Lock, Sparkles } from "lucide-react";

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion, isLocked }) => {
  if (isLocked || !suggestion) {
    return (
      <div className="max-w-md mx-auto w-full p-4">
        <div className="bg-black/50 border border-dashed border-gray-800 rounded-2xl h-72 flex flex-col items-center justify-center gap-6 text-center p-8 backdrop-blur-sm relative overflow-hidden group">
          {/* Animated scanline */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
          
          <div className="p-6 bg-gray-900 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] text-gray-600 border border-gray-800 group-hover:border-cyan-500/30 group-hover:text-cyan-500 transition-colors duration-500">
            <Lock size={32} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-gray-400 tracking-widest uppercase text-sm">Access Denied</h3>
            <p className="text-xs text-gray-600 font-mono">Input parameters required: Skin Tone, Weather, Occasion</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full p-4 animate-in fade-in zoom-in-95 duration-500 perspective-1000">
      <div className="glass-panel rounded-2xl overflow-hidden neon-border-pink relative group">
        
        {/* Header */}
        <div className="bg-black/80 backdrop-blur-xl px-5 py-3 flex justify-between items-center border-b border-pink-500/20">
          <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" /> AI MATCH FOUND
          </span>
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-20 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 shadow-[0_0_10px_#ff00ff]" 
                style={{ width: `${suggestion.confidence}%` }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-400">{suggestion.confidence}%</span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col gap-6 bg-gradient-to-b from-transparent to-black/80">
          <h3 className="text-3xl font-black text-white leading-none tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {suggestion.title}
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-black/60 transition-all duration-300 group/item">
              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-cyan-500 text-[10px] font-bold border border-cyan-500/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]">TOP</div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Upper Body</span>
                <span className="text-sm font-bold text-gray-200 group-hover/item:text-cyan-300 transition-colors">{suggestion.top.name}</span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ backgroundColor: suggestion.top.hex }} />
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/50 hover:bg-black/60 transition-all duration-300 group/item">
              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-pink-500 text-[10px] font-bold border border-pink-500/20 shadow-[0_0_10px_rgba(255,0,255,0.1)]">BTM</div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Lower Body</span>
                <span className="text-sm font-bold text-gray-200 group-hover/item:text-pink-300 transition-colors">{suggestion.bottom.name}</span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ backgroundColor: suggestion.bottom.hex }} />
            </div>
            
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-black/60 transition-all duration-300 group/item">
              <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-purple-500 text-[10px] font-bold border border-purple-500/20 shadow-[0_0_10px_rgba(189,0,255,0.1)]">SHOE</div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Footwear</span>
                <span className="text-sm font-bold text-gray-200 group-hover/item:text-purple-300 transition-colors">{suggestion.shoes.name}</span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ backgroundColor: suggestion.shoes.hex }} />
            </div>
          </div>
          
          <div className="mt-2 p-4 bg-gradient-to-r from-purple-900/40 to-black rounded-xl border-l-4 border-purple-500 relative">
            <p className="text-xs text-purple-200 leading-relaxed font-medium italic pl-1">
              &ldquo;{suggestion.whyThisWorks}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
