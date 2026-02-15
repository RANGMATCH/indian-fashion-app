"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const OCCASION_DATA: Record<string, { name: string; nameHi: string; formality: string; bestColors: string[]; tips: string[] }> = {
  wedding: { name: "Wedding", nameHi: "शादी", formality: "Formal", bestColors: ["Maroon", "Navy", "Gold", "Cream", "White"], tips: ["Sherwani or suit — choose based on family tradition.", "Match pagri with outfit. Avoid too much glitter if first time."] },
  formal: { name: "Office / Formal", nameHi: "ऑफिस", formality: "Formal", bestColors: ["Navy", "White", "Light Blue", "Grey"], tips: ["Full sleeves, clean fit. Navy + white is a safe power combo."] },
  party: { name: "Party", nameHi: "पार्टी", formality: "Semi-Formal", bestColors: ["Maroon", "Black", "Olive", "Burgundy"], tips: ["You can go bolder with colors and fits."] },
  casual: { name: "Casual Hangout", nameHi: "कैज़ुअल", formality: "Casual", bestColors: ["Any — express yourself"], tips: ["Comfort first. Kurta-jeans or shirt-chinos work well."] },
  "date-night": { name: "Date Night", nameHi: "डेट", formality: "Semi-Formal", bestColors: ["Navy", "Maroon", "Olive", "White"], tips: ["Neat and put-together."] },
  interview: { name: "Interview", nameHi: "इंटरव्यू", formality: "Formal", bestColors: ["Navy", "White", "Light Blue", "Grey"], tips: ["Conservative and clean. Full sleeves, minimal patterns."] },
  festival: { name: "Festival", nameHi: "त्योहार", formality: "Mixed", bestColors: ["White", "Saffron", "Maroon"], tips: ["Traditional or smart casual depending on the event."] },
  gym: { name: "Gym / Sports", nameHi: "जिम", formality: "Casual", bestColors: ["Any dark or bright"], tips: ["Moisture-wicking fabric. Fit matters for movement."] },
};

export default function OccasionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const data = OCCASION_DATA[slug] ?? OCCASION_DATA.wedding;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-24 md:pb-8">
      <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-primary-navy hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h1 className="mt-4 text-3xl font-bold text-primary-navy">{data.name}</h1>
      <p className="font-hindi text-lg text-primary-maroon">{data.nameHi}</p>
      <p className="text-neutral-grey">Formality: {data.formality}</p>
      <section className="mt-8">
        <h2 className="font-semibold text-neutral-black">Best colors</h2>
        <p className="mt-1 text-sm text-neutral-grey">{data.bestColors.join(", ")}</p>
      </section>
      <section className="mt-6">
        <h2 className="font-semibold text-neutral-black">Tips</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
          {data.tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>
      <section className="mt-8 rounded-xl border border-primary-navy/20 bg-white p-6">
        <h2 className="font-semibold">Outfit options</h2>
        <p className="mt-1 text-sm text-neutral-grey">Safe · Moderate · Bold options in search</p>
        <Link href={`/search?occasion=${encodeURIComponent(data.name)}`} className="mt-4 inline-block rounded-lg bg-primary-navy px-4 py-2 text-sm font-medium text-white hover:bg-primary-navy/90">
          Get outfits for {data.name}
        </Link>
      </section>
    </div>
  );
}
