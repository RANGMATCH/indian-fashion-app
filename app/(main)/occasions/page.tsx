"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";

const OCCASIONS = [
  { slug: "wedding", name: "Wedding", nameHi: "शादी", formality: "Formal" },
  { slug: "formal", name: "Office / Formal", nameHi: "ऑफिस", formality: "Formal" },
  { slug: "party", name: "Party", nameHi: "पार्टी", formality: "Semi-Formal" },
  { slug: "casual", name: "Casual Hangout", nameHi: "कैज़ुअल", formality: "Casual" },
  { slug: "date-night", name: "Date Night", nameHi: "डेट", formality: "Semi-Formal" },
  { slug: "interview", name: "Interview", nameHi: "इंटरव्यू", formality: "Formal" },
  { slug: "festival", name: "Festival", nameHi: "त्योहार", formality: "Mixed" },
  { slug: "gym", name: "Gym / Sports", nameHi: "जिम", formality: "Casual" },
];

export default function OccasionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 md:pb-8">
      <h1 className="text-3xl font-bold text-primary-navy">Occasions</h1>
      <p className="mt-1 text-neutral-grey">Pick an occasion for outfit ideas and guides</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OCCASIONS.map((occ) => (
          <Link
            key={occ.slug}
            href={`/occasions/${occ.slug}`}
            className="flex flex-col rounded-xl border border-primary-navy/20 bg-white p-6 transition hover:border-primary-navy hover:shadow-md"
          >
            <Calendar className="h-10 w-10 text-primary-maroon" />
            <h2 className="mt-3 font-semibold text-neutral-black">{occ.name}</h2>
            <p className="font-hindi text-primary-maroon">{occ.nameHi}</p>
            <p className="mt-1 text-sm text-neutral-grey">{occ.formality}</p>
            <span className="mt-3 text-sm font-medium text-primary-navy">Get outfits →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
