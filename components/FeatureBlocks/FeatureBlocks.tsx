// /components/FeatureBlocks/FeatureBlocks.tsx
"use client";

import React from "react";
import { Lightbulb, TrendingUp, UserCheck } from "lucide-react";

export const FeatureBlocks: React.FC = () => {
  return (
    <div className="max-w-md mx-auto w-full p-4 grid grid-cols-2 gap-3 mb-8">
      <FeatureCard 
        icon={<Lightbulb size={20} className="text-yellow-400" />}
        title="Style Tips"
        desc="Earthy tones are trending this season."
        glowClass="hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:border-yellow-500/50"
      />
      <FeatureCard 
        icon={<TrendingUp size={20} className="text-green-400" />}
        title="Trending"
        desc="Monochrome looks for formal events."
        glowClass="hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:border-green-500/50"
      />
      <FeatureCard 
        icon={<UserCheck size={20} className="text-cyan-400" />}
        title="Celeb Looks"
        desc="Inspired by Bollywood's best dressed."
        className="col-span-2"
        glowClass="hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:border-cyan-500/50"
      />
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; className?: string; glowClass?: string }> = ({ 
  icon, title, desc, className = "", glowClass = "" 
}) => (
  <div className={`p-4 bg-gray-900/60 border border-white/5 rounded-2xl flex flex-col gap-2 transition-all duration-300 cursor-default backdrop-blur-sm group ${className} ${glowClass}`}>
    <div className="p-2 bg-black rounded-xl w-fit shadow-inner border border-white/10 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="flex flex-col">
      <h4 className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{title}</h4>
      <p className="text-[11px] text-gray-400 leading-tight group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
  </div>
);
