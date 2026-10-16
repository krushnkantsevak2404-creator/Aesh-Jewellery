import React from "react";
import Link from "next/link";
import { RotateCcw, AlertTriangle, ShieldCheck } from "lucide-react";
import { defaultSiteConfig } from "../../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../../lib/utils";

export const metadata = {
  title: "Return & Refund Policy | Sevak Creation",
  description: "Read Sevak Creation's 5-day replacement policy, unboxing video guidelines, and transit damage guarantees.",
};

export default function ReturnsPolicyPage() {
  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Kishan & Aesha! I would like to report an issue with my received package."
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Policy & Information
          </span>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1 mb-2">
            Return, Replacement & Refund Policy
          </h1>
          <p className="text-xs text-[#888]">Last updated: October 2026</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE4D8] space-y-6 text-xs text-[#4A4A4A] leading-relaxed shadow-xs">
          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              1. Our 5-Day Replacement Promise
            </h2>
            <p>
              We take immense pride in the craftsmanship and safe packaging of every Sevak Creation piece. If your order arrives with transit damage, broken parts, missing mirrors, or an incorrect item, we offer an immediate <strong>free replacement or store credit</strong> within 5 days of delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>2. Mandatory Unboxing Video Requirement</span>
            </h2>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-2">
              <p className="font-semibold">
                To protect against fraudulent claims while swiftly resolving genuine transit damages, an unboxing video is required:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Video must start before opening the outer courier flyer or tape.</li>
                <li>The shipping label with your address and tracking number must be clearly visible.</li>
                <li>The video must be continuous and unedited from start to finish.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              3. Hygiene & Safety Exclusions
            </h2>
            <p>
              Due to strict health and sanitation regulations governing personal wearable ornaments (such as pierced earrings, haathphool, and body jewellery), we cannot accept returns for change of mind or personal styling remorse once opened.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              4. How to Initiate a Replacement Claim
            </h2>
            <p>
              Simply share your Order Number along with the unboxing video with our founders on WhatsApp at{" "}
              <strong>{defaultSiteConfig.contact.phone}</strong> or email us at{" "}
              <strong>{defaultSiteConfig.contact.email}</strong>. Our team reviews and responds within 24 hours to dispatch your replacement.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition"
              >
                <span>Initiate Claim on WhatsApp</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
