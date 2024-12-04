// 声明这是一个客户端组件 - Next.js 13+ 中的约定
// 因为以下的 providers 都需要在客户端环境中运行
"use client";

// 导入必要的组件和类型
// Toaster: 用于显示优雅的通知提示（toast notifications）
import { Toaster } from "sonner";
// React Query 相关: 用于数据获取、缓存和状态管理
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// NextAuth 的会话提供者: 用于处理认证状态
import { SessionProvider } from "next-auth/react";
// React 类型和核心包
import type { ReactNode } from "react";
import React from "react";

// 创建一个新的 QueryClient 实例
// 这个客户端会处理所有的数据请求缓存和状态管理
const queryClient = new QueryClient();

// Providers 组件: 应用的全局上下文提供者
// 参数 children: 代表所有将被包裹的子组件
export default function Providers({ children }: { children: ReactNode }) {
  return (
    // QueryClientProvider: 提供 React Query 功能
    // 使得子组件可以使用 useQuery, useMutation 等 hooks
    <QueryClientProvider client={queryClient}>
      {/* SessionProvider: 提供认证会话状态
          使得子组件可以使用 useSession hook 访问用户会话信息 */}
      <SessionProvider>{children}</SessionProvider>
      {/* Toaster: 提供全局 toast 通知功能
          通常用于显示操作成功/失败的提示信息 */}
      <Toaster />
    </QueryClientProvider>
  );
}
