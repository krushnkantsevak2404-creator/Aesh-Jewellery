export type OccasionType =
  | "navratri"
  | "diwali"
  | "wedding"
  | "raksha-bandhan"
  | "karwa-chauth"
  | "dussehra"
  | "ganesh-chaturthi"
  | "janmashtami"
  | "festive"
  | "everyday"
  | "gifting"
  | "party";

export type SeasonType =
  | "navratri"
  | "diwali"
  | "raksha-bandhan"
  | "wedding-season"
  | "festive"
  | "summer"
  | "everyday";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  price: number;
  compareAtPrice: number;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
  material: string;
  colour: string;
  size?: string;
  weight?: string;
  closureType?: string;
  careInstructions?: string[];
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  occasions: OccasionType[];
  seasons: SeasonType[];
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  isActive: boolean;
  whyYouWillLoveIt?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
  featured?: boolean;
}

export interface SeasonalCollection {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  bannerImage: string;
  badgeText: string;
  accentColor?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  isFeatured: boolean;
  productIds?: string[];
  curatedCategories?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColour?: string;
}

export interface Coupon {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue: number;
  description: string;
  expiryDate?: string;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

export interface CustomerDetails {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  productName?: string;
  productSlug?: string;
  verifiedBuyer: boolean;
  date: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  siteUrl?: string;
  founders: {
    name1: string;
    name2: string;
    story: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappFormatted: string;
    phone: string;
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    address: string;
    supportHours: string;
  };
  shipping: {
    freeShippingThreshold: number;
    standardShippingFee: number;
    estimatedDeliveryDays: string;
  };
  activeSeasonSlug: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    highlightText: string;
    link?: string;
  };
}
