"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SkinTonePicker } from "@/components/SkinTonePicker";
import { BodyTypeSelector } from "@/components/BodyTypeSelector";
import { OCCASIONS } from "@/types/fashion";
import { Loader2, User } from "lucide-react";
import { getGuestId } from "@/lib/guestId";
import { toast } from "sonner";
import type { SavedOutfit } from "@/types/fashion";

type Step = "info" | "skin" | "body" | "style" | "done";

export default function ProfilePage() {
  const [step, setStep] = useState<Step>("info");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skinTone, setSkinTone] = useState<string | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [preferredOccasion, setPreferredOccasion] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const steps: Step[] = ["info", "skin", "body", "style", "done"];
  const stepIndex = steps.indexOf(step);

  useEffect(() => {
    const guestId = getGuestId();
    Promise.all([
      fetch(`/api/profile?guest_id=${encodeURIComponent(guestId)}`).then((r) => r.json()),
      fetch(`/api/outfits?guest_id=${encodeURIComponent(guestId)}`).then((r) => r.json()),
    ]).then(([profileRes, outfitsRes]) => {
      if (profileRes.profile) {
        const p = profileRes.profile;
        if (p.name) setName(p.name);
        if (p.age != null) setAge(String(p.age));
        if (p.skinTone) setSkinTone(p.skinTone);
        if (p.bodyType) setBodyType(p.bodyType);
        if (p.preferredOccasion) setPreferredOccasion(p.preferredOccasion);
      }
      if (outfitsRes.outfits) setSavedOutfits(outfitsRes.outfits);
      setProfileLoaded(true);
    });
  }, []);

  const handleNext = () => {
    const i = stepIndex + 1;
    if (i < steps.length) setStep(steps[i]);
    else {
      setSaving(true);
      const guestId = getGuestId();
      fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_id: guestId,
          name: name || undefined,
          age: age ? parseInt(age, 10) : undefined,
          skinTone: skinTone || undefined,
          bodyType: bodyType || undefined,
          preferredOccasion: preferredOccasion || undefined,
        }),
      })
        .then(async (r) => {
          const json = await r.json();
          if (!r.ok) toast.error(json.error || "Failed to save");
          else toast.success("Profile updated! ✓");
          setStep("done");
          return json;
        })
        .catch(() => toast.error("Failed to save profile"))
        .finally(() => setSaving(false));
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStep(steps[stepIndex - 1]);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-primary-navy">Profile</h1>
      <p className="text-neutral-grey">Set your preferences for better recommendations</p>

      <div className="mt-6 flex gap-2">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded ${
              i <= stepIndex ? "bg-primary-navy" : "bg-neutral-grey/30"
            }`}
            aria-hidden
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-primary-navy/20 bg-white p-6">
        {step === "info" && (
          <>
            <h2 className="font-semibold text-neutral-black">Basic info</h2>
            <label className="mt-4 block">
              <span className="text-sm text-neutral-grey">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-grey/50 px-3 py-2"
                placeholder="Your name"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-sm text-neutral-grey">Age (optional)</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={16}
                max={80}
                className="mt-1 w-full rounded-lg border border-neutral-grey/50 px-3 py-2"
                placeholder="25"
              />
            </label>
          </>
        )}

        {step === "skin" && (
          <>
            <h2 className="font-semibold text-neutral-black">Skin tone / त्वचा का रंग</h2>
            <p className="mt-1 text-sm text-neutral-grey">We use this to suggest colors that suit you.</p>
            <SkinTonePicker value={skinTone} onChange={setSkinTone} className="mt-4" />
          </>
        )}

        {step === "body" && (
          <>
            <h2 className="font-semibold text-neutral-black">Body type</h2>
            <p className="mt-1 text-sm text-neutral-grey">Styling tips will be tailored to your build.</p>
            <BodyTypeSelector value={bodyType} onChange={setBodyType} className="mt-4" />
          </>
        )}

        {step === "style" && (
          <>
            <h2 className="font-semibold text-neutral-black">Preferred occasion / अवसर</h2>
            <p className="mt-1 text-sm text-neutral-grey">Most common occasion you dress for</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ}
                  type="button"
                  onClick={() => setPreferredOccasion(preferredOccasion === occ ? null : occ)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    preferredOccasion === occ ? "bg-primary-navy text-white" : "bg-neutral-grey/20"
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "done" && (
          <div className="text-center">
            <User className="mx-auto h-16 w-16 text-primary-navy" />
            <h2 className="mt-4 font-semibold">Profile saved</h2>
            <p className="mt-1 text-sm text-neutral-grey">
              We&apos;ll use skin tone: {skinTone || "—"}, body type: {bodyType || "—"} for recommendations.
            </p>
          </div>
        )}

        {step !== "done" && (
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={stepIndex === 0}
              className="rounded-lg border border-neutral-grey/50 px-4 py-2 text-sm disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={saving}
              className="rounded-lg bg-primary-navy px-4 py-2 text-sm font-medium text-white hover:bg-primary-navy/90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : step === "style" ? "Save" : "Next"}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-neutral-grey/30 bg-white p-6">
        <h3 className="font-semibold">My wardrobe / Saved outfits</h3>
        <p className="mt-1 text-sm text-neutral-grey">Save outfits from Outfit Builder — they&apos;ll appear here.</p>
        {!profileLoaded ? (
          <div className="mt-4 flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary-navy" />
          </div>
        ) : savedOutfits.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-neutral-grey/50 bg-neutral-cream/50 p-6 text-center">
            <p className="text-sm text-neutral-grey">कोई saved outfit नहीं</p>
            <Link
              href="/outfit-builder"
              className="mt-2 inline-block rounded-lg bg-primary-navy px-4 py-2 text-sm font-medium text-white hover:bg-primary-navy/90"
            >
              Outfit Builder खोलें
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {savedOutfits.map((o) => (
              <li
                key={o.id}
                className="flex items-center justify-between rounded-lg border border-neutral-grey/30 bg-white px-4 py-3"
              >
                <span className="font-medium">{o.name}</span>
                <Link
                  href="/outfit-builder"
                  className="text-sm text-primary-navy hover:underline"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
