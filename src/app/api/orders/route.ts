import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // Validate essential fields
    if (!orderData.customer || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order payload" },
        { status: 400 }
      );
    }

    // In a production environment with PostgreSQL, this writes to the `orders` and `order_items` tables.
    // For local simulation, we return confirmed status and order reference.
    return NextResponse.json({
      success: true,
      orderNumber: orderData.orderNumber || "SC-" + Math.floor(100000 + Math.random() * 900000),
      orderStatus: "Confirmed",
      message: "Order placed successfully",
      data: orderData,
    });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal order processing error" },
      { status: 500 }
    );
  }
}
