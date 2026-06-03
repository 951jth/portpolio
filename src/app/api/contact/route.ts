import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: "Email and message are required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.PANDYTALK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("⚠️ PANDYTALK_WEBHOOK_URL is not defined in environment variables.");
      // 임시로 성공 처리 (Webhook이 연결될 때까지)
      return NextResponse.json({ success: true });
    }

    // Pandytalk Webhook으로 데이터 전송
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "portfolio",
        email,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error(`Webhook failed with status: ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send message to Pandytalk:", error);
    return NextResponse.json(
      { success: false, error: "메시지 전송에 실패했습니다. 나중에 다시 시도해 주세요." },
      { status: 500 }
    );
  }
}
