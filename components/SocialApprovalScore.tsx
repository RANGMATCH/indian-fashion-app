"use client";

import type { SocialApprovalScore as ScoreType } from "@/types/fashion";
import { Heart, Users, Briefcase, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX = 5;
const LABELS: Record<string, { icon: typeof Heart; label: string }> = {
  family: { icon: Heart, label: "Family" },
  friends: { icon: Users, label: "Friends" },
  professional: { icon: Briefcase, label: "Professional" },
  dating: { icon: Smile, label: "Dating" },
};

interface SocialApprovalScoreProps {
  score: ScoreType | null | undefined;
  className?: string;
}

function StarRow({ value, Icon, label }: { value: number; Icon: typeof Heart; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 shrink-0 text-primary-maroon" />
      <span className="w-20 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: MAX }, (_, i) => (
          <span
            key={i}
            className={cn(
              "text-sm",
              i < value ? "text-accent-gold" : "text-neutral-grey/40"
            )}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-neutral-grey">{value}/{MAX}</span>
    </div>
  );
}

export function SocialApprovalScore({ score, className }: SocialApprovalScoreProps) {
  if (!score || typeof score !== "object") return null;

  const entries = Object.entries(LABELS)
    .map(([key, { icon, label }]) => ({
      key,
      Icon: icon,
      label,
      value: Number(score[key as keyof ScoreType]) || 0,
    }));

  return (
    <div className={cn("space-y-1", className)} title="Social approval prediction">
      {entries.map(({ key, Icon, label, value }) => (
        <StarRow key={key} value={value} Icon={Icon} label={label} />
      ))}
    </div>
  );
}
