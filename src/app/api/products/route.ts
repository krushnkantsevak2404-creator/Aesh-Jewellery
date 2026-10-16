import { NextResponse } from "next/server";
import { products } from "../../../lib/data/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const occasion = searchParams.get("occasion");
  const season = searchParams.get("season");
  const limit = searchParams.get("limit");

  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.categorySlug === category);
  }

  if (occasion && occasion !== "all") {
    filtered = filtered.filter((p) => p.occasions.includes(occasion as any));
  }

  if (season && season !== "all") {
    filtered = filtered.filter((p) => p.seasons.includes(season as any));
  }

  if (limit) {
    filtered = filtered.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    products: filtered,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      product: body,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
