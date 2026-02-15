"use client";

import { cn } from "@/lib/utils";

/** Per prompt: Safe = ✅ शुरुआत के लिए perfect, Moderate = ⚡ Stylish but acceptable, Bold = 🔥 Fashion-forward */
const LABELS: Record<string, { short: string; emoji: string; hindi: string; color: string }> = {
  Safe: {
    short: "Safe",
    emoji: "✅",
    hindi: "शुरुआत के लिए perfect",
    color: "bg-status-success text-white",
  },
  Moderate: {
    short: "Moderate",
    emoji: "⚡",
    hindi: "Stylish but acceptable",
    color: "bg-status-warning text-neutral-black",
  },
  Bold: {
    short: "Bold",
    emoji: "🔥",
    hindi: "Fashion-forward",
    color: "bg-primary-maroon text-white",
  },
};

interface ConfidenceIndicatorProps {
  level: string | null | undefined;
  showHindi?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function ConfidenceIndicator({
  level,
  showHindi = true,
  size = "md",
  className,
}: ConfidenceIndicatorProps) {
  if (!level) return null;
  const config = LABELS[level] ?? {
    short: level,
    emoji: "",
    hindi: "",
    color: "bg-neutral-grey text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm",
        config.color,
        className
      )}
      title={showHindi ? config.hindi : config.short}
    >
      {"emoji" in config && config.emoji && <span className="mr-1">{config.emoji}</span>}
      {config.short}
      {showHindi && config.hindi && (
        <span className="ml-1 font-hindi opacity-90" title={config.hindi}>
          ({config.hindi})
        </span>
      )}
    </span>
  );
}
