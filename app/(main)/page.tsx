"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { ItemCard } from "@/components/ItemCard";
import { searchItems } from "@/lib/api/fashion";
import type { FashionItem } from "@/types/fashion";
import { Shirt, Palette, Heart, MessageCircle, Upload, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [browseItems, setBrowseItems] = useState<FashionItem[]>([]);
  const [browseLoading, setBrowseLoading] = useState(true);

  useEffect(() => {
    searchItems("", {}, 0, 8).then(({ data }) => {
      setBrowseItems(data);
      setBrowseLoading(false);
    });
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    else router.push("/search");
  };

  const testimonials = [
    { text: "Skin tone ke hisaab se colors milna ab easy hai.", author: "RangMatch user" },
    { text: "Wedding outfit final karna 10 min mein ho gaya!", author: "User from Delhi" },
    { text: "Body type tips actually kaam karti hain.", author: "User" },
  ];

  const trending = [
    { label: "Navy Blazer + White Shirt", occasion: "Formal" },
    { label: "Maroon Kurta + Cream Churidar", occasion: "Wedding" },
    { label: "Olive Shirt + Khaki Trousers", occasion: "Casual" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 pb-20 md:pb-8">
      {/* Hero - Swiggy/Blinkit style */}
      <section className="text-center">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-neutral-black sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-primary-orange">Rang</span>Match
        </motion.h1>
        <p className="mt-2 text-lg font-medium text-neutral-grey font-hindi">
          आपकी स्किन टोन, अवसर और बॉडी टाइप के हिसाब से परफेक्ट आउटफिट
        </p>
        <p className="mt-1 text-neutral-black">
          Perfect outfits by skin tone, occasion & body type
        </p>
        <div className="mx-auto mt-8 max-w-xl">
          <SearchBar
            placeholder="Search karein... e.g. शादी, wedding, kurta"
            onSearch={handleSearch}
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/outfit-builder"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-orange px-6 py-3.5 font-semibold text-white shadow-card transition hover:opacity-95 hover:scale-[1.02]"
          >
            <Sparkles className="h-5 w-5" /> Build Outfit
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-neutral-black/20 px-6 py-3.5 font-semibold text-neutral-black transition hover:border-primary-orange hover:bg-primary-orange/5"
          >
            <Upload className="h-5 w-5" /> Upload your wardrobe
          </Link>
        </div>
      </section>

      {/* Browse outfits - real data from app (Supabase / mock) */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-black">Browse outfits</h2>
          <Link
            href="/search"
            className="text-sm font-semibold text-primary-orange hover:underline"
          >
            View all →
          </Link>
        </div>
        {browseLoading ? (
          <div className="mt-6 flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-primary-orange" />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {browseItems.map((item, i) => (
              <motion.div
                key={item.unique_id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <ItemCard item={item} showSocialScore={false} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Trending outfit combinations */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-neutral-black">Trending outfit combinations</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {trending.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="rounded-2xl border border-black/8 bg-white p-5 shadow-card transition hover:shadow-card-hover"
            >
              <p className="font-medium text-neutral-black">{item.label}</p>
              <p className="text-sm text-neutral-grey">{item.occasion}</p>
              <Link
                href={`/search?occasion=${encodeURIComponent(item.occasion)}`}
                className="mt-2 inline-block text-sm font-semibold text-primary-orange hover:underline"
              >
                Get similar →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Shirt, title: "Outfit Builder", desc: "Drag & drop top, bottom, footwear & accessories", href: "/outfit-builder" },
          { icon: Palette, title: "Skin Tone Guide", desc: "Colors that suit Fair, Wheatish, Dusky & more", href: "/style-guide" },
          { icon: Heart, title: "Occasion Ready", desc: "Wedding, Office, Party, Date — curated looks", href: "/occasions" },
          { icon: MessageCircle, title: "AI Stylist", desc: "Ask in Hindi or English — get styling advice", href: "/chat" },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="rounded-2xl border border-black/8 bg-white p-6 text-center shadow-card transition hover:shadow-card-hover hover:border-primary-orange/30"
          >
            <item.icon className="mx-auto h-10 w-10 text-primary-navy" />
            <h3 className="mt-2 font-semibold text-neutral-black">{item.title}</h3>
            <p className="mt-1 text-sm text-neutral-grey">{item.desc}</p>
            <Link href={item.href} className="mt-3 inline-block text-sm font-medium text-primary-maroon hover:underline">
              Try it →
            </Link>
          </motion.div>
        ))}
      </section>

      {/* How it works */}
      <section className="mt-16 rounded-2xl border border-black/8 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-bold text-neutral-black">How it works</h2>
        <ol className="mt-4 space-y-3 text-neutral-black">
          <li className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-navy text-sm font-bold text-white">1</span>
            Set your skin tone & body type in Profile (optional).
          </li>
          <li className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-navy text-sm font-bold text-white">2</span>
            Search in Hindi, English or Hinglish — e.g. &quot;शादी&quot;, &quot;wedding kurta&quot;.
          </li>
          <li className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-navy text-sm font-bold text-white">3</span>
            Use filters: occasion, confidence level, color. Build outfits in Outfit Builder.
          </li>
        </ol>
      </section>

      {/* Testimonials */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-neutral-black">What users say</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-2xl border border-black/8 bg-white p-4 shadow-card"
            >
              <p className="text-neutral-black">&quot;{t.text}&quot;</p>
              <footer className="mt-2 text-sm text-neutral-grey">— {t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
