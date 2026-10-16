import React from "react";
import Image from "next/image";
import { ExternalLink, Heart } from "lucide-react";
import InstagramIcon from "../ui/InstagramIcon";
import { defaultSiteConfig } from "../../lib/config/siteConfig";

const instagramShowcase = [
  {
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    caption: "Peacock oxidized drops ready for Day 1 Garba! ✨ #SevakCreation #NavratriLook",
    likes: "428",
  },
  {
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    caption: "Hasli chokers layered with hand sets. Festive royalty at student prices. 👑",
    likes: "592",
  },
  {
    image: "https://images.unsplash.com/photo-1611591475152-4735230d095b?q=80&w=800&auto=format&fit=crop",
    caption: "Mirror haathphool that glimmers with every step of Raas Garba. 🪞💃",
    likes: "681",
  },
  {
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    caption: "The Shaadi & Diwali edit is now live on our website! #IndianJewellery",
    likes: "374",
  },
  {
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=800&auto=format&fit=crop",
    caption: "Surya cocktail rings for effortless everyday boho charm. ☀️",
    likes: "419",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F8F4EC] border-t border-[#ECE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE6DA] text-[#5C1327] text-xs font-semibold uppercase tracking-wider mb-2">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@{defaultSiteConfig.contact.instagramHandle}</span>
          </div>
          <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1">
            Follow the Sevak Creation Style
          </h2>
          <p className="text-xs sm:text-sm text-[#666] mt-1.5">
            Join our growing community on Instagram for customer styling reels, festive previews, and behind-the-scenes packing stories.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {instagramShowcase.map((post, idx) => (
            <a
              key={idx}
              href={defaultSiteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#ECE4D8] shadow-2xs block"
            >
              <Image
                src={post.image}
                alt="Sevak Creation Instagram Style Showcase"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Hover overlay with Instagram icon & caption */}
              <div className="absolute inset-0 bg-[#4A0E17]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex items-center justify-between text-xs">
                  <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
                  <span className="flex items-center gap-1 text-[11px] font-medium">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    {post.likes}
                  </span>
                </div>
                <p className="text-[11px] text-amber-100/90 line-clamp-3 leading-snug">
                  {post.caption}
                </p>
                <div className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold flex items-center gap-1">
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={defaultSiteConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-widest shadow-md transition hover:-translate-y-0.5"
          >
            <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
            <span>FOLLOW US ON INSTAGRAM</span>
          </a>
        </div>
      </div>
    </section>
  );
}
