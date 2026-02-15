"use client";

import { BODY_TYPES } from "@/types/fashion";
import { cn } from "@/lib/utils";

interface BodyTypeSelectorProps {
  value: string | null;
  onChange: (bodyType: string) => void;
  className?: string;
}

export function BodyTypeSelector({ value, onChange, className }: BodyTypeSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium text-neutral-black">Body Type</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {BODY_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={cn(
              "rounded-lg border-2 px-3 py-2 text-left text-sm transition",
              value === type
                ? "border-primary-navy bg-primary-navy/10"
                : "border-neutral-grey/30 hover:border-primary-navy/50"
            )}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}
