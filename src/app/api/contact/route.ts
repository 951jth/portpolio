import { NextResponse } from "next/server";

const CONTACT_FAILURE_MESSAGE =
  "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.";

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
    console.log("Received contact message:", { email, message });
    console.log("webhookUrl configured:", Boolean(webhookUrl));

    if (!webhookUrl) {
      console.error(
        "PANDYTALK_WEBHOOK_URL is not defined in environment variables."
      );
      return NextResponse.json(
        {
          success: false,
          error: "문의 접수 설정이 누락되었습니다. 관리자에게 문의해주세요.",
        },
        { status: 500 }
      );
    }

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
      const errorText = await res.text().catch(() => "");
      console.error("Pandytalk webhook failed:", {
        status: res.status,
        body: errorText,
      });
      return NextResponse.json(
        {
          success: false,
          error: CONTACT_FAILURE_MESSAGE,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send message to Pandytalk:", error);
    return NextResponse.json(
      { success: false, error: CONTACT_FAILURE_MESSAGE },
      { status: 500 }
    );
  }
}
