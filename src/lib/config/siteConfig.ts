import { SiteConfig, Coupon } from "../types";

export const defaultSiteConfig: SiteConfig = {
  brandName: "SEVAK CREATION",
  tagline: "Modern Indian Jewellery & Festive Accessories",
  siteUrl: "https://sevakcreation.com",
  founders: {
    name1: "Kishan",
    name2: "Aesha",
    story:
      "Sevak Creation was born out of a shared passion between two friends, Kishan and Aesha. What started with curating mesmerizing oxidized jewellery for vibrant Garba nights during Navratri has blossomed into an all-season haven for timeless Indian ornaments and everyday elegance.",
  },
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919099876252",
    whatsappFormatted: "+91 90998 76252",
    phone: "+91 90998 76252",
    email: "krushnkantsevak2404@gmail.com",
    instagramHandle: "sevakcreation",
    instagramUrl: "https://www.instagram.com/sevakcreation",
    address: "Ahmedabad, Gujarat, India - 380015",
    supportHours: "Monday to Saturday, 10:00 AM – 7:00 PM IST",
  },
  shipping: {
    freeShippingThreshold: 999,
    standardShippingFee: 70,
    estimatedDeliveryDays: "3-5 business days across India",
  },
  activeSeasonSlug: "navratri", // Dynamically switches between navratri, diwali, wedding-season, raksha-bandhan, everyday
  announcementBar: {
    enabled: true,
    text: "Free Express Shipping on orders above ₹999",
    highlightText: "Use Code: SEVAK10 for 10% OFF",
    link: "/shop",
  },
};

export const availableCoupons: Coupon[] = [
  {
    code: "SEVAK10",
    discountType: "percentage",
    discountValue: 10,
    minOrderValue: 499,
    description: "10% off on all orders above ₹499",
  },
  {
    code: "FESTIVE15",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 1299,
    description: "15% festive discount on orders above ₹1,299",
  },
  {
    code: "NAVRATRI20",
    discountType: "percentage",
    discountValue: 20,
    minOrderValue: 1999,
    description: "Flat 20% off on festive collections above ₹1,999",
  },
  {
    code: "FIRSTBUY",
    discountType: "fixed",
    discountValue: 100,
    minOrderValue: 799,
    description: "Flat ₹100 off on your first order above ₹799",
  },
];

export const indianStates: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi NCR",
  "Chandigarh",
  "Jammu & Kashmir",
  "Ladakh",
];
