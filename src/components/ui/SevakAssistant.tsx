"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  X,
  Send,
  ShoppingBag,
  Minimize2,
  Check,
  Bot,
  MessageCircle,
} from "lucide-react";
import { processAssistantQuery, AssistantMessage } from "../../lib/ai-assistant";
import { useCart } from "../../context/CartContext";
import { useStore } from "../../context/StoreContext";
import { formatINR, generateWhatsAppLink } from "../../lib/utils";
import { defaultSiteConfig } from "../../lib/config/siteConfig";

export default function SevakAssistant() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "intro-1",
      sender: "assistant",
      text: "Namaste! 🙏 Welcome to Sevak Creation. I'm your **Sevak Assistant** — here to help you discover the perfect jewellery for Navratri, weddings, or everyday styling. How can I help you sparkle today?",
      timestamp: "Just now",
      actionChips: [
        { label: "✨ Navratri Specials", action: "QUERY:Navratri collection" },
        { label: "💰 Under ₹500", action: "QUERY:jewellery under 500" },
        { label: "🎁 Gifts for Sister", action: "QUERY:gift for sister" },
        { label: "📦 Delivery Time", action: "QUERY:how many days for delivery" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: AssistantMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend.trim(),
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInputValue("");
    setIsTyping(true);

    try {
      // First try calling our clean API route
      let resData;
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: textToSend }),
        });
        if (response.ok) {
          resData = await response.json();
        }
      } catch {
        // Network or local fallback
      }

      // If API fails or is offline, seamlessly use local grounded reasoning engine
      if (!resData) {
        resData = await processAssistantQuery(textToSend);
      }

      const botMessage: AssistantMessage = {
        id: "bot-" + Date.now(),
        sender: "assistant",
        text: resData.reply,
        timestamp: "Just now",
        recommendedProducts: resData.recommendedProducts,
        actionChips: resData.actionChips,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "assistant",
          text: "I apologize, but I could not reach my catalog service. Feel free to browse our Shop directly or chat with Kishan & Aesha on WhatsApp!",
          timestamp: "Just now",
          actionChips: [{ label: "Chat on WhatsApp", action: "WHATSAPP" }],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChipAction = (action: string) => {
    if (action.startsWith("QUERY:")) {
      const q = action.replace("QUERY:", "");
      handleSend(q);
    } else if (action.startsWith("NAVIGATE:")) {
      const path = action.replace("NAVIGATE:", "");
      setIsOpen(false);
      router.push(path);
    } else if (action === "WHATSAPP") {
      const url = generateWhatsAppLink(
        defaultSiteConfig.contact.whatsappNumber,
        "Hello Sevak Creation! I need personal styling assistance."
      );
      window.open(url, "_blank");
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    showToast(`Added ${product.name} to bag!`);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  return (
    <>
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#5C1327] hover:bg-[#4A0E17] text-white shadow-xl hover:shadow-2xl border border-[#C5A059]/40 transition-all duration-300 hover:scale-105 group"
          aria-label="Open Sevak Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] group-hover:rotate-12 transition">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Sevak Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-4 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-[#FCFBF7] rounded-2xl shadow-2xl border border-[#E8DFD0] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#4A0E17] text-white flex items-center justify-between border-b border-[#731B34]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#1F1F1F] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-brand-serif font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>Sevak Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                </h3>
                <p className="text-[10px] text-amber-200/80">
                  Jewellery Stylist & Store Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-md hover:bg-white/10 transition"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF7F2]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#5C1327] text-white rounded-br-xs"
                      : "bg-white text-[#2B2B2B] border border-[#E8DFD0] rounded-bl-xs shadow-2xs whitespace-pre-line"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Inline Recommended Product Cards */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                      Recommended Jewellery:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-[#E8DFD0] shadow-2xs"
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#F3ECE1] overflow-hidden shrink-0 relative">
                            <Image
                              src={prod.thumbnail}
                              alt={prod.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${prod.slug}`}
                              onClick={() => setIsOpen(false)}
                              className="text-xs font-semibold text-[#1F1F1F] hover:text-[#5C1327] truncate block"
                            >
                              {prod.name}
                            </Link>
                            <div className="text-[11px] text-[#4A0E17] font-bold">
                              {formatINR(prod.price)}
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddToCart(prod)}
                            className="p-1.5 rounded-lg bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs transition shrink-0"
                            title="Add to bag"
                          >
                            {addedItems[prod.id] ? (
                              <Check className="w-3.5 h-3.5 text-emerald-300" />
                            ) : (
                              <ShoppingBag className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.actionChips && msg.actionChips.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.actionChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipAction(chip.action)}
                        className="px-2.5 py-1 rounded-full bg-white hover:bg-[#5C1327] text-[#5C1327] hover:text-white border border-[#D5CABB] text-[11px] font-medium transition shadow-2xs"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A] bg-white border border-[#E8DFD0] p-2.5 rounded-2xl w-fit">
                <Sparkles className="w-3 h-3 text-[#C5A059] animate-spin" />
                <span>Sevak Assistant is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E8DFD0] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about jhumkas, gifts, or shipping..."
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] focus:outline-hidden focus:border-[#5C1327] text-[#1F1F1F]"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white transition disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
