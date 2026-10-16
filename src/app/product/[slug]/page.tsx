import { notFound } from "next/navigation";
import { products } from "../../../lib/data/products";
import ProductDetailView from "../../../components/product/ProductDetailView";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolved = await params;
  const product = products.find((p) => p.slug === resolved.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Sevak Creation`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Sevak Creation`,
      description: product.shortDescription,
      images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolved = await params;
  const product = products.find((p) => p.slug === resolved.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
