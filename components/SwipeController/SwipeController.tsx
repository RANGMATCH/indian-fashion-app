// /components/SwipeController/SwipeController.tsx
"use client";

import React from "react";
import { SwipeControllerProps } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SwipeController: React.FC<SwipeControllerProps> = ({ 
  currentIndex, 
  total, 
  isLocked, 
  onNext, 
  onPrev 
}) => {
  return (
    <div className={`max-w-md mx-auto w-full px-4 py-4 flex items-center justify-between gap-4 transition-all ${isLocked ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
      <button
        onClick={onPrev}
        className="w-14 h-14 flex items-center justify-center bg-slate-800 border border-slate-700 rounded-2xl shadow-lg text-slate-400 hover:text-white hover:bg-slate-700 active:scale-95 transition-all"
        aria-label="Previous Suggestion"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Outfit</span>
        <span className="text-xl font-black text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">
          {isLocked ? "0/0" : `${currentIndex + 1}/${total}`}
        </span>
      </div>

      <button
        onClick={onNext}
        className="w-14 h-14 flex items-center justify-center bg-indigo-600 border border-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 text-white hover:bg-indigo-500 active:scale-95 transition-all"
        aria-label="Next Suggestion"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};
