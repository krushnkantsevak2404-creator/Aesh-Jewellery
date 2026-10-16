import React from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="py-24 bg-[#FCFBF7] min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="relative flex items-center justify-center">
        {/* Spinner rings */}
        <div className="w-14 h-14 rounded-full border-2 border-[#ECE4D8] border-t-[#5C1327] animate-spin" />
        <div className="absolute">
          <Sparkles className="w-5 h-5 text-[#C5A059] animate-pulse" />
        </div>
      </div>
      <p className="font-brand-serif text-sm text-[#4A0E17] font-medium tracking-widest uppercase mt-4">
        SEVAK CREATION
      </p>
      <span className="text-xs text-[#8A8A8A] mt-1">Crafting your festive sparkle...</span>
    </div>
  );
}
