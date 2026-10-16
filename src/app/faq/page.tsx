"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    category: "Orders & Shipping",
    question: "How long does delivery take across India?",
    answer:
      "All orders are dispatched from our studio in Ahmedabad, Gujarat within 24–48 hours. Delivery takes 3 to 5 business days for major metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) and 4 to 7 business days for other regional locations.",
  },
  {
    category: "Orders & Shipping",
    question: "Do you offer Free Shipping?",
    answer:
      "Yes! Free Express Shipping is automatically applied to all orders above ₹999 anywhere in India. For orders below ₹999, a nominal flat shipping fee of ₹70 is applied at checkout.",
  },
  {
    category: "Orders & Shipping",
    question: "Can I order for urgent Navratri or wedding dates?",
    answer:
      "Yes! If your Garba night or wedding function is in less than 4 days, please send us a direct message on WhatsApp immediately after placing your order so we can prioritize priority dispatch via air express.",
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major Indian payment methods: UPI (Google Pay, PhonePe, Paytm, BHIM), Debit & Credit Cards (Visa, RuPay, Mastercard), Net Banking, and Cash on Delivery (COD).",
  },
  {
    category: "Jewellery Care",
    question: "How should I store and care for oxidized jewellery?",
    answer:
      "The antique silver tone on oxidized pieces is a deliberate artistic finish. Always follow the 'Last On, First Off' rule: wear your jewellery after hairspray, perfume, and lotion have dried. Store each piece in the airtight zip pouch provided by Sevak Creation, and keep away from water and direct sunlight.",
  },
  {
    category: "Jewellery Care",
    question: "Will the oxidized jewellery turn my skin black?",
    answer:
      "No! All Sevak Creation ornaments are crafted from skin-friendly lead-free alloys and coated with a protective lacquer barrier that prevents discoloration and ensures comfortable dancing all night.",
  },
  {
    category: "Returns & Exchanges",
    question: "What is your return or replacement policy?",
    answer:
      "Because jewellery is a personal hygiene and fashion category, we do not accept general returns for remorse. However, if any piece arrives damaged, broken, or with missing stones, we provide an immediate free replacement or store credit! An unboxing video recorded from the sealed parcel is required.",
  },
  {
    category: "Custom & Wholesale",
    question: "Can I order jewellery in bulk for Garba groups or bridesmaid gifts?",
    answer:
      "Yes, absolutely! We love curating matching sets for Garba dance troupes, sangeet performances, and bridesmaid hampers. Please connect with Kishan & Aesha directly on WhatsApp for group pricing and customization.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Orders & Shipping", "Payments", "Jewellery Care", "Returns & Exchanges"];

  const filteredFaqs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Kishan & Aesha! I have a question not covered in your FAQ."
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3 border border-[#ECE4D8]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers & Guidance</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mb-3">
            Frequently Asked Questions
          </h1>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#666]">
            Everything you need to know about placing orders, shipping timelines, care guides, and festive jewellery.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === c
                  ? "bg-[#5C1327] text-white shadow-xs"
                  : "bg-[#FAF6F0] text-[#4A4A4A] hover:bg-[#F3ECE1] border border-[#ECE4D8]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#ECE4D8] overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-[#1F1F1F] flex items-center justify-between gap-4 hover:bg-[#FAF6F0]"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C5A059] shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-[#5C1327]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs text-[#555] leading-relaxed border-t border-[#F5EFE6] bg-[#FAF6F0]/40">
                    <p className="mt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#FAF6F0] border border-[#ECE4D8] text-center space-y-3">
          <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F]">
            Still have questions?
          </h3>
          <p className="text-xs text-[#666] max-w-md mx-auto">
            Kishan and Aesha are always ready to answer sizing questions, Garba matching advice, or order inquiries directly on WhatsApp.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Founders on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
