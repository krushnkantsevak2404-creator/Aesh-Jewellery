"use client";

import React, { useState } from "react";
import { Mail, MessageCircle, Check, ArrowRight, Sparkles } from "lucide-react";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

export default function NewsletterWhatsApp() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Sevak Creation! ✨ I would like to subscribe to festive drop alerts on WhatsApp."
  );

  return (
    <section className="py-16 sm:py-24 bg-[#4A0E17] text-white relative overflow-hidden">
      {/* Decorative Warm Luxury Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#5C1327] blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#C5A059] blur-3xl opacity-15" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#5C1327] border border-[#C5A059]/40 text-[#E5C46B] text-xs font-bold tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP Festive Circle</span>
        </div>

        <h2 className="font-brand-serif text-3xl sm:text-5xl font-normal text-white mb-4">
          Don&apos;t Miss the Next Drop
        </h2>

        <p className="text-sm sm:text-base text-[#E5DCD0] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Be the first to explore limited-edition Garba jewelry releases, festive Diwali collections, and subscriber-only flash discounts.
        </p>

        {/* Email Signup Form */}
        <div className="max-w-md mx-auto mb-8">
          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Thank you for joining Sevak Creation! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[#A89E9B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-hidden focus:border-[#C5A059] transition"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>JOIN US</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* WhatsApp Direct Connect Option */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#E5DCD0]">
          <span>Prefer updates on your phone?</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold transition border border-emerald-500/30 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join WhatsApp VIP Broadcast</span>
          </a>
        </div>
      </div>
    </section>
  );
}
