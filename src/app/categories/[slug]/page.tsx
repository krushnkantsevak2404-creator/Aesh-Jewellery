import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";
import { categories } from "../../../lib/data/categories";
import { products } from "../../../lib/data/products";
import ProductCard from "../../../components/product/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolved = await params;
  const category = categories.find((c) => c.slug === resolved.slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} Collection`,
    description: category.description,
  };
}

export default async function CategoryListingPage({ params }: CategoryPageProps) {
  const resolved = await params;
  const category = categories.find((c) => c.slug === resolved.slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (p) => p.categorySlug === category.slug
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
          <Link href="/categories" className="hover:text-[#5C1327]">
            Categories
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1F1F1F] font-semibold">{category.name}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#3A0C16] text-white p-8 sm:p-12 mb-12 shadow-md">
          <div className="absolute inset-0 z-0">
            <Image
              src={category.image}
              alt={category.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#2D0711] via-[#3A0C16]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C1327] border border-[#C5A059]/40 text-[#E5C46B] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Collection</span>
            </div>

            <h1 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              {category.name}
            </h1>

            <p className="text-sm text-[#E0D5C7] leading-relaxed">
              {category.description}
            </p>

            <div className="pt-2 text-xs text-[#C5A059] font-medium">
              Showing {categoryProducts.length} curated designs
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] p-6">
            <p className="text-sm text-[#666]">
              New handcrafted {category.name.toLowerCase()} are currently being crafted in our workshop!
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
