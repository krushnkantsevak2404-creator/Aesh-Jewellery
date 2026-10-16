"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  ShoppingBag,
  Tag,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Check,
  Edit2,
  AlertCircle,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { products as initialProducts } from "../../lib/data/products";
import { seasonalCollections } from "../../lib/data/collections";
import { categories } from "../../lib/data/categories";
import { availableCoupons as initialCoupons } from "../../lib/config/siteConfig";
import { useStore } from "../../context/StoreContext";
import { Product, SeasonalCollection, Coupon, OrderStatus } from "../../lib/types";
import { formatINR } from "../../lib/utils";

export default function AdminDashboardPage() {
  const { activeSeasonSlug, setActiveSeasonSlug, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<
    "overview" | "seasonal" | "products" | "orders" | "coupons"
  >("overview");

  // Editable state
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [couponList, setCouponList] = useState<Coupon[]>(initialCoupons);

  // Simulated Orders state
  const [ordersList, setOrdersList] = useState<any[]>([
    {
      id: "ord-101",
      orderNumber: "SC-829104",
      customer: {
        fullName: "Pooja Varma",
        mobile: "9879100001",
        city: "Ahmedabad",
        state: "Gujarat",
      },
      items: [
        { name: "Mayura Peacock Oxidized Jhumka Earrings", qty: 2, price: 499 },
        { name: "Shahi Navratri Ked Kandoro (Traditional Waistband)", qty: 1, price: 1299 },
      ],
      total: 2297,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      orderStatus: "Shipped",
      createdAt: "Today, 11:30 AM",
    },
    {
      id: "ord-102",
      orderNumber: "SC-829105",
      customer: {
        fullName: "Riya Shah",
        mobile: "9820011223",
        city: "Mumbai",
        state: "Maharashtra",
      },
      items: [
        { name: "Ayna Mirror-Work Haathphool Hand Set", qty: 1, price: 649 },
        { name: "Surya Sunburst Afghan Statement Ring", qty: 1, price: 349 },
      ],
      total: 998,
      paymentMethod: "Card",
      paymentStatus: "Paid",
      orderStatus: "Packed",
      createdAt: "Yesterday",
    },
    {
      id: "ord-103",
      orderNumber: "SC-829106",
      customer: {
        fullName: "Ananya Iyer",
        mobile: "9988776655",
        city: "Bengaluru",
        state: "Karnataka",
      },
      items: [
        { name: "Rani Kundan & Pearl Festive Choker Set", qty: 1, price: 1599 },
      ],
      total: 1599,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Confirmed",
      createdAt: "2 days ago",
    },
  ]);

  // Product Add Form Modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Earrings",
    categorySlug: "earrings",
    price: 499,
    compareAtPrice: 799,
    stock: 25,
    material: "Brass Alloy with Antique Oxidized Finish",
    colour: "Oxidized Silver",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Handcrafted festive jewellery.",
  });

  // KPI Calculations
  const totalRevenue = ordersList.reduce((acc, o) => acc + o.total, 0);
  const totalOrders = ordersList.length;
  const totalActiveProducts = productList.filter((p) => p.isActive).length;

  const handleSeasonChange = (slug: string) => {
    setActiveSeasonSlug(slug);
    showToast(`Active Seasonal Collection switched to ${slug.toUpperCase()}!`);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    showToast(`Order status updated to ${newStatus}`);
  };

  const handleToggleProductStatus = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    showToast("Product availability updated.");
  };

  const handleUpdateStock = (id: string, delta: number) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
      )
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name) return;

    const discount = Math.round(
      ((newProduct.compareAtPrice - newProduct.price) / newProduct.compareAtPrice) * 100
    );

    const created: Product = {
      id: "prod-" + Date.now(),
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, "-"),
      description: newProduct.shortDescription,
      shortDescription: newProduct.shortDescription,
      category: newProduct.category,
      categorySlug: newProduct.categorySlug,
      price: Number(newProduct.price),
      compareAtPrice: Number(newProduct.compareAtPrice),
      discountPercentage: discount,
      images: [newProduct.image],
      thumbnail: newProduct.image,
      material: newProduct.material,
      colour: newProduct.colour,
      stock: Number(newProduct.stock),
      sku: "SC-NEW-" + Math.floor(100 + Math.random() * 900),
      rating: 5.0,
      reviewCount: 1,
      tags: ["new", newProduct.categorySlug],
      occasions: ["festive", "everyday"],
      seasons: ["festive"],
      isNew: true,
      isBestSeller: false,
      isFeatured: true,
      isActive: true,
    };

    setProductList([created, ...productList]);
    setIsAddProductOpen(false);
    showToast(`Added product "${created.name}" successfully!`);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ECE4D8] gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4A0E17] text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-brand-serif text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
                  Sevak Creation Store Admin
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  Live Operations
                </span>
              </div>
              <p className="text-xs text-[#7A7A7A]">
                Business Architecture for Kishan & Aesha • Ahmedabad, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-white rounded-xl border border-[#D5CABB] text-xs font-semibold hover:border-[#5C1327] flex items-center gap-1.5 transition text-[#1F1F1F]"
            >
              <Eye className="w-3.5 h-3.5 text-[#5C1327]" />
              <span>Preview Storefront</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#ECE4D8]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "overview"
                ? "bg-[#5C1327] text-white shadow-xs"
                : "bg-[#FAF6F0] text-[#4A4A4A] hover:bg-[#F3ECE1]"
            }`}
          >
            Overview & KPIs
          </button>
          <button
            onClick={() => setActiveTab("seasonal")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
              activeTab === "seasonal"
                ? "bg-[#5C1327] text-white shadow-xs"
                : "bg-[#FAF6F0] text-[#4A4A4A] hover:bg-[#F3ECE1]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Seasonal Switcher</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "products"
                ? "bg-[#5C1327] text-white shadow-xs"
                : "bg-[#FAF6F0] text-[#4A4A4A] hover:bg-[#F3ECE1]"
            }`}
          >
            Product Catalog ({productList.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "orders"
                ? "bg-[#5C1327] text-white shadow-xs"
                : "bg-[#FAF6F0] text-[#4A4A4A] hover:bg-[#F3ECE1]"
            }`}
          >
            Manage Orders ({ordersList.length})
          </button>
          <button
            onClick={() => setActiveTab("coupons")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "coupons"
                ? "bg-[#5C1327] text-white shadow-xs"
                : "bg-[#FAF6F0] text-[#4A4A4A] hover:bg-[#F3ECE1]"
            }`}
          >
            Coupons & Offers
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#888] mb-2 font-semibold uppercase tracking-wider">
                  <span>Total Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-[#1F1F1F]">
                  {formatINR(totalRevenue)}
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
                  ↑ 18% festive surge
                </span>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#888] mb-2 font-semibold uppercase tracking-wider">
                  <span>Received Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#5C1327]" />
                </div>
                <div className="text-2xl font-bold text-[#1F1F1F]">
                  {totalOrders} Orders
                </div>
                <span className="text-[11px] text-[#888] mt-1 inline-block">
                  Avg order value: {formatINR(Math.round(totalRevenue / totalOrders))}
                </span>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#888] mb-2 font-semibold uppercase tracking-wider">
                  <span>Active Catalog Pieces</span>
                  <Package className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-2xl font-bold text-[#1F1F1F]">
                  {totalActiveProducts} Products
                </div>
                <span className="text-[11px] text-emerald-700 font-medium mt-1 inline-block">
                  10 categories online
                </span>
              </div>

              <div className="p-6 bg-[#4A0E17] text-white rounded-2xl border border-[#731B34] shadow-xs">
                <div className="flex items-center justify-between text-xs text-amber-200/80 mb-2 font-semibold uppercase tracking-wider">
                  <span>Active Seasonal Mode</span>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className="text-xl font-bold capitalize text-white">
                  {activeSeasonSlug.replace("-", " ")}
                </div>
                <span className="text-[11px] text-[#E5C46B] mt-1 inline-block">
                  Configured without redesign
                </span>
              </div>
            </div>

            {/* Quick Action Highlight */}
            <div className="p-6 sm:p-8 bg-[#FAF6F0] rounded-3xl border border-[#ECE4D8] flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F]">
                  Upcoming Festival Season Transition
                </h3>
                <p className="text-xs text-[#666] mt-1 max-w-xl">
                  Easily switch your homepage banners, promotional tags, and spotlighted products from Navratri to Diwali or Wedding Season with a single click.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("seasonal")}
                className="px-6 py-3 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider transition shrink-0"
              >
                Configure Active Season →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SEASONAL SWITCHER */}
        {activeTab === "seasonal" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 bg-white rounded-3xl border border-[#ECE4D8] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
                    Dynamic Seasonal Collection Switcher
                  </h2>
                  <p className="text-xs text-[#666] mt-1">
                    Select which seasonal edit appears as the active hero focus on the homepage. Changes apply immediately across the site.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {seasonalCollections.map((col) => {
                  const isCurrent = col.slug === activeSeasonSlug;
                  return (
                    <div
                      key={col.id}
                      className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isCurrent
                          ? "border-[#5C1327] bg-[#FDF8F9] shadow-md ring-2 ring-[#C5A059]/40"
                          : "border-[#ECE4D8] bg-white hover:bg-[#FAF6F0]"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                            {col.badgeText}
                          </span>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-[#5C1327] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> ACTIVE NOW
                            </span>
                          )}
                        </div>

                        <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F]">
                          {col.name}
                        </h3>
                        <p className="text-xs text-[#5C1327] font-medium mt-0.5">
                          &ldquo;{col.tagline}&rdquo;
                        </p>
                        <p className="text-xs text-[#666] mt-2 line-clamp-2 leading-relaxed">
                          {col.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#ECE4D8]">
                        {isCurrent ? (
                          <div className="text-xs text-center font-bold text-[#5C1327] py-2 bg-[#F7E8EC] rounded-xl">
                            Currently Active on Homepage
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSeasonChange(col.slug)}
                            className="w-full py-2.5 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider transition"
                          >
                            Set as Active Season
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
                  Product Catalog & Stock Management
                </h2>
                <p className="text-xs text-[#666]">
                  Update inventory levels, toggle availability, and add new designs.
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-[#ECE4D8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#4A4A4A]">
                  <thead className="bg-[#FAF6F0] text-[#1F1F1F] font-bold uppercase text-[11px] border-b border-[#ECE4D8]">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE4D8]">
                    {productList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FCFBF7]">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0">
                              <Image
                                src={prod.thumbnail}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-semibold text-[#1F1F1F] block">
                                {prod.name}
                              </span>
                              <span className="text-[10px] text-[#888]">SKU: {prod.sku}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">{prod.category}</td>
                        <td className="p-4 font-bold text-[#4A0E17]">
                          {formatINR(prod.price)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateStock(prod.id, -1)}
                              className="w-6 h-6 rounded bg-[#F3ECE1] hover:bg-[#E8DFD0] flex items-center justify-center font-bold"
                            >
                              -
                            </button>
                            <span className="font-semibold min-w-[20px] text-center">
                              {prod.stock}
                            </span>
                            <button
                              onClick={() => handleUpdateStock(prod.id, 1)}
                              className="w-6 h-6 rounded bg-[#F3ECE1] hover:bg-[#E8DFD0] flex items-center justify-center font-bold"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              prod.isActive
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-neutral-200 text-neutral-600"
                            }`}
                          >
                            {prod.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleProductStatus(prod.id)}
                            className="px-3 py-1.5 rounded-lg border border-[#D5CABB] hover:bg-[#FAF6F0] text-xs font-medium"
                          >
                            {prod.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
                Customer Orders Fulfillment
              </h2>
              <p className="text-xs text-[#666]">
                Update order statuses from Confirmed to Packed, Shipped, and Delivered.
              </p>
            </div>

            <div className="space-y-4">
              {ordersList.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-5 rounded-2xl border border-[#ECE4D8] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#ECE4D8] gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
                          Order #{order.orderNumber}
                        </span>
                        <span className="text-xs text-[#888]">• {order.createdAt}</span>
                      </div>
                      <div className="text-xs text-[#666]">
                        Customer: <strong>{order.customer.fullName}</strong> (+91{" "}
                        {order.customer.mobile}) • {order.customer.city},{" "}
                        {order.customer.state}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#888]">Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="px-3 py-1.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-xs font-bold text-[#5C1327] focus:outline-hidden"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#4A4A4A] gap-4">
                    <div>
                      <div className="font-semibold text-[#1F1F1F] mb-1">Items:</div>
                      <ul className="space-y-1">
                        {order.items.map((it: any, i: number) => (
                          <li key={i}>
                            {it.qty} × {it.name} ({formatINR(it.price)})
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-xs text-[#888]">
                        Payment: <strong>{order.paymentMethod}</strong> ({order.paymentStatus})
                      </div>
                      <div className="text-base font-bold text-[#4A0E17] mt-0.5">
                        Total: {formatINR(order.total)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === "coupons" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
                Active Discount Coupons
              </h2>
              <p className="text-xs text-[#666]">
                Configure promotional promo codes for festive campaigns.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {couponList.map((c) => (
                <div
                  key={c.code}
                  className="p-5 bg-white rounded-2xl border border-[#ECE4D8] shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md bg-[#5C1327] text-white text-xs font-bold tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                    </span>
                  </div>
                  <p className="text-xs text-[#666] leading-relaxed">
                    {c.description}
                  </p>
                  <div className="text-[11px] text-[#888] pt-2 border-t border-[#ECE4D8]">
                    Min Order: {formatINR(c.minOrderValue)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsAddProductOpen(false)}
            />
            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#ECE4D8] shadow-2xl relative z-10 space-y-5">
                <h3 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
                  Add New Jewellery Design
                </h3>

                <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#1F1F1F] mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      placeholder="e.g. Kasavu Antique Temple Choker"
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#1F1F1F] mb-1">
                        Category
                      </label>
                      <select
                        value={newProduct.categorySlug}
                        onChange={(e) => {
                          const cat = categories.find((c) => c.slug === e.target.value);
                          setNewProduct({
                            ...newProduct,
                            categorySlug: e.target.value,
                            category: cat ? cat.name : "Earrings",
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1F1F1F] mb-1">
                        Stock Qty
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, stock: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#1F1F1F] mb-1">
                        Selling Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: Number(e.target.value) })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#1F1F1F] mb-1">
                        Original Price (₹)
                      </label>
                      <input
                        type="number"
                        value={newProduct.compareAtPrice}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            compareAtPrice: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1F1F1F] mb-1">
                      Image URL (Clean jewellery photo)
                    </label>
                    <input
                      type="url"
                      value={newProduct.image}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, image: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1F1F1F] mb-1">
                      Short Description
                    </label>
                    <textarea
                      rows={2}
                      value={newProduct.shortDescription}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          shortDescription: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-[#D5CABB]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECE4D8]">
                    <button
                      type="button"
                      onClick={() => setIsAddProductOpen(false)}
                      className="px-4 py-2 rounded-xl border border-[#D5CABB] text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
