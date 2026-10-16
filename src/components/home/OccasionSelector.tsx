import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface OccasionCard {
  title: string;
  tagline: string;
  slug: string;
  link: string;
  badge: string;
  image: string;
}

const occasions: OccasionCard[] = [
  {
    title: "Navratri Garba Nights",
    tagline: "Authentic oxidized earrings, chokers & chime kandoros",
    slug: "navratri",
    link: "/collections/navratri",
    badge: "Festive Edit",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Diwali Celebrations",
    tagline: "Golden shimmer, kundan glass & festive sparkle",
    slug: "diwali",
    link: "/collections/diwali",
    badge: "Royal Radiance",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Wedding & Shaadi",
    tagline: "Statement choker sets, haathphool & cocktail rings",
    slug: "wedding",
    link: "/collections/wedding-season",
    badge: "Heirloom Elegance",
    image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Raksha Bandhan & Gifting",
    tagline: "Heartfelt gifts packaged with love for sisters",
    slug: "gifting",
    link: "/collections/raksha-bandhan",
    badge: "Thoughtful Gifts",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Everyday College & Office",
    tagline: "Feather-light studs, anti-tarnish pendants & kadas",
    slug: "everyday",
    link: "/collections/everyday",
    badge: "Daily Sparkle",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Festive Soirées",
    tagline: "Contemporary fusion jewellery for family gatherings",
    slug: "festive",
    link: "/shop?occasion=festive",
    badge: "Celebration Must-Haves",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function OccasionSelector() {
  return (
    <section className="py-16 sm:py-24 bg-[#F8F4EC] border-y border-[#ECE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Moments That Matter
            </span>
            <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-2">
              Shop by Occasion
            </h2>
            <p className="text-sm text-[#666] mt-1 max-w-xl">
              Whatever the celebration, discover handcrafted ornaments curated to complement your outfit and festive spirit.
            </p>
          </div>

          <Link
            href="/collections"
            className="text-xs font-bold text-[#5C1327] hover:text-[#4A0E17] uppercase tracking-wider flex items-center gap-1 group self-start md:self-auto"
          >
            <span>All Occasion Edits</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-6 border border-[#E0D5C3]"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1F1417]/95 via-[#2E181D]/60 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Card Badge */}
              <div className="relative z-10 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-[#5C1327]/85 border border-[#C5A059]/40 text-[#E5C46B] text-[10px] uppercase font-bold tracking-widest backdrop-blur-xs">
                  {item.badge}
                </span>
              </div>

              {/* Card Text */}
              <div className="relative z-10">
                <h3 className="font-brand-serif text-2xl font-bold text-white group-hover:text-[#F3ECE1] transition">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D8CEBE] mt-1.5 line-clamp-2 leading-relaxed">
                  {item.tagline}
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-[#E5C46B] group-hover:text-white transition">
                  <span>Explore Edit</span>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#C5A059] group-hover:text-[#1F1F1F] flex items-center justify-center transition">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
