// /components/SwipeController/types.ts
export interface SwipeControllerProps {
  currentIndex: number;
  total: number;
  isLocked: boolean;
  onNext: () => void;
  onPrev: () => void;
}
