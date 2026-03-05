// /components/PreviewSection/types.ts
import { PreviewState } from "@/lib/rangmatch/types";

export interface PreviewSectionProps {
  preview: PreviewState;
  onReset: () => void;
}
