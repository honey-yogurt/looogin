// 导入 NextAuth，这是 Next.js 的身份认证库
import NextAuth from "next-auth";
// 导入 React 的 cache 函数，用于缓存认证状态
import { cache } from "react";

// 导入认证配置
import { authConfig } from "./config";

// 从 NextAuth 初始化并解构出核心认证功能
// auth: 用于验证用户会话
// handlers: 处理认证相关的 API 路由
// signIn: 登录功能
// signOut: 登出功能
const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

// 使用 React 的 cache 函数包装 auth
// 这样可以在服务器组件中缓存认证状态，提高性能
const auth = cache(uncachedAuth);

// 导出所有认证相关的功能，供其他文件使用
export { auth, handlers, signIn, signOut };
