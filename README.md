# 💖 Món Quà 20/10 Đặc Biệt (Dành tặng Hiền từ Hoàng)

Website tương tác lãng mạn được thiết kế riêng làm quà tặng ngày 20/10, kết hợp chuỗi minigame vui nhộn (lật hộp quà, vòng quay may mắn) và danh mục chọn quà trang sức cao cấp.

---

## 1. Tổng quan dự án

- **Mục đích:** Tạo bất ngờ lãng mạn, vui nhộn và cho phép người nhận (Hiền) lựa chọn món quà ưng ý nhất (hoặc tự dán link sản phẩm yêu thích) để gửi yêu cầu trực tiếp về điện thoại của người tặng (Hoàng).
- **Đối tượng:** Hiền (người nhận) & Hoàng (người tặng).
- **Công nghệ chính:**
  - **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
  - **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
  - **Animation & Effects:** [Framer Motion](https://www.framer.com/motion/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti), [Lucide React](https://lucide.dev/)
  - **Backend & Integration:** Next.js API Routes, Telegram Bot API (gửi thông báo thời gian thực)

---

## 2. Cấu trúc thư mục & File chính

```text
├── app/
│   ├── api/
│   │   └── select/
│   │       └── route.ts         # API route xử lý gửi thông báo qua Telegram Bot
│   ├── favicon.ico              # Biểu tượng trang web
│   ├── globals.css              # Cấu hình Tailwind CSS & hiệu ứng toàn cục
│   ├── layout.tsx               # Root Layout của ứng dụng Next.js
│   └── page.tsx                 # Màn hình chính chứa toàn bộ 5 bước trải nghiệm (Step 1 -> 5)
├── data/
│   └── earrings.ts              # Cơ sở dữ liệu danh sách sản phẩm bông tai (Huy Thanh, PNJ, Lili, Pandora)
├── public/
│   ├── music.mp3                # Nhạc nền lãng mạn
│   └── earrings/                # Hình ảnh các mẫu bông tai
├── AGENTS.md                    # Quy chuẩn Next.js Agent Rules
├── CLAUDE.md                    # Hướng dẫn phát triển
├── next.config.ts               # Cấu hình Next.js
├── package.json                 # Danh sách dependencies & scripts
└── tsconfig.json                # Cấu hình TypeScript
```

---

## 3. Luồng hoạt động của trang web (User Flow)

1. **Step 1 (Chào mừng):** Hiển thị lời chào *"Chào bạn Hiền! 👋"* và lời mời tham gia chuỗi minigame kèm âm nhạc nền lãng mạn.
2. **Step 2 (Lật mở hộp quà):** Minigame lật 1 trong 5 hộp quà bí mật với hiệu ứng vui nhộn (suýt trúng du thuyền/100 triệu) để dẫn tới lượt quay may mắn.
3. **Step 3 (Vòng quay may mắn):** Vòng quay SVG 6 ô với kịch bản quay giật gân (khựng lại ở 100 triệu rồi chốt hạ chuẩn xác vào ô *"💎 Đôi Bông Tai"*).
4. **Step 4 (Chọn quà / Bông tai):** 
   - Hiển thị danh mục bông tai phong phú phân loại theo thương hiệu (*Huy Thanh, PNJ, Lili, Pandora*).
   - Cho phép xem link chi tiết sản phẩm, chọn mẫu có sẵn hoặc dán link tùy chỉnh bất kỳ.
   - Nhập lời nhắn gửi đến Hoàng và bấm **"Nhận quà ngay"**.
5. **Step 5 (Hoàn tất):** Hiển thị màn hình xác nhận *"Đã gửi yêu cầu thành công! 💖"* và thông báo *"Yêu cầu món quà [Tên quà] kèm lời nhắn đã được gửi đến Hoàng!"*, đồng thời kích hoạt pháo hoa ăn mừng (`canvas-confetti`).

---

## 4. Cơ chế tích hợp Telegram API

- **Cách thức hoạt động:** Khi người dùng bấm nhận quà ở Step 4, frontend gửi request POST đến `app/api/select/route.ts`. API route sử dụng `fetch` gọi Telegram Bot API (`https://api.telegram.org/bot<TOKEN>/sendMessage`).
- **Nội dung tin nhắn:** Định dạng Markdown làm nổi bật tên quà, link sản phẩm, lời nhắn và trạng thái.
- **Biến môi trường (Environment Variables):**
  - `TELEGRAM_BOT_TOKEN`: Token của Telegram Bot.
  - `TELEGRAM_CHAT_ID`: Chat ID của người nhận thông báo.
  *(Có tích hợp fallback token & chat_id trong mã nguồn để đảm bảo luôn hoạt động ổn định).*

---

## 5. Quy trình Deployment & Git

- **Git Workflow:** 
  ```bash
  git add .
  git commit -m "Commit message"
  git push origin main
  ```
- **Deployment:** Dự án được cấu hình chuẩn cho Vercel (Next.js App Router). Mỗi khi push code lên nhánh `main` trên GitHub, Vercel sẽ tự động build và cập nhật phiên bản mới nhất.

---

## 6. Footer & Bản quyền

- Hiển thị trang nhã ở chân trang: `Made with ❤️ for Hiền by Hoàng`.
