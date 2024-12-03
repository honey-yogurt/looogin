// 设置一个通用的 API 路由处理器，用于处理与数据库模型相关的 HTTP 请求。
// 这个文件通过结合用户认证、增强的 Prisma 客户端和通用请求处理器，
// 实现了一个灵活且安全的 API 路由，专门用于处理数据库模型的 CRUD 操作。
import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import type { User } from "@prisma/client";

// create an enhanced Prisma client with user context
async function getPrisma() {
  // 使用 auth() 函数获取当前用户的会话信息。
  const session = await auth();
  console.log("session", session);
  // 创建一个增强的 Prisma 客户端，
  // 这个增强的客户端可以在数据库操作中自动应用用户上下文，确保数据访问的安全性和正确性。
  return enhance(db, { user: session?.user as User });
}

// 创建一个通用的请求处理器 handler
const handler = NextRequestHandler({ getPrisma, useAppDir: true });

// 将 handler 作为多个 HTTP 方法的处理器导出，包括 GET、POST、PUT、PATCH 和 DELETE。
// 这意味着这个文件可以处理所有这些方法的请求，并根据请求路径自动执行相应的数据库操作。
export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
