"use client";

import { useState } from "react";
import { RecolorEngine } from "@/components/rendering/RecolorEngine";
import { AdvisorChatBox } from "@/components/AdvisorChatBox/AdvisorChatBox";
import { getGarmentImageUrl, GARMENT_FILE_PATTERNS } from "@/lib/supabase/storageUrls";

const garmentName = "shirt";

const colorOptions = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57",
  "#FF9FF3", "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43"
];

export default function RecolorPage() {
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  
  // Supabase storage URLs
  const baseUrl = getGarmentImageUrl(GARMENT_FILE_PATTERNS.base(garmentName));
  const maskUrl = getGarmentImageUrl(GARMENT_FILE_PATTERNS.mask(garmentName));
  const idmapUrl = getGarmentImageUrl(GARMENT_FILE_PATTERNS.idmap(garmentName));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            AI Fashion Recoloring Studio
          </h1>
          <p className="text-slate-600">
            Real-time WebGPU powered garment recoloring with AI style advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WebGPU Recoloring Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Garment Recoloring
            </h2>
            
            <div className="mb-6">
              <RecolorEngine
                baseUrl={baseUrl}
                maskUrl={maskUrl}
                idmapUrl={idmapUrl}
                selectedColor={selectedColor}
                width={400}
                height={500}
                className="w-full h-auto border-2 border-slate-200 rounded-lg"
              />
            </div>

            {/* Color Picker */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-700 mb-3">
                Choose Color:
              </h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? "border-slate-800 scale-110"
                        : "border-slate-300 hover:border-slate-500"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Current Selection */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">Selected Color:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded border border-slate-300"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-slate-600 font-mono">{selectedColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat Advisor Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              AI Style Advisor
            </h2>
            
            <div className="h-[500px]">
              <AdvisorChatBox 
                currentColor={selectedColor}
                garmentType={garmentName}
              />
            </div>

            {/* Quick Tips */}
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-blue-800 font-medium mb-2">💡 Pro Tips:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Ask for color combination suggestions</li>
                <li>• Get advice on occasion-based styling</li>
                <li>• Request trend insights for your chosen color</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Powered by WebGPU technology and Supabase storage</p>
          <p>Garment assets loaded from: {baseUrl}</p>
        </div>
      </div>
    </div>
  );
}