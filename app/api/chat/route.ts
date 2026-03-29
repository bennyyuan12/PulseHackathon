import { NextResponse } from "next/server";
import { getNurseClaraReply } from "@/lib/nurse-clara";

export async function POST(request: Request) {
  try {
    const { message, context } = (await request.json()) as { message?: string; context?: "home" | "activity" | "post" | "general" };

    if (!message?.trim()) {
      return NextResponse.json({ response: "I’m here with you. Let’s take this one step at a time." }, { status: 400 });
    }

    const response = getNurseClaraReply(message, context ?? "general");

    return NextResponse.json({ response });
  } catch {
    return NextResponse.json({ response: "I’m here with you. Let’s take this one step at a time." }, { status: 200 });
  }
}
