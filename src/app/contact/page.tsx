"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  Send,
} from "lucide-react";
import InstagramIcon from "../../components/ui/InstagramIcon";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", mobile: "", orderNumber: "", message: "" });
  };

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Kishan & Aesha! ✨ I am reaching out through the Sevak Creation contact page."
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Customer Care
          </span>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1 mb-3">
            Contact Sevak Creation
          </h1>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#666]">
            Have a question about an upcoming festive order, sizing, or styling advice? Kishan & Aesha are happy to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-[#ECE4D8] space-y-6">
            <h2 className="font-brand-serif text-xl font-bold text-[#1F1F1F]">
              Get in Touch Directly
            </h2>

            {/* Quick WhatsApp Action Card */}
            <div className="p-4 rounded-2xl bg-emerald-700 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                <MessageCircle className="w-4 h-4" />
                <span>Fastest Response</span>
              </div>
              <p className="text-xs leading-relaxed text-emerald-100">
                For order status, custom inquiries, and unboxing video assistance, WhatsApp is our quickest channel.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-50 transition"
              >
                <span>Chat on WhatsApp</span>
                <span>→</span>
              </a>
            </div>

            <div className="space-y-4 text-xs text-[#4A4A4A]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#ECE4D8] flex items-center justify-center text-[#5C1327] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1F1F] block">Phone / WhatsApp</span>
                  <span>{defaultSiteConfig.contact.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#ECE4D8] flex items-center justify-center text-[#5C1327] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1F1F] block">Email Support</span>
                  <a href={`mailto:${defaultSiteConfig.contact.email}`} className="hover:text-[#5C1327]">
                    {defaultSiteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#ECE4D8] flex items-center justify-center text-[#5C1327] shrink-0">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1F1F] block">Instagram</span>
                  <a
                    href={defaultSiteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#5C1327]"
                  >
                    @{defaultSiteConfig.contact.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#ECE4D8] flex items-center justify-center text-[#5C1327] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1F1F] block">Location</span>
                  <span>{defaultSiteConfig.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#ECE4D8] flex items-center justify-center text-[#5C1327] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#1F1F1F] block">Working Hours</span>
                  <span>{defaultSiteConfig.contact.supportHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE4D8] shadow-xs">
            <h2 className="font-brand-serif text-xl font-bold text-[#1F1F1F] mb-1">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#666] mb-6">
              Fill out this form and we will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-sm">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-emerald-700">
                  Thank you for writing to us. Kishan or Aesha will reply to your email or WhatsApp promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4A4A4A] font-semibold mb-1">
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Patel"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4A4A] font-semibold mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="9879100000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#4A4A4A] font-semibold mb-1">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4A4A] font-semibold mb-1">
                      Order ID (if applicable)
                    </label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. SC-829104"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#4A4A4A] font-semibold mb-1">
                    Your Message / Inquiry <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the jewellery design, delivery timeline, or styling inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CABB] bg-[#FAF7F2] text-[#1F1F1F] focus:outline-hidden focus:border-[#5C1327]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
