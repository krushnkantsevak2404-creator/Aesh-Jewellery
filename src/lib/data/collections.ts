import { SeasonalCollection } from "../types";

export const seasonalCollections: SeasonalCollection[] = [
  {
    id: "col-navratri",
    name: "The Navratri Edit",
    slug: "navratri",
    tagline: "Make Every Garba Night Count",
    description:
      "Handcrafted oxidized silver jewellery, resonant ghungroo accents, and artisan mirror work crafted to sparkle under the festive lights of Navratri.",
    bannerImage:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1600&auto=format&fit=crop",
    badgeText: "Festive Spotlight",
    accentColor: "#5C1327",
    isActive: true,
    isFeatured: true,
    curatedCategories: ["earrings", "ked-kandoro", "hand-sets", "necklaces", "bracelets"],
  },
  {
    id: "col-diwali",
    name: "The Diwali Radiance Edit",
    slug: "diwali",
    tagline: "Golden Glow & Festive Opulence",
    description:
      "Lustrous warm-gold finishes, intricate kundan craftsmanship, and sparkling stone adornments curated for Diwali pujas, family reunions, and festive soirees.",
    bannerImage:
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1600&auto=format&fit=crop",
    badgeText: "Deepavali Special",
    accentColor: "#C5A059",
    isActive: false,
    isFeatured: true,
    curatedCategories: ["jewellery-sets", "necklaces", "earrings", "bangles"],
  },
  {
    id: "col-wedding",
    name: "The Royal Wedding Edit",
    slug: "wedding-season",
    tagline: "Timeless Elegance for Bridesmaid & Guests",
    description:
      "Majestic choker sets, royal haathphool, and statement earrings crafted for Sangeet dances, Mehendi afternoons, and grand wedding receptions.",
    bannerImage:
      "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1600&auto=format&fit=crop",
    badgeText: "Shaadi Season",
    accentColor: "#4A0E17",
    isActive: false,
    isFeatured: true,
    curatedCategories: ["jewellery-sets", "hand-sets", "necklaces", "festive-accessories"],
  },
  {
    id: "col-raksha-bandhan",
    name: "The Rakhi Gift Edit",
    slug: "raksha-bandhan",
    tagline: "Thoughtful Jewellery for Loving Sisters",
    description:
      "Delicate earrings, timeless charm bracelets, and customizable jewellery hampers packaged with love to celebrate the bond of sibling protection and affection.",
    bannerImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop",
    badgeText: "Gift of Love",
    accentColor: "#D99B9B",
    isActive: false,
    isFeatured: true,
    curatedCategories: ["bracelets", "earrings", "rings"],
  },
  {
    id: "col-everyday",
    name: "Everyday Sparkle",
    slug: "everyday",
    tagline: "Effortless Minimalist Adornments",
    description:
      "Feather-light studs, anti-tarnish everyday pendants, and stackable rings designed for college lectures, office desk styling, and casual cafe dates.",
    bannerImage:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1600&auto=format&fit=crop",
    badgeText: "Daily Essentials",
    accentColor: "#2C2C2E",
    isActive: false,
    isFeatured: true,
    curatedCategories: ["earrings", "rings", "bracelets", "necklaces"],
  },
];
