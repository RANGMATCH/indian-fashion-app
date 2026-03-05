"use client";

import { FALLBACK_RECURRING_SECTIONS } from "@/lib/data/recurringFeed";

const LOOKS = [
  ...FALLBACK_RECURRING_SECTIONS[0].looks,
  ...(FALLBACK_RECURRING_SECTIONS[1]?.looks ?? []),
];

type Props = {
  /** When true, auto-scroll stops and selection-based preview shows */
  unlocked?: boolean;
  /** Current suggestion title when unlocked */
  selectionTitle?: string | null;
};

export function FashionPreviewStrip({ unlocked = false, selectionTitle = null }: Props) {
  const duplicated = [...LOOKS, ...LOOKS];

  if (unlocked && selectionTitle) {
    return (
      <section className="w-full max-w-[360px] mx-auto border-b border-zinc-800 bg-zinc-900/80">
        <p className="px-4 py-2 text-xs font-semibold text-teal-400/90 uppercase tracking-wider">
          Your colour match — preview
        </p>
        <div className="px-4 pb-4">
          <div className="rounded-xl overflow-hidden border-2 border-maroon-600/50 bg-zinc-800 shadow-rangmatch-card">
            <div className="aspect-[4/3] relative bg-zinc-800">
              <img
                src={LOOKS[0].imageUrl}
                alt="Your match"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] font-semibold text-amber-500/90 uppercase tracking-wider">
                  Your match
                </p>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {selectionTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[360px] mx-auto px-0 overflow-hidden border-b border-zinc-800 bg-zinc-900/80">
      <p className="px-4 py-2 text-xs font-semibold text-amber-500/90 uppercase tracking-wider">
        Fashion looks — pick Skin, Weather & Occasion to see your match
      </p>
      <div className="relative">
        <div className="flex gap-3 py-3 overflow-hidden">
          <div
            className="flex gap-3 animate-fashion-scroll shrink-0"
            style={{ width: "max-content" }}
          >
            {duplicated.map((look) => (
              <div
                key={`${look.id}-${look.title}`}
                className="relative shrink-0 w-[160px] h-[120px] rounded-xl overflow-hidden border-2 border-zinc-700/80 bg-zinc-800"
              >
                <img
                  src={look.imageUrl}
                  alt={look.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-[10px] font-medium text-white truncate">
                    {look.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
