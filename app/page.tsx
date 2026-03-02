"use client";

import { useState } from "react";
import Link from "next/link";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function HomePage() {
  const { prefs, resetOnboarding } = useOnboarding();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  const onboardingDone = prefs.onboardingComplete;

  return (
    <main className="min-h-screen bg-offwhite px-4 py-6">
      {((!onboardingDone && !onboardingDismissed) || showOnboarding) && (
        <OnboardingFlow
          onComplete={() => {
            setShowOnboarding(false);
            setOnboardingDismissed(true);
          }}
        />
      )}

      <section className="rounded-2xl bg-white p-5 shadow-card">
        <h1 className="text-2xl font-semibold text-maroon-900">RangMatch — Delhi style AI fashion color advisor</h1>
        <p className="mt-2 text-sm text-maroon-700">Tap, match, and save outfit colors in seconds.</p>
        <p className="mt-1 text-xs text-maroon-600">47,000+ Indian men ne apne outfits RangMatch se plan kiye</p>

        <div className="mt-8 grid grid-cols-1 gap-3">
          <Link
            className="touch-feedback rounded-xl bg-maroon-800 px-4 py-3 text-center text-sm font-semibold text-white shadow-glow"
            href="/match"
          >
            Color Match करो
          </Link>
          <Link
            className="touch-feedback rounded-xl border border-maroon-300 px-4 py-3 text-center text-sm font-semibold text-maroon-800"
            href="/best-colors"
          >
            Best Colors देखो
          </Link>
          <Link
            className="touch-feedback rounded-xl border border-maroon-300 px-4 py-3 text-center text-sm font-semibold text-maroon-800"
            href="/blog"
          >
            BLOG
          </Link>
          <button
            type="button"
            className="rounded-xl border border-maroon-300 px-4 py-3 text-sm font-semibold text-maroon-800"
            onClick={() => {
              resetOnboarding();
              setShowOnboarding(true);
              setOnboardingDismissed(false);
            }}
          >
            RESET
          </button>
        </div>
      </section>
    </main>
  );
}
