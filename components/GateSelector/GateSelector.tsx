// /components/GateSelector/GateSelector.tsx
"use client";

import React from "react";
import { GateSelectorProps } from "./types";
import { SKIN_TONES, WEATHERS, OCCASIONS } from "@/lib/rangmatch/dummyData";
import { Check } from "lucide-react";

export const GateSelector: React.FC<GateSelectorProps> = ({ 
  gate, 
  onSkinToneSelect, 
  onWeatherSelect, 
  onOccasionSelect 
}) => {
  return (
    <div className="flex flex-col gap-8 p-6 max-w-md mx-auto w-full">
      <GateSection 
        title="1. Skin Tone" 
        active={true}
        selected={gate.skinTone}
        options={SKIN_TONES}
        onSelect={onSkinToneSelect as (val: string) => void}
        colorClass="neon-border-cyan text-cyan-400"
      />
      
      <GateSection 
        title="2. Weather" 
        active={gate.skinTone !== null}
        selected={gate.weather}
        options={WEATHERS}
        onSelect={onWeatherSelect as (val: string) => void}
        colorClass="neon-border-pink text-pink-400"
      />
      
      <GateSection 
        title="3. Occasion" 
        active={gate.skinTone !== null && gate.weather !== null}
        selected={gate.occasion}
        options={OCCASIONS}
        onSelect={onOccasionSelect as (val: string) => void}
        colorClass="border-purple-500 shadow-[0_0_15px_#bd00ff] text-purple-400"
      />
    </div>
  );
};

interface GateSectionProps {
  title: string;
  active: boolean;
  selected: string | null;
  options: string[];
  onSelect: (val: string) => void;
  colorClass: string;
}

const GateSection: React.FC<GateSectionProps> = ({ title, active, selected, options, onSelect, colorClass }) => (
  <div className={`flex flex-col gap-3 transition-all duration-500 ${active ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4 pointer-events-none grayscale'}`}>
    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] pl-1 border-l-2 border-gray-700">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`
            px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide border transition-all duration-300 flex items-center gap-2 relative overflow-hidden group
            ${selected === option 
              ? `bg-black ${colorClass} scale-105 z-10` 
              : 'bg-gray-900/40 text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300 hover:bg-gray-800'}
          `}
        >
          {/* Scanline effect on hover */}
          <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          
          {selected === option && <Check size={14} className="animate-in zoom-in spin-in-90 duration-300" />}
          {option}
        </button>
      ))}
    </div>
  </div>
);
