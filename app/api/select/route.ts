import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemTitle, itemPrice, productUrl, message } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN || "8943281786:AAEFzeUupiA47IQwutAjn0pXS54rQvoQahw";
    const chatId = process.env.TELEGRAM_CHAT_ID || "5698313127";

    if (!itemTitle) {
      return NextResponse.json(
        { success: false, error: "Vui lòng chọn món quà hoặc dán link!" },
        { status: 400 }
      );
    }

    const telegramMessage = `💖 *THÔNG BÁO QUÀ 20/10 TỪ HIỀN* 💖\n\n` +
      `✨ *Món quà đã chọn:* ${itemTitle}\n` +
      (productUrl ? `🔗 *Đường dẫn sản phẩm:* ${productUrl}\n` : "") +
      `💬 *Lời nhắn gửi Hoàng:* "${message || "Yêu Hoàng nhất trên đời! ❤️"}"\n\n` +
      `🚀 *Hành động:* Hiền đã bấm nhận quà, chuẩn bị ship ngay nhé Hoàng ơi! ✨`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
        disable_web_page_preview: false,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error("Telegram API Error:", data);
      return NextResponse.json({
        success: true,
        warning: "Đã ghi nhận yêu cầu nhưng Telegram trả về lỗi cấu hình.",
        details: data
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Lỗi hệ thống khi gửi tin nhắn" },
      { status: 500 }
    );
  }
}
