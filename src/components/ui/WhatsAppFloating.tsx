"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Namaste Sevak Creation! ✨ I am looking for jewellery recommendations and have a question."
  );

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end gap-3 group">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#FCFBF7] text-[#1F1F1F] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#E8DFD0] mb-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="font-medium">Need styling help? Chat with us on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#999] hover:text-[#333] p-0.5 rounded-full"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Chat on WhatsApp"
        title="Chat with Sevak Creation on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </div>
  );
}
