// /components/WebGPUPlaceholder/WebGPUPlaceholder.tsx
"use client";

import React from "react";
import { Upload, Zap } from "lucide-react";

export const WebGPUPlaceholder: React.FC = () => {
  return (
    <div className="max-w-md mx-auto w-full p-4 mb-8">
      <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-6 flex flex-col gap-4 items-center text-center backdrop-blur-md relative overflow-hidden group">
        {/* Animated Cyber Grid Background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,243,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-[50px] pointer-events-none group-hover:bg-pink-500/20 transition-colors duration-700" />
        
        <div className="p-3 bg-black rounded-2xl shadow-[0_0_20px_rgba(0,243,255,0.3)] border border-cyan-500 text-cyan-400 relative z-10 animate-pulse">
          <Zap size={24} />
        </div>
        <div className="flex flex-col gap-1 relative z-10">
          <h3 className="text-lg font-bold text-white tracking-wide neon-text-cyan">WebGPU Recoloring</h3>
          <p className="text-sm text-gray-400 font-mono">
            &lt;Coming Soon /&gt; Real-time AI clothing manipulation.
          </p>
        </div>
        
        <button className="relative z-10 mt-2 px-6 py-3 bg-black border border-gray-800 rounded-xl text-sm font-bold text-gray-500 flex items-center gap-2 hover:border-cyan-500/50 transition-all opacity-50 cursor-not-allowed uppercase tracking-wider">
          <Upload size={18} /> Upload Image (Demo)
        </button>
      </div>
    </div>
  );
};
