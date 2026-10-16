import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";
import { seasonalCollections } from "../../../lib/data/collections";
import { products } from "../../../lib/data/products";
import ProductCard from "../../../components/product/ProductCard";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seasonalCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const resolved = await params;
  const collection = seasonalCollections.find((c) => c.slug === resolved.slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.name} | Sevak Creation`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const resolved = await params;
  const collection = seasonalCollections.find((c) => c.slug === resolved.slug);

  if (!collection) {
    notFound();
  }

  // Filter products matching this collection
  const matchingProducts = products.filter(
    (p) =>
      p.seasons.includes(collection.slug as any) ||
      p.occasions.includes(collection.slug as any) ||
      (collection.curatedCategories &&
        collection.curatedCategories.includes(p.categorySlug))
  );

  return (
    <div className="py-8 sm:py-12 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#8A8A8A] uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-[#5C1327]">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/collections" className="hover:text-[#5C1327]">
            Collections
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1F1F1F] font-semibold">{collection.name}</span>
        </nav>

        {/* Collection Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D0711] text-white p-8 sm:p-14 mb-12 shadow-lg">
          <div className="absolute inset-0 z-0">
            <Image
              src={collection.bannerImage}
              alt={collection.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#2D0711]/95 via-[#4A0E17]/85 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059] text-[#1F1F1F] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{collection.badgeText}</span>
            </div>

            <h1 className="font-brand-serif text-3xl sm:text-5xl font-normal text-white">
              {collection.name}
            </h1>

            <p className="text-base sm:text-lg text-[#E5C46B] font-light">
              &ldquo;{collection.tagline}&rdquo;
            </p>

            <p className="text-sm text-[#E0D5C7] leading-relaxed max-w-xl">
              {collection.description}
            </p>

            <div className="pt-2 text-xs text-amber-200/90 font-medium">
              Showing {matchingProducts.length} festive designs curated for this edit
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {matchingProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] p-6">
            <p className="text-sm text-[#666]">
              Products for {collection.name} are being added! Check out our full shop.
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-block px-6 py-2.5 rounded-xl bg-[#5C1327] text-white text-xs font-semibold"
            >
              Browse All Jewellery
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
