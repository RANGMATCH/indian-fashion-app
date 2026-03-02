export type UserBehavior = "indecisive" | "explorer" | "decisive" | "helpNeeded" | "returning" | "firstTime";

export function detectBehavior(params: {
  colorChanges: number;
  slotsVisited: number;
  timeOnSlot: number;
  hasTyped: boolean;
  isReturning: boolean;
}): UserBehavior {
  if (params.isReturning) return "returning";
  if (params.hasTyped) return "helpNeeded";
  if (params.colorChanges >= 5) return "indecisive";
  if (params.slotsVisited >= 4) return "explorer";
  if (params.timeOnSlot < 10000) return "decisive";
  return "firstTime";
}

export const BEHAVIOR_RESPONSES: Record<UserBehavior, string[]> = {
  indecisive: [
    "Bahut options hain, confuse ho gaye? Chalo skin tone ke hisaab se top 3 suggest karta hoon — ek tap karo.",
    "Rangon mein ghum gaye? Koi scene nahi — maroon aur navy classic combo hai, ab try karo.",
  ],
  explorer: [
    "Wah, saare slots explore kar liye! Ab ready-made combo lagata hoon — apply karo.",
    "Aap toh fashion explorer nikle! Ab best match pick karo aur next dekho.",
  ],
  decisive: [
    "Perfect quick choice! Aapka fashion sense solid hai — next color tap karo.",
    "Fast decision, smart decision! Ab shoes ya belt set karo.",
  ],
  helpNeeded: [
    "Bilkul, main personal stylist hoon. Ek sawal bhejo aur seedha answer lo.",
    "Haan ji samajh gaya! Main direct combo suggest karta hoon — apply karo.",
  ],
  returning: [
    "Welcome back! Pichli vibe yaad hai — aaj ek naya combo try karein, tap karo.",
    "Wapas aaye, badhiya! Aaj ka OOTD set karte hain — next dekho.",
  ],
  firstTime: [
    "Namaste! Main aapka Hinglish fashion advisor hoon. Pehle shirt ka rang choose karo.",
    "Swagat hai RangMatch mein! 2 minute mein outfit ready karte hain — tap karo.",
  ],
};
