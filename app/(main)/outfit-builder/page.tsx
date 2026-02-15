"use client";

import { useState, useEffect } from "react";
import { OutfitCanvas } from "@/components/OutfitCanvas";
import { getItemsByCategory, getOutfitSuggestions } from "@/lib/api/fashion";
import type { FashionItem } from "@/types/fashion";
import type { Slot } from "@/components/OutfitCanvas";
import { Loader2, Sparkles, Heart, Share2 } from "lucide-react";
import { getHexForItem } from "@/lib/constants";
import { getGuestId } from "@/lib/guestId";
import { toast } from "sonner";

const CATEGORY_BY_SLOT: Record<string, string> = {
  top: "Western Wear",
  bottom: "Western Wear",
  footwear: "Footwear",
  accessories: "Accessories",
};

export default function OutfitBuilderPage() {
  const [topItem, setTopItem] = useState<FashionItem | null>(null);
  const [bottomItem, setBottomItem] = useState<FashionItem | null>(null);
  const [footwearItem, setFootwearItem] = useState<FashionItem | null>(null);
  const [accessoriesItem, setAccessoriesItem] = useState<FashionItem | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [candidates, setCandidates] = useState<FashionItem[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [occasion, setOccasion] = useState("Wedding");
  const [skinTone, setSkinTone] = useState("Wheatish");
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState("My Outfit");
  const [saving, setSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    setShareUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  const loadCandidates = async (slot: Slot) => {
    setSelectedSlot(slot);
    setLoadingCandidates(true);
    const category = CATEGORY_BY_SLOT[slot];
    const { data } = await getItemsByCategory(category, occasion, skinTone, 20);
    setCandidates(data);
    setLoadingCandidates(false);
  };

  const setSlotItem = (slot: Slot, item: FashionItem | null) => {
    if (slot === "top") setTopItem(item);
    else if (slot === "bottom") setBottomItem(item);
    else if (slot === "footwear") setFootwearItem(item);
    else if (slot === "accessories") setAccessoriesItem(item);
    setSelectedSlot(null);
    setCandidates([]);
  };

  const clearSlot = (slot: Slot) => {
    setSlotItem(slot, null);
  };

  const handleAutoSuggest = async () => {
    setLoadingCandidates(true);
    const categories = ["Western Wear", "Footwear", "Accessories"];
    const { data: suggestions } = await getOutfitSuggestions({
      occasion,
      skinTone,
      categoryIn: categories,
      limit: 15,
    });
    if (suggestions.length >= 3) {
      setTopItem(suggestions.find((x) => x.category === "Western Wear" && (x.sub_category?.toLowerCase().includes("shirt") || x.sub_category?.toLowerCase().includes("kurta"))) ?? suggestions[0]);
      setBottomItem(suggestions.find((x) => x.category === "Western Wear" && (x.sub_category?.toLowerCase().includes("trouser") || x.sub_category?.toLowerCase().includes("jeans"))) ?? suggestions[1]);
      setFootwearItem(suggestions.find((x) => x.category === "Footwear") ?? suggestions[2]);
      setAccessoriesItem(suggestions.find((x) => x.category === "Accessories") ?? null);
    }
    setLoadingCandidates(false);
  };

  const outfitItemIds = [
    topItem?.unique_id,
    bottomItem?.unique_id,
    footwearItem?.unique_id,
    accessoriesItem?.unique_id,
  ].filter(Boolean) as string[];

  const handleSaveOutfit = () => {
    if (outfitItemIds.length === 0) {
      toast.error("कम से कम एक item चुनें");
      return;
    }
    setSaveModalOpen(true);
  };

  const confirmSaveOutfit = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/outfits/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_id: getGuestId(),
          name: saveName.trim() || "My Outfit",
          items: outfitItemIds,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Save failed");
        return;
      }
      toast.success("Outfit saved! ❤️");
      setSaveModalOpen(false);
      setSaveName("My Outfit");
    } catch {
      toast.error("Connection issue. Retry?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-24 md:pb-6">
      <h1 className="text-2xl font-bold text-primary-navy">Outfit Builder</h1>
      <p className="text-neutral-grey">Select top, bottom, footwear & accessories</p>

      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm">Occasion</span>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="rounded border border-neutral-grey/50 px-3 py-1.5 text-sm"
          >
            <option value="Wedding">Wedding</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
            <option value="Party">Party</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-sm">Skin tone</span>
          <select
            value={skinTone}
            onChange={(e) => setSkinTone(e.target.value)}
            className="rounded border border-neutral-grey/50 px-3 py-1.5 text-sm"
          >
            <option value="Fair">Fair</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Medium">Medium</option>
            <option value="Dusky">Dusky</option>
            <option value="Deep">Deep</option>
          </select>
        </label>
        <button
          type="button"
          onClick={handleAutoSuggest}
          disabled={loadingCandidates}
          className="flex items-center gap-2 rounded-xl bg-primary-orange px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:opacity-95 disabled:opacity-50"
        >
          {loadingCandidates ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          Auto-suggest outfit
        </button>
      </div>

      <div className="mt-6">
        <OutfitCanvas
          topItem={topItem}
          bottomItem={bottomItem}
          footwearItem={footwearItem}
          accessoriesItem={accessoriesItem}
          onSelectSlot={loadCandidates}
          selectedSlot={selectedSlot}
          onClearSlot={clearSlot}
        />
      </div>

      {selectedSlot && (
        <div className="mt-8 rounded-2xl border border-black/8 bg-white p-5 shadow-card">
          <h3 className="font-semibold text-neutral-black">Choose {selectedSlot}</h3>
          {loadingCandidates ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary-navy" />
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {candidates.map((item) => (
                <button
                  key={item.unique_id}
                  type="button"
                  onClick={() => setSlotItem(selectedSlot, item)}
                  className="rounded-xl border-2 border-black/10 p-2 text-left transition hover:border-primary-orange hover:shadow-card"
                >
                  <div
                    className="mb-2 h-16 w-full rounded-lg border border-black/10"
                    style={{ backgroundColor: getHexForItem(item) }}
                  />
                  <p className="line-clamp-2 text-xs">{item.sub_category || item.keyword_english}</p>
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => { setSelectedSlot(null); setCandidates([]); }}
            className="mt-3 text-sm text-primary-maroon hover:underline"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={handleSaveOutfit}
          className="flex items-center gap-2 rounded-xl border-2 border-primary-maroon/50 bg-primary-maroon/10 px-4 py-2.5 text-sm font-semibold text-primary-maroon hover:bg-primary-maroon/20"
        >
          <Heart className="h-4 w-4" />
          Save outfit
        </button>
        <button
          type="button"
          onClick={() => {
            if (outfitItemIds.length > 0 && shareUrl) {
              navigator.clipboard.writeText(shareUrl);
              toast.success("Link copied! 📱");
            } else toast.error("Add items first");
          }}
          className="flex items-center gap-2 rounded-xl border-2 border-neutral-black/20 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-black/5"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
        <a
          href={shareUrl ? `https://wa.me/?text=${encodeURIComponent("Check my outfit on RangMatch! " + shareUrl)}` : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:opacity-95"
        >
          WhatsApp share
        </a>
      </div>

      {saveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="save-outfit-title">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-card">
            <h2 id="save-outfit-title" className="text-lg font-bold text-neutral-black">Save outfit</h2>
            <p className="mt-1 text-sm text-neutral-grey">Give this outfit a name</p>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g. Wedding Look"
              className="mt-3 w-full rounded-lg border border-neutral-grey/50 px-3 py-2"
              aria-label="Outfit name"
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => { setSaveModalOpen(false); setSaveName("My Outfit"); }}
                className="flex-1 rounded-lg border border-neutral-grey/50 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSaveOutfit}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary-navy py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
