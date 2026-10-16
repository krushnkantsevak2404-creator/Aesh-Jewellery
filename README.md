# 🪔 SEVAK CREATION — E-Commerce Platform

> **Modern Indian Jewellery & Festive Fashion Accessories**  
> Founded by **Kishan & Aesha** • Ahmedabad, Gujarat, India  
> Official Instagram: [@sevakcreation](https://www.instagram.com/sevak.creation?xtok=MXR5cWtkZHBjc3ptOQ==) • Target Market: India (₹ INR)

---

## 🌟 Brand Overview & Core Positioning

**SEVAK CREATION** is an online jewellery and festive fashion accessories brand designed for college students, young professionals, and festive shoppers across India. 

* **The Aesthetic**: Modern Indian festive luxury — warm burgundy (`#5C1327`), warm gold (`#C5A059`), soft ivory cream (`#FCFBF7`), and deep charcoal (`#1F1F1F`).
* **Year-Round Appeal**: While rooted in celebrated traditional festive jewellery (oxidized earrings, haathphools, chokers, and handcrafted *ked kandoros* for Navratri), the brand dynamically transitions year-round across **Navratri, Diwali, Wedding / Shaadi Season, Raksha Bandhan, Karwa Chauth, Valentine's Day, and Everyday Wear**.
* **Zero AI-Gimmicks**: Clean editorial typography (*Playfair Display* & *Plus Jakarta Sans*), generous whitespace, authentic Indian styling, and high accessibility.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies (if not already installed)
npm.cmd install

# 2. Start the local development server
npm.cmd run dev

# 3. Open in browser
http://localhost:3000
```

To run a production build verification:
```bash
npm.cmd run build
```

---

## 📂 Key Pages & Routes

| URL Route | Description |
|---|---|
| `/` | **Homepage** with 11 curated sections (Hero, Categories, Occasions, Trending Carousel, Navratri Spotlight, Dynamic Seasonal Spotlight, Best Sellers, Trust Badges, Instagram Grid, Testimonials, Newsletter/WhatsApp CTA) |
| `/shop` | Filterable product catalogue (categories, price sliders, occasions, in-stock, and sorting) |
| `/product/[slug]` | Product Detail Page (PDP) with high-res gallery, zoom, "Why You'll Love It", care instructions, WhatsApp inquiry, and "Frequently Bought Together" bundles |
| `/categories` & `/categories/[slug]` | Dedicated category listing pages (Earrings, Necklaces, Hand Sets, Rings, Bracelets, Ked Kandoro, Bangles, Anklets, Jewellery Sets) |
| `/collections` & `/collections/[slug]` | Dynamic Seasonal Collections (Navratri, Diwali, Shaadi Edit, Raksha Bandhan, Everyday) |
| `/new-arrivals` | Curated feed of newly dropped jewellery pieces |
| `/best-sellers` | Top-rated and most loved pieces |
| `/wishlist` | Dedicated wishlist with 1-click move to shopping bag |
| `/cart` | Full shopping bag with free shipping meter (`₹999` threshold) and coupon support (`SEVAK10`, `FESTIVE15`) |
| `/checkout` | Frictionless guest checkout for Indian customers (name, 10-digit mobile, address, 6-digit PIN validation, UPI / Cards / COD) |
| `/checkout/success` | Order confirmation screen with celebratory confetti, order summary, and WhatsApp order notification |
| `/track-order` | 5-step visual tracking timeline for orders (`SC-XXXXXX`) |
| `/account` | Customer account view with order history and profile shortcuts |
| `/search` | Dedicated search results page with suggestions and filters |
| `/admin` | Store administration portal for Kishan & Aesha |
| `/about` | Kishan & Aesha's founder story and brand philosophy |
| `/contact` | Customer support, studio address in Ahmedabad, and direct WhatsApp / Instagram links |
| `/faq` | Categorized FAQs (Orders, Shipping, Payments, Oxidized Jewellery Care) |
| `/policies/*` | Comprehensive legal policies: `/shipping`, `/returns`, `/privacy`, `/terms` |

---

## 🎛️ How Kishan & Aesha Can Manage the Store

### 1. Changing the Active Seasonal Collection in 1 Click
You don't need a developer or redesign to switch seasons:
1. Navigate to `http://localhost:3000/admin`.
2. Click on the **Seasonal Collections** tab.
3. Select any season (**Navratri Edit**, **Diwali Sparkle**, **The Shaadi Edit**, **Raksha Bandhan**, or **Everyday Minimal**).
4. Click **Set as Active Season**.
5. The homepage banner, highlighted categories, and promotional banners across the entire store will automatically update!

### 2. Managing Products & Pricing
* Edit initial products in `src/lib/data/products.ts`.
* In the `/admin` portal (**Products** tab), you can quickly:
  - Update selling prices (`price`) and MRP (`compareAtPrice`).
  - Toggle stock status (`inStock` / `outOfStock`).
  - Toggle `isFeatured` or `isBestSeller`.
  - Add new products with categories, occasions, materials, and tags.

### 3. Updating WhatsApp & Instagram Numbers
All brand contacts are centralized in `src/lib/config/siteConfig.ts` or via environment variables:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=919099876252
NEXT_PUBLIC_INSTAGRAM_HANDLE=sevakcreation
```

---

## 🤖 Sevak Assistant (AI Shopping Guide)

Located in the bottom-right corner, **Sevak Assistant** is a grounded AI shopping companion:
* Answers queries about Navratri jewellery under ₹1000, sister gifting, chokers, ked kandoros, and oxidized care.
* Displays interactive product cards with direct "Add to Cart" and "View Details" actions inside the chat.
* Strictly grounded on the real product catalogue (does not hallucinate false prices or inventory).
* Ready to connect to OpenAI or Google Gemini via `/api/chat` by adding `OPENAI_API_KEY` or `GEMINI_API_KEY` in `.env.local`.

---

## 💳 Payment Gateway Architecture (Razorpay India)

The checkout system in `src/app/checkout/page.tsx` supports:
1. **UPI** (Google Pay, PhonePe, Paytm, BHIM) with VPA validation.
2. **Credit & Debit Cards** (Visa, MasterCard, RuPay).
3. **Net Banking** (All major Indian banks).
4. **Cash on Delivery (COD)**.

To activate real Razorpay processing:
1. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local`.
2. In `src/app/checkout/page.tsx`, enable the Razorpay Checkout SDK script callback already scaffolded in the payment handler.

---

## 🚢 Deployment to Production (Vercel)

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. In the Vercel Project Settings, add the Environment Variables from `.env.example`.
4. Deploy! Your site will be live on `https://sevakcreation.com` with automatic SSL and global CDN delivery.

---

© 2026 **SEVAK CREATION**. All rights reserved. Crafted with care for Kishan & Aesha.
