export interface RecurringLook {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
}

export interface RecurringSection {
  id: string;
  heading: string;
  subheading: string;
  looks: RecurringLook[];
}

export const FALLBACK_RECURRING_SECTIONS: RecurringSection[] = [
  {
    id: "daily-repeat",
    heading: "Daily Repeat-Worthy Looks",
    subheading: "Roz pehne ja sakein, phir bhi premium lagein.",
    looks: [
      {
        id: "daily-1",
        title: "Navy + White Office Smart",
        subtitle: "Crisp shirt, tailored trouser, brown accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=80",
        tag: "Office",
      },
      {
        id: "daily-2",
        title: "Muted Earth Weekend",
        subtitle: "Olive overshirt with beige trouser",
        imageUrl:
          "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=80",
        tag: "Weekend",
      },
      {
        id: "daily-3",
        title: "Monochrome Evening",
        subtitle: "Jet black layering with texture contrast",
        imageUrl:
          "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&w=1200&q=80",
        tag: "Dinner",
      },
    ],
  },
  {
    id: "festive-cycle",
    heading: "Festive Recurring Combos",
    subheading: "Har function me alag lagein, palette same rahe.",
    looks: [
      {
        id: "festive-1",
        title: "Ivory Kurta + Emerald Jacket",
        subtitle: "High-contrast festive classic",
        imageUrl:
          "https://images.unsplash.com/photo-1593032465171-8bd9f5e6a6af?auto=format&fit=crop&w=1200&q=80",
        tag: "Festival",
      },
      {
        id: "festive-2",
        title: "Mehendi Green Story",
        subtitle: "Gold accents + deep neutral bottom",
        imageUrl:
          "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=80",
        tag: "Wedding",
      },
      {
        id: "festive-3",
        title: "Saffron Statement",
        subtitle: "Bold topwear with controlled accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1616486788371-62d930495c44?auto=format&fit=crop&w=1200&q=80",
        tag: "Occasion",
      },
    ],
  },
];
