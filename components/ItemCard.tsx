"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FashionItem } from "@/types/fashion";
import { ConfidenceIndicator } from "./ConfidenceIndicator";
import { SocialApprovalScore } from "./SocialApprovalScore";
import { getHexForItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: FashionItem;
  showSocialScore?: boolean;
  compact?: boolean;
  className?: string;
}

export function ItemCard({
  item,
  showSocialScore = false,
  compact = false,
  className,
}: ItemCardProps) {
  const hex = getHexForItem(item);
  const title = item.keyword_hindi || item.keyword_english || item.sub_category || "Item";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className={cn(
        "overflow-hidden rounded-2xl border border-neutral-grey/20 bg-white shadow-card transition-shadow duration-200 hover:shadow-lg hover:border-primary-orange/30",
        compact ? "p-2" : "p-4",
        className
      )}
    >
      <div
        className="mb-3 h-28 w-full rounded-xl border border-black/5"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-neutral-grey" title="Color">
          {hex}
        </span>
        {item.color_family && (
          <span className="rounded bg-neutral-grey/20 px-2 py-0.5 text-xs">
            {item.color_family}
          </span>
        )}
      </div>

      <h3 className="mt-2 font-medium text-neutral-black line-clamp-2">
        <span className="font-hindi">{item.keyword_hindi || ""}</span>
        {(item.keyword_hindi && item.keyword_english) ? " · " : ""}
        <span>{item.keyword_english || item.sub_category || ""}</span>
      </h3>

      {item.sub_category && (
        <p className="mt-1 text-sm text-neutral-grey">{item.sub_category}</p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {item.skin_tone && (
          <span className="text-xs text-neutral-grey">Skin: {item.skin_tone}</span>
        )}
        <ConfidenceIndicator level={item.confidence_level} showHindi={false} size="sm" />
      </div>

      {showSocialScore && item.social_approval_score && (
        <div className="mt-3 border-t border-neutral-grey/20 pt-2">
          <SocialApprovalScore score={item.social_approval_score} />
        </div>
      )}

      {item.solves_problem && (
        <p className="mt-1 text-xs text-accent-olive">Problem solved: {item.solves_problem}</p>
      )}
      {item.body_type_hack && (
        <p className="mt-2 text-xs text-primary-maroon line-clamp-2 font-hindi">
          {item.body_type_hack}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={`/items/${encodeURIComponent(item.unique_id)}`}
          className="rounded-xl border-2 border-primary-navy/30 px-4 py-2 text-sm font-medium text-primary-navy hover:bg-primary-navy/10"
        >
          View
        </Link>
        <Link
          href={`/search?q=${encodeURIComponent(item.keyword_english || item.sub_category || item.unique_id)}`}
          className="rounded-xl bg-primary-orange px-4 py-2 text-sm font-semibold text-white shadow-card hover:opacity-95"
        >
          Get Outfit
        </Link>
        <button
          type="button"
          className="rounded-xl border-2 border-neutral-grey/30 px-4 py-2 text-sm font-medium hover:border-primary-orange/50 hover:bg-primary-orange/5"
          aria-label="Save / Favorite"
          title="Save / Favorite"
        >
          Save / Favorite
        </button>
      </div>
    </motion.article>
  );
}
