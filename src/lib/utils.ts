import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generateProductInquiryMessage(
  productName: string,
  price: number,
  sku: string,
  url?: string
): string {
  let msg = `Hello Sevak Creation! ✨\n\nI am interested in ordering:\n*${productName}*\nSKU: ${sku}\nPrice: ${formatINR(price)}`;
  if (url) {
    msg += `\nLink: ${url}`;
  }
  msg += `\n\nIs this in stock and available for shipping?`;
  return msg;
}

export function isValidIndianPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}

export function isValidIndianMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/[^0-9]/g, "");
  return cleaned.length === 10 && /^[6-9]/.test(cleaned);
}
