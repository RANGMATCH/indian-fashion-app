"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function GalleryItemModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-2xl bg-white p-4"
      >
        <h2 className="text-sm font-semibold text-maroon-900">Intercepted Modal Item #{params.id}</h2>
        <p className="mt-1 text-xs text-maroon-700">Yeh Next.js parallel + intercepting route modal demo hai.</p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-3 min-h-[42px] rounded-full bg-maroon-800 px-4 text-xs font-semibold text-white"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
