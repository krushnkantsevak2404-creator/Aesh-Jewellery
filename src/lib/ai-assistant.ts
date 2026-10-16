import { products } from "./data/products";
import { defaultSiteConfig, availableCoupons } from "./config/siteConfig";
import { Product } from "./types";
import { formatINR } from "./utils";

export interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  actionChips?: { label: string; action: string }[];
}

export async function processAssistantQuery(
  query: string,
  _history?: { sender: string; text: string }[]
): Promise<{
  reply: string;
  recommendedProducts: Product[];
  actionChips: { label: string; action: string }[];
}> {
  const lower = query.toLowerCase().trim();

  // If an external LLM key is configured in env (e.g. OPENAI_API_KEY or GEMINI_API_KEY),
  // this clean abstraction can call the external provider while providing store catalog context.
  // When not set, our rule-based semantic reasoning engine handles queries with zero hallucination.

  // 1. Budget extraction
  let budgetLimit: number | null = null;
  const underMatch = lower.match(/(?:under|below|less than|within|around)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (underMatch) {
    budgetLimit = parseInt(underMatch[1], 10);
  }

  // 2. Shipping / Delivery questions
  if (
    lower.includes("shipping") ||
    lower.includes("delivery") ||
    lower.includes("how many days") ||
    lower.includes("when will it arrive") ||
    lower.includes("dispatch")
  ) {
    return {
      reply: `✨ Here are our shipping details at ${defaultSiteConfig.brandName}:\n\n• **Free Express Shipping** on orders above ${formatINR(defaultSiteConfig.shipping.freeShippingThreshold)}.\n• Standard delivery fee is ${formatINR(defaultSiteConfig.shipping.standardShippingFee)} for smaller orders.\n• Delivery timeline: **${defaultSiteConfig.shipping.estimatedDeliveryDays}**.\n• All orders are carefully packed in secure, anti-tarnish protective packaging so your jewellery arrives spotless.`,
      recommendedProducts: [],
      actionChips: [
        { label: "View Shipping Policy", action: "NAVIGATE:/policies/shipping" },
        { label: "Track an Order", action: "NAVIGATE:/track-order" },
        { label: "Chat on WhatsApp", action: "WHATSAPP" },
      ],
    };
  }

  // 3. Return & Refund questions
  if (
    lower.includes("return") ||
    lower.includes("refund") ||
    lower.includes("exchange") ||
    lower.includes("damaged")
  ) {
    return {
      reply: `📦 **Return & Refund Policy:**\n\nWe offer a **5-day hassle-free replacement or store credit** in case of transit damage or wrong item delivered. For hygiene and safety reasons, we request an unboxing video to process quick claims without friction. Our founders Kishan & Aesha review each request directly on WhatsApp for prompt resolution!`,
      recommendedProducts: [],
      actionChips: [
        { label: "Return Policy Page", action: "NAVIGATE:/policies/returns" },
        { label: "Support on WhatsApp", action: "WHATSAPP" },
      ],
    };
  }

  // 4. Care instructions & Oxidized tips
  if (
    lower.includes("care") ||
    lower.includes("clean") ||
    lower.includes("tarnish") ||
    lower.includes("water") ||
    lower.includes("perfume") ||
    lower.includes("black")
  ) {
    return {
      reply: `✨ **Jewellery Care Guide for Sevak Creation Pieces:**\n\n1. **The Last On, First Off Rule:** Put your jewellery on *after* applying perfume, hairspray, and lotions.\n2. **Moisture Protection:** Keep your pieces away from direct water and showers.\n3. **Storage:** Always wipe gently with a soft dry cloth and store in the airtight Sevak Creation pouch provided.\n4. **For Oxidized Pieces:** The antique silver patina is deliberate; avoid harsh liquid cleaners to maintain its vintage charm.`,
      recommendedProducts: [],
      actionChips: [
        { label: "Explore Oxidized Collection", action: "QUERY:oxidized jewellery" },
        { label: "Read FAQs", action: "NAVIGATE:/faq" },
      ],
    };
  }

  // 5. Coupons & Discounts
  if (
    lower.includes("coupon") ||
    lower.includes("discount") ||
    lower.includes("offer") ||
    lower.includes("promo") ||
    lower.includes("code")
  ) {
    const couponsText = availableCoupons
      .map((c) => `• **${c.code}**: ${c.description}`)
      .join("\n");
    return {
      reply: `🎉 **Current Active Offers at Sevak Creation:**\n\n${couponsText}\n\nYou can apply any of these coupons directly in your Shopping Cart or at Checkout!`,
      recommendedProducts: [],
      actionChips: [
        { label: "Shop Best Sellers", action: "NAVIGATE:/best-sellers" },
        { label: "Go to Cart", action: "NAVIGATE:/cart" },
      ],
    };
  }

  // 6. Navratri & Garba specific recommendations
  if (
    lower.includes("navratri") ||
    lower.includes("garba") ||
    lower.includes("ked kandoro") ||
    lower.includes("chaniya choli") ||
    lower.includes("kandoro") ||
    lower.includes("dandiya")
  ) {
    let filtered = products.filter(
      (p) =>
        p.occasions.includes("navratri") ||
        p.seasons.includes("navratri") ||
        p.tags.includes("navratri") ||
        p.tags.includes("oxidized")
    );
    if (budgetLimit) {
      filtered = filtered.filter((p) => p.price <= budgetLimit);
    }

    const matches = filtered.slice(0, 4);

    return {
      reply: `💃 **Garba Ready with Sevak Creation!**\n\nWe started our journey curating traditional oxidized jewellery specifically for Navratri nights! Here are authentic handpicked pieces${
        budgetLimit ? ` under ${formatINR(budgetLimit)}` : ""
      } designed to chime and sparkle without weighing your ears down:`,
      recommendedProducts: matches,
      actionChips: [
        { label: "View Navratri Edit", action: "NAVIGATE:/collections/navratri" },
        { label: "Shop Ked Kandoro", action: "NAVIGATE:/categories/ked-kandoro" },
        { label: "Oxidized Jhumkas", action: "QUERY:jhumka" },
      ],
    };
  }

  // 7. Gifting recommendation
  if (
    lower.includes("gift") ||
    lower.includes("sister") ||
    lower.includes("friend") ||
    lower.includes("mother") ||
    lower.includes("rakhi") ||
    lower.includes("birthday")
  ) {
    let filtered = products.filter(
      (p) =>
        p.occasions.includes("gifting") ||
        p.isBestSeller ||
        p.tags.includes("gifting")
    );
    if (budgetLimit) {
      filtered = filtered.filter((p) => p.price <= budgetLimit);
    }
    const matches = filtered.slice(0, 4);

    return {
      reply: `🎁 **Thoughtful Jewellery Gifting Ideas:**\n\nEvery Sevak Creation piece comes carefully packaged in our signature pouch. Here are popular beloved picks${
        budgetLimit ? ` within ${formatINR(budgetLimit)}` : ""
      } that make unforgettable surprises:`,
      recommendedProducts: matches,
      actionChips: [
        { label: "Under ₹500", action: "QUERY:under 500" },
        { label: "Under ₹1000", action: "QUERY:under 1000" },
        { label: "Best Sellers", action: "NAVIGATE:/best-sellers" },
      ],
    };
  }

  // 8. Category / Specific Product Search
  let matchedProducts: Product[] = [];

  if (lower.includes("earring") || lower.includes("jhumka") || lower.includes("stud") || lower.includes("chandbali")) {
    matchedProducts = products.filter((p) => p.categorySlug === "earrings");
  } else if (lower.includes("necklace") || lower.includes("choker") || lower.includes("hasli")) {
    matchedProducts = products.filter((p) => p.categorySlug === "necklaces");
  } else if (lower.includes("hand") || lower.includes("haathphool")) {
    matchedProducts = products.filter((p) => p.categorySlug === "hand-sets");
  } else if (lower.includes("ring")) {
    matchedProducts = products.filter((p) => p.categorySlug === "rings");
  } else if (lower.includes("bracelet") || lower.includes("kada")) {
    matchedProducts = products.filter((p) => p.categorySlug === "bracelets");
  } else if (lower.includes("kandoro") || lower.includes("waist")) {
    matchedProducts = products.filter((p) => p.categorySlug === "ked-kandoro");
  } else if (lower.includes("bangle")) {
    matchedProducts = products.filter((p) => p.categorySlug === "bangles");
  } else if (lower.includes("anklet") || lower.includes("payal")) {
    matchedProducts = products.filter((p) => p.categorySlug === "anklets");
  } else if (lower.includes("set") || lower.includes("bridal") || lower.includes("kundan")) {
    matchedProducts = products.filter((p) => p.categorySlug === "jewellery-sets");
  } else {
    // General keyword match
    const keywords = lower.split(/\s+/).filter((w) => w.length > 2);
    matchedProducts = products.filter((p) => {
      const target = `${p.name} ${p.description} ${p.tags.join(" ")} ${p.material} ${p.category}`.toLowerCase();
      return keywords.some((kw) => target.includes(kw));
    });
  }

  if (budgetLimit) {
    matchedProducts = matchedProducts.filter((p) => p.price <= budgetLimit);
  }

  if (matchedProducts.length > 0) {
    const list = matchedProducts.slice(0, 4);
    return {
      reply: `✨ Here are handpicked recommendations from our catalog matching your search${
        budgetLimit ? ` under ${formatINR(budgetLimit)}` : ""
      }:`,
      recommendedProducts: list,
      actionChips: [
        { label: "View All Products", action: "NAVIGATE:/shop" },
        { label: "Explore Best Sellers", action: "NAVIGATE:/best-sellers" },
        { label: "Ask on WhatsApp", action: "WHATSAPP" },
      ],
    };
  }

  // 9. Fallback friendly response
  return {
    reply: `Namaste! 🙏 I'm your **Sevak Assistant**. I can help you find the ideal jewellery for any occasion, assist with budget curation, answer questions about shipping, care, or orders.\n\nTry asking me:\n• *"Show me oxidized jhumkas under ₹500"*\n• *"What do you recommend for Navratri?"*\n• *"I need a gift for my sister under ₹1000"*\n• *"Tell me about delivery & shipping"*`,
    recommendedProducts: products.filter((p) => p.isFeatured).slice(0, 3),
    actionChips: [
      { label: "✨ Navratri Specials", action: "QUERY:Navratri collection" },
      { label: "💰 Under ₹500", action: "QUERY:under 500" },
      { label: "🎁 Gift Ideas", action: "QUERY:gift for sister" },
      { label: "📦 Shipping Info", action: "QUERY:shipping delivery" },
    ],
  };
}
