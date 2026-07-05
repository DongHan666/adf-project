import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADF - AI 戏剧工厂",
  description: "AI 影视导演 · 创意孵化中心",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-zinc-950 text-white">{children}</body>
    </html>
  );
}