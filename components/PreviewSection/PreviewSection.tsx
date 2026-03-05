// /components/PreviewSection/PreviewSection.tsx
"use client";

import React from "react";
import { PreviewSectionProps } from "./types";
import { RefreshCw } from "lucide-react";

export const PreviewSection: React.FC<PreviewSectionProps> = ({ preview, onReset }) => {
  return (
    <div className="sticky top-0 z-20 w-full glass-sticky transition-all duration-300">
      <div className="max-w-md mx-auto px-4 py-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className={`text-xl font-bold tracking-tight transition-colors ${preview.isLocked ? 'text-gray-600' : 'neon-text-cyan'}`}>
              {preview.headline}
            </h2>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest line-clamp-1">
              {preview.subtitle}
            </p>
          </div>
          <button 
            onClick={onReset}
            className="p-3 text-cyan-400 border border-cyan-500/30 bg-cyan-900/20 rounded-full hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_#00f3ff] transition-all duration-300"
            title="Reset"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {!preview.isLocked && preview.currentSuggestion && (
          <div className="flex items-center gap-3 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <ColorChip label="Top" color={preview.currentSuggestion.top} />
            <ColorChip label="Bottom" color={preview.currentSuggestion.bottom} />
            <ColorChip label="Shoes" color={preview.currentSuggestion.shoes} />
          </div>
        )}
      </div>
      {/* Neon line at bottom */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_10px_#00f3ff]"></div>
    </div>
  );
};

const ColorChip: React.FC<{ label: string; color: { name: string; hex: string } }> = ({ label, color }) => (
  <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md shadow-lg">
    <div 
      className="w-4 h-4 rounded-full border border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
      style={{ backgroundColor: color.hex }}
    />
    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
      {color.name}
    </span>
  </div>
);
