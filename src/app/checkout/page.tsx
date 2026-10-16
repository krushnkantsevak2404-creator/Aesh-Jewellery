"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  Building2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { formatINR, isValidIndianPincode, isValidIndianMobile } from "../../lib/utils";
import { indianStates, defaultSiteConfig } from "../../lib/config/siteConfig";
import { CustomerDetails, PaymentMethod } from "../../lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingFee, grandTotal, clearCart } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "Gujarat",
    pincode: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty and user comes directly
  if (cart.length === 0) {
    return (
      <div className="py-24 text-center bg-[#FCFBF7] min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F] mb-2">
          Your shopping bag is empty
        </h2>
        <p className="text-xs text-[#666] mb-6">
          Add items to your bag before checking out.
        </p>
        <Link
          href="/shop"
          className="px-6 py-2.5 rounded-xl bg-[#5C1327] text-white text-xs font-semibold"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    if (!customer.fullName.trim() || customer.fullName.trim().length < 3) {
      errs.fullName = "Please enter your full name.";
    }

    if (!isValidIndianMobile(customer.mobile)) {
      errs.mobile = "Please enter a valid 10-digit Indian mobile number.";
    }

    if (!customer.email.trim() || !customer.email.includes("@")) {
      errs.email = "Please enter a valid email address.";
    }

    if (!customer.address.trim() || customer.address.trim().length < 5) {
      errs.address = "Please enter your complete delivery street address.";
    }

    if (!customer.city.trim()) {
      errs.city = "Please enter your city.";
    }

    if (!isValidIndianPincode(customer.pincode)) {
      errs.pincode = "Please enter a valid 6-digit Indian PIN code.";
    }

    if (paymentMethod === "upi" && upiId && !upiId.includes("@")) {
      errs.upi = "Please enter a valid VPA address (e.g. yourname@okhdfcbank).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = "SC-" + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: "order-" + Date.now(),
        orderNumber,
        customer,
        items: cart,
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: grandTotal,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
        orderStatus: "Confirmed",
        estimatedDelivery: "3-5 business days",
        createdAt: new Date().toISOString(),
      };

      // Call API route to save order
      try {
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        });
      } catch {
        // Fallback to localStorage simulation
      }

      // Store current order for success screen
      localStorage.setItem("sevak_last_order", JSON.stringify(newOrder));

      // Clear cart
      clearCart();

      // Navigate to success
      router.push(`/checkout/success?order=${orderNumber}`);
    } catch {
      alert("There was an issue processing your order. Please try again or contact us on WhatsApp.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-[#ECE4D8] flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs text-[#8A8A8A] uppercase tracking-wider block mb-1">
              Guest Checkout
            </span>
            <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
              Delivery & Payment
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (7 cols): Customer & Address Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Contact Details */}
            <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DC]">
                <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
                  1. Contact Information
                </h3>
                <span className="text-xs text-[#888]">No account required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) =>
                      setCustomer({ ...customer, fullName: e.target.value })
                    }
                    placeholder="e.g. Pooja Varma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Mobile Number (for updates) <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={customer.mobile}
                      onChange={(e) =>
                        setCustomer({ ...customer, mobile: e.target.value })
                      }
                      placeholder="9879100000"
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Email Address (for invoice & tracking) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    placeholder="pooja.varma@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DC]">
                <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
                  2. Delivery Address in India
                </h3>
                <span className="text-xs text-[#888] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#5C1327]" />
                  Pan-India Shipping
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Flat / House No. / Building / Floor
                  </label>
                  <input
                    type="text"
                    value={customer.apartment}
                    onChange={(e) =>
                      setCustomer({ ...customer, apartment: e.target.value })
                    }
                    placeholder="Flat 402, Gokul Residency"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Street Address / Colony / Landmark <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                    placeholder="Near Shiv Temple, SG Highway"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                  {errors.address && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer({ ...customer, city: e.target.value })
                    }
                    placeholder="Ahmedabad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                  {errors.city && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    State <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={customer.state}
                    onChange={(e) =>
                      setCustomer({ ...customer, state: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    6-Digit Pincode <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={customer.pincode}
                    onChange={(e) =>
                      setCustomer({ ...customer, pincode: e.target.value })
                    }
                    placeholder="380015"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                  {errors.pincode && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer({ ...customer, notes: e.target.value })
                    }
                    placeholder="e.g. Please leave with security"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-[#ECE4D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DC]">
                <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
                  3. Select Payment Option
                </h3>
                <span className="text-xs text-[#C5A059] font-medium">
                  Verified Payment Gateway Ready
                </span>
              </div>

              {/* Payment Method Selector Cards */}
              <div className="space-y-3 text-xs">
                {/* UPI Card */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === "upi"
                      ? "border-[#5C1327] bg-[#FDF8F9]"
                      : "border-[#ECE4D8] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="mt-1 accent-[#5C1327]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1F1F1F] flex items-center gap-1.5">
                        <QrCode className="w-4 h-4 text-[#5C1327]" />
                        UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                        INSTANT & SECURE
                      </span>
                    </div>
                    <p className="text-[#666] text-[11px] mt-1">
                      Pay directly via any UPI app with QR code or VPA handle.
                    </p>

                    {paymentMethod === "upi" && (
                      <div className="mt-3 pt-2 border-t border-[#F0E8DC]">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter UPI ID (e.g. mobile@upi)"
                          className="w-full px-3 py-2 rounded-lg border border-[#D5CABB] bg-white text-xs focus:outline-hidden focus:border-[#5C1327]"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Card Option */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-[#5C1327] bg-[#FDF8F9]"
                      : "border-[#ECE4D8] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mt-1 accent-[#5C1327]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1F1F1F] flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-[#5C1327]" />
                        Debit / Credit Cards (Visa, RuPay, Mastercard)
                      </span>
                    </div>
                    <p className="text-[#666] text-[11px] mt-1">
                      Secure checkout via 3D Secure OTP verification.
                    </p>
                  </div>
                </label>

                {/* Net Banking */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === "netbanking"
                      ? "border-[#5C1327] bg-[#FDF8F9]"
                      : "border-[#ECE4D8] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "netbanking"}
                    onChange={() => setPaymentMethod("netbanking")}
                    className="mt-1 accent-[#5C1327]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1F1F1F] flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-[#5C1327]" />
                        Net Banking (All Indian Banks)
                      </span>
                    </div>
                    <p className="text-[#666] text-[11px] mt-1">
                      SBI, HDFC, ICICI, Axis, Kotak, and 50+ other banks.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-[#5C1327] bg-[#FDF8F9]"
                      : "border-[#ECE4D8] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 accent-[#5C1327]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1F1F1F] flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-[#5C1327]" />
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <p className="text-[#666] text-[11px] mt-1">
                      Pay cash at your doorstep upon receiving your package.
                    </p>
                  </div>
                </label>
              </div>

              {/* Razorpay Gateway Notice */}
              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#ECE4D8] text-[11px] text-[#666] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Payment Architecture:</strong> Configured for live Razorpay Indian Payment Gateway. In demo mode, orders complete instantly with mock confirmation and full tracking simulation.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Order Summary & Place Order */}
          <div className="lg:col-span-5 bg-[#FAF6F0] p-6 rounded-2xl border border-[#ECE4D8] space-y-6 sticky top-24">
            <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F] pb-3 border-b border-[#E8DFD0]">
              Items in Your Order ({cart.length})
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-2 bg-white rounded-xl border border-[#ECE4D8]"
                >
                  <div className="w-14 h-14 rounded-lg bg-[#FAF6F0] overflow-hidden relative shrink-0">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-[#1F1F1F] truncate">
                      {item.product.name}
                    </div>
                    <div className="text-[11px] text-[#7A7A7A]">
                      Qty: {item.quantity} • {item.product.colour}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#4A0E17]">
                    {formatINR(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-[#4A4A4A] border-t border-[#E8DFD0] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1F1F1F]">{formatINR(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount Applied</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#1F1F1F]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#1F1F1F] border-t border-[#E8DFD0] pt-3">
                <span>Total to Pay</span>
                <span className="text-[#4A0E17]">{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Processing Your Order...</span>
                ) : (
                  <>
                    <span>Place Order ({formatINR(grandTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#7A7A7A] text-center space-y-1">
                <p>
                  By placing your order, you agree to Sevak Creation&apos;s Terms of Service and Privacy Policy.
                </p>
                <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unboxing Replacement Guarantee Included</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
