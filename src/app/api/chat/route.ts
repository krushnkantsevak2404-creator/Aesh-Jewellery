import { NextResponse } from "next/server";
import { processAssistantQuery } from "../../../lib/ai-assistant";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message string is required" },
        { status: 400 }
      );
    }

    const result = await processAssistantQuery(message, history);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      {
        reply: "Namaste! I had a brief issue accessing our catalog. Feel free to explore our Shop directly or connect with Kishan & Aesha on WhatsApp!",
        recommendedProducts: [],
        actionChips: [{ label: "Chat on WhatsApp", action: "WHATSAPP" }],
      },
      { status: 500 }
    );
  }
}
