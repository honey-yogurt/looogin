// 声明这是一个客户端组件
"use client";

// 导入全局样式文件
import "@/styles/globals.css";

// 导入 Manrope 字体
// next/font/google 提供了 Google Fonts 的优化加载方式
import { Manrope } from "next/font/google";
// 导入我们之前定义的 Providers 组件
import Providers from "./providers";

// 配置 Manrope 字体
// subsets: 指定要加载的字符集
// variable: 定义 CSS 变量名，可以在样式中使用
const manrope = Manrope({
  subsets: ["latin"],  // 加载拉丁字符集
  variable: "--font-sans",  // 定义 CSS 变量名
});

// RootLayout: Next.js 13+ 的根布局组件
// 这个组件会包裹应用中的所有页面
export default function RootLayout({
  children,  // children 代表所有子页面/组件
}: {
  children: React.ReactNode;
}) {
  return (
    // 设置 HTML 语言属性为中文
    <html lang="zh">
      {/* 
        body 类名组合：
        - font-sans: 使用无衬线字体
        - manrope.variable: 应用 Manrope 字体的 CSS 变量
      */}
      <body className={`font-sans ${manrope.variable}`}>
        {/* 
          使用 Providers 组件包裹整个应用
          提供认证、数据查询、通知等功能
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
