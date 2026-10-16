"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, Copy, Check } from "lucide-react";
import { defaultSiteConfig } from "../../lib/config/siteConfig";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText("SEVAK10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside aria-label="Special announcements and offers" className="bg-[#4A0E17] text-amber-100 text-xs py-2 px-3 sm:px-4 border-b border-[#731B34] relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center text-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            <span>{defaultSiteConfig.announcementBar.text}</span>
          </span>
          <span className="hidden sm:inline text-amber-200/60">•</span>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#5C1327] hover:bg-[#731B34] border border-[#C5A059]/40 text-[#FAF7F2] font-semibold text-[11px] transition cursor-pointer"
            title="Click to copy coupon"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-[#C5A059]" />
                <span>CODE: SEVAK10 (10% OFF)</span>
              </>
            )}
          </button>
          <Link
            href="/shop"
            className="underline underline-offset-2 hover:text-[#C5A059] text-[11px] hidden md:inline ml-1 font-medium transition"
          >
            Shop Now →
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-amber-200/60 hover:text-amber-100 p-1 -mr-1 rounded hover:bg-white/10 transition"
          aria-label="Close announcement bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
