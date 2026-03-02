export interface TrendingCombo {
  id: string;
  name: string;
  nameHi: string;
  occasion: string;
  occasionHi: string;
  colors: {
    shirt: string;
    trouser: string;
    shoes: string;
    belt: string;
  };
  garments: {
    shirt: string;
    trouser: string;
    shoes: string;
    belt: string;
  };
  chatIntro: string;
  skinTones: string[];
  likes: number;
}

export const TRENDING_COMBOS: TrendingCombo[] = [
  {
    id: "tc1",
    name: "The Power Meeting",
    nameHi: "पावर मीटिंग लुक",
    occasion: "formal",
    occasionHi: "फॉर्मल",
    colors: { shirt: "#F5F0EB", trouser: "#1A237E", shoes: "#111827", belt: "#111827" },
    garments: { shirt: "formal_shirt", trouser: "trouser", shoes: "chelsea_shoes", belt: "belt" },
    chatIntro: "Waah! Ivory shirt + Navy trouser + Black shoes. Bahut professional lagega! 💼",
    skinTones: ["fair", "medium", "wheatish", "dusky", "deep"],
    likes: 12400,
  },
  {
    id: "tc2",
    name: "Delhi Street King",
    nameHi: "दिल्ली स्ट्रीट किंग",
    occasion: "casual",
    occasionHi: "कैजुअल",
    colors: { shirt: "#C62828", trouser: "#111827", shoes: "#F5F0EB", belt: "#4E342E" },
    garments: { shirt: "polo_shirt", trouser: "jeans", shoes: "sneakers", belt: "belt" },
    chatIntro: "Lal polo + Black jeans + White sneakers — Delhi street ke liye fire combo! 🔥",
    skinTones: ["wheatish", "dusky", "deep"],
    likes: 9800,
  },
  {
    id: "tc3",
    name: "Shaadi Season Hero",
    nameHi: "शादी सीज़न हीरो",
    occasion: "wedding",
    occasionHi: "शादी",
    colors: { shirt: "#F9A825", trouser: "#4E342E", shoes: "#4E342E", belt: "#F9A825" },
    garments: { shirt: "kurta", trouser: "trouser", shoes: "chelsea_shoes", belt: "belt" },
    chatIntro: "Haldi kurta + Chocolate trouser — shaadi season mein compliments pakke! 🎊",
    skinTones: ["fair", "medium", "wheatish"],
    likes: 18700,
  },
  {
    id: "tc4",
    name: "Office Smart Casual",
    nameHi: "ऑफिस स्मार्ट कैजुअल",
    occasion: "office",
    occasionHi: "ऑफिस",
    colors: { shirt: "#B3E5FC", trouser: "#374151", shoes: "#111827", belt: "#111827" },
    garments: { shirt: "formal_shirt", trouser: "trouser", shoes: "chelsea_shoes", belt: "belt" },
    chatIntro: "Sky blue shirt + charcoal trouser gives clean and smart weekday vibe.",
    skinTones: ["fair", "medium", "wheatish", "dusky"],
    likes: 8400,
  },
  {
    id: "tc5",
    name: "Festival Royal",
    nameHi: "फेस्टिवल रॉयल",
    occasion: "festival",
    occasionHi: "त्योहार",
    colors: { shirt: "#7B1C2B", trouser: "#F5F0EB", shoes: "#4E342E", belt: "#4E342E" },
    garments: { shirt: "kurta", trouser: "trouser", shoes: "chelsea_shoes", belt: "belt" },
    chatIntro: "Deep maroon + ivory is timeless festive elegance with Indian touch.",
    skinTones: ["fair", "medium", "wheatish", "dusky", "deep"],
    likes: 16300,
  },
  {
    id: "tc6",
    name: "Date Night Sharp",
    nameHi: "डेट नाइट शार्प",
    occasion: "date",
    occasionHi: "डेट",
    colors: { shirt: "#111827", trouser: "#D6C6B8", shoes: "#4E342E", belt: "#4E342E" },
    garments: { shirt: "polo_shirt", trouser: "trouser", shoes: "chelsea_shoes", belt: "belt" },
    chatIntro: "Black shirt + beige trouser gives confident and classy date-night look.",
    skinTones: ["medium", "wheatish", "dusky", "deep"],
    likes: 9100,
  },
];
