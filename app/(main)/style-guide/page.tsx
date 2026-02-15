"use client";

import { useState } from "react";
import { SkinTonePicker } from "@/components/SkinTonePicker";
import { BodyTypeSelector } from "@/components/BodyTypeSelector";

const COLOR_GUIDE: Record<string, string[]> = {
  Fair: ["Navy", "Maroon", "Pastels", "White", "Light Blue"],
  Wheatish: ["Maroon", "Navy", "Olive", "Cream", "Burgundy"],
  Medium: ["Navy", "Olive", "Maroon", "Grey", "White"],
  Dusky: ["Navy", "Maroon", "White", "Cream", "Olive"],
  Deep: ["White", "Cream", "Navy", "Maroon", "Bright accents"],
};

const BODY_TIPS: Record<string, string> = {
  Regular: "Most styles work. Experiment with fits and colors.",
  Athletic: "Fitted and structured pieces look great.",
  "Plus Size": "Dark colors and vertical lines. Avoid baggy — go for tailored.",
  Slim: "Layered looks add volume. Avoid overly tight.",
  Tall: "You can carry bold patterns and longer lengths.",
};

export default function StyleGuidePage() {
  const [skinTone, setSkinTone] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const suggestedColors = skinTone ? COLOR_GUIDE[skinTone] ?? [] : [];
  const bodyTip = bodyType ? BODY_TIPS[bodyType] ?? "" : "";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-bold text-primary-navy">Style Guide</h1>
      <p className="mt-1 text-neutral-grey">Body type & skin tone tips, colors & fabrics</p>

      <section className="mt-8 rounded-xl border border-primary-navy/20 bg-white p-6">
        <h2 className="font-semibold text-neutral-black">Skin tone & colors</h2>
        <SkinTonePicker value={skinTone} onChange={setSkinTone} className="mt-4" />
        {suggestedColors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium">Suggested colors for you</p>
            <p className="text-neutral-grey">{suggestedColors.join(", ")}</p>
          </div>
        )}
      </section>

      <section className="mt-8 rounded-xl border border-primary-navy/20 bg-white p-6">
        <h2 className="font-semibold text-neutral-black">Body type</h2>
        <BodyTypeSelector value={bodyType} onChange={setBodyType} className="mt-4" />
        {bodyTip && <p className="mt-4 rounded-lg bg-neutral-grey/10 p-3 text-sm">{bodyTip}</p>}
      </section>

      <section className="mt-8 rounded-xl border border-primary-navy/20 bg-white p-6">
        <h2 className="font-semibold text-neutral-black">Fabrics (quick guide)</h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-grey">
          <li><strong className="text-neutral-black">Cotton</strong> — Summer, breathable</li>
          <li><strong className="text-neutral-black">Linen</strong> — Summer, very breathable</li>
          <li><strong className="text-neutral-black">Wool</strong> — Winter, formal</li>
          <li><strong className="text-neutral-black">Silk</strong> — Occasions, premium</li>
          <li><strong className="text-neutral-black">Denim</strong> — Casual, durable</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-primary-navy/20 bg-white p-6">
        <h2 className="font-semibold text-neutral-black">Common mistakes to avoid</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-grey">
          <li>Too tight or too loose — aim for fitted</li>
          <li>Clashing colors (e.g. red + orange) — use neutrals to balance</li>
          <li>Wrong formality for occasion — match the venue</li>
          <li>Ignoring skin tone — some colors wash out or overpower</li>
        </ul>
      </section>
    </div>
  );
}
