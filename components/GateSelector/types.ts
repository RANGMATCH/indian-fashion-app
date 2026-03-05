// /components/GateSelector/types.ts
import { SkinToneId, WeatherId, OccasionId, GateState } from "@/lib/rangmatch/types";

export interface GateSelectorProps {
  gate: GateState;
  onSkinToneSelect: (id: SkinToneId) => void;
  onWeatherSelect: (id: WeatherId) => void;
  onOccasionSelect: (id: OccasionId) => void;
}
