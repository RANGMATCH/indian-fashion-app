"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { MemoryRouter, Link, Route, Routes } from "react-router-dom";
import { Boxes, Cloud, CloudRain, Cpu, RouteIcon } from "lucide-react";
import { setTechModalOpen } from "@/lib/store/uiSlice";
import type { RootState } from "@/lib/store";
import styles from "./TechLab.module.css";

const profileSchema = z.object({
  skinTone: z.string().min(2),
  occasion: z.string().min(2),
  weather: z.string().min(2),
});

type ProfileInput = z.infer<typeof profileSchema>;

interface SduiPayload {
  sections: Array<{ type: string; title?: string; subtitle?: string; label?: string; items?: string[] }>;
}

export function TechLab() {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state: RootState) => state.ui.techModalOpen);
  const [headlessOpen, setHeadlessOpen] = useState(false);
  const [steps, setSteps] = useState<string[]>(["Skin tone locked", "Occasion locked"]);
  const [schema, setSchema] = useState<SduiPayload | null>(null);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { skinTone: "", occasion: "", weather: "" },
  });

  useEffect(() => {
    fetch("/api/sdui")
      .then((r) => r.json())
      .then((data) => setSchema(data as SduiPayload))
      .catch(() => setSchema(null));
  }, []);

  const platformChips = useMemo(
    () => ["Next App Router", "Redux", "React Hook Form + Zod", "Radix + Headless UI", "SDUI", "API-first"],
    []
  );

  return (
    <section className="mx-auto mt-4 grid max-w-md gap-3">
      <div className={`${styles.surfaceCard} p-3`}>
        <div className="mb-2 flex items-center gap-2 text-maroon-900">
          <Cpu className="h-4 w-4" />
          <h2 className="text-xs font-semibold">Technology Lab</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {platformChips.map((chip) => (
            <span key={chip} className={styles.chip}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className={`${styles.surfaceCard} p-3`}>
        <p className="mb-2 text-xs font-semibold text-maroon-900">Radix Dialog + Framer Motion + RHF + Zod</p>
        <Dialog.Root open={modalOpen} onOpenChange={(v) => dispatch(setTechModalOpen(v))}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="touch-feedback min-h-[44px] rounded-full bg-maroon-800 px-4 text-xs font-semibold text-white"
            >
              Open Smart Form
            </button>
          </Dialog.Trigger>
          <AnimatePresence>
            {modalOpen ? (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/45"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4"
                  >
                    <Dialog.Title className="text-xs font-semibold text-maroon-900">Mandatory Profile Form</Dialog.Title>
                    <form
                      className="mt-3 grid gap-2"
                      onSubmit={form.handleSubmit((v) => {
                        setSteps((prev) => [...prev, `Weather: ${v.weather}`]);
                        dispatch(setTechModalOpen(false));
                      })}
                    >
                      <input
                        {...form.register("skinTone")}
                        placeholder="Skin tone"
                        className="min-h-[40px] rounded-lg border border-maroon-200 px-2 text-xs"
                      />
                      <input
                        {...form.register("occasion")}
                        placeholder="Occasion"
                        className="min-h-[40px] rounded-lg border border-maroon-200 px-2 text-xs"
                      />
                      <input
                        {...form.register("weather")}
                        placeholder="Weather"
                        className="min-h-[40px] rounded-lg border border-maroon-200 px-2 text-xs"
                      />
                      <button type="submit" className="min-h-[42px] rounded-full bg-maroon-800 text-xs font-semibold text-white">
                        Save And Continue
                      </button>
                    </form>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            ) : null}
          </AnimatePresence>
        </Dialog.Root>
      </div>

      <div className={`${styles.surfaceCard} p-3`}>
        <p className="mb-2 text-xs font-semibold text-maroon-900">Headless UI Modal (alternative)</p>
        <button
          type="button"
          onClick={() => setHeadlessOpen(true)}
          className="touch-feedback min-h-[44px] rounded-full border border-maroon-300 px-4 text-xs font-semibold text-maroon-900"
        >
          Open Alternate Modal
        </button>
        <HeadlessDialog open={headlessOpen} onClose={setHeadlessOpen} as={Fragment}>
          <div className="fixed inset-0 z-50 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <HeadlessDialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-4">
              <HeadlessDialog.Title className="text-xs font-semibold text-maroon-900">Headless UI Active</HeadlessDialog.Title>
              <p className="mt-1 text-xs text-maroon-700">Accessible dialog stack ready.</p>
              <button
                type="button"
                onClick={() => setHeadlessOpen(false)}
                className="mt-3 min-h-[40px] rounded-full bg-maroon-800 px-4 text-xs text-white"
              >
                Close
              </button>
            </HeadlessDialog.Panel>
          </div>
        </HeadlessDialog>
      </div>

      <div className={`${styles.surfaceCard} p-3`}>
        <p className="mb-2 text-xs font-semibold text-maroon-900">React Router (MemoryRouter isolated demo)</p>
        <MemoryRouter initialEntries={["/step-a"]}>
          <div className="flex gap-2 text-xs text-maroon-800">
            <Link to="/step-a">Step A</Link>
            <Link to="/step-b">Step B</Link>
          </div>
          <Routes>
            <Route path="/step-a" element={<p className="mt-2 text-xs">Router A: Pick skin + occasion.</p>} />
            <Route path="/step-b" element={<p className="mt-2 text-xs">Router B: Weather + final CTA.</p>} />
          </Routes>
        </MemoryRouter>
      </div>

      <div className={`${styles.surfaceCard} p-3`}>
        <p className="mb-2 text-xs font-semibold text-maroon-900">React Transition Group</p>
        <TransitionGroup component="ul" className="space-y-1">
          {steps.map((step) => (
            <CSSTransition key={step} timeout={180} classNames="fade">
              <li className="rounded-lg bg-maroon-50 px-2 py-1 text-xs text-maroon-900">{step}</li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      <div className={`${styles.surfaceCard} p-3`}>
        <div className="mb-2 flex items-center gap-2 text-maroon-900">
          <RouteIcon className="h-4 w-4" />
          <p className="text-xs font-semibold">SDUI + API-first + Cloud-ready</p>
        </div>
        {schema?.sections?.map((s, idx) => (
          <div key={`${s.type}-${idx}`} className="mb-2 rounded-lg bg-maroon-50 px-2 py-1 text-xs text-maroon-800">
            {s.title || s.label || s.items?.join(" · ")}
          </div>
        ))}
        <div className="mt-2 flex items-center gap-2 text-[11px] text-maroon-700">
          <Cloud className="h-3.5 w-3.5" />
          <CloudRain className="h-3.5 w-3.5" />
          <Boxes className="h-3.5 w-3.5" />
          AWS/Azure/AEM/Java/KMM adapters via API contracts ready.
        </div>
      </div>
    </section>
  );
}
