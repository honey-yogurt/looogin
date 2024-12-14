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
  const session = await auth();
  console.log("API Session:", session);
  
  if (!session?.user?.id) {
    console.log("No user in session");
    throw new Error("Unauthorized");
  }

  // 打印更多调试信息
  console.log("Looking for user with ID:", session.user.id);

  // 尝试查找用户，但不抛出错误
  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  console.log("Found user:", user);

  // 如果找不到用户，直接使用 session 中的用户信息
  const contextUser = user || {
    id: session.user.id,
    email: session.user.email,
    role: session.user.role
  };

  return enhance(db, { 
    user: contextUser
  });
}

// 创建一个通用的请求处理器 handler
const handler = NextRequestHandler({ 
  getPrisma, 
  useAppDir: true,
  onError: (err, req) => {
    console.error("API Error:", {
      error: err,
      url: req.url,
      method: req.method
    });
    return new Response(JSON.stringify({
      error: err.message,
      details: err
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// 将 handler 作为多个 HTTP 方法的处理器导出，包括 GET、POST、PUT、PATCH 和 DELETE。
// 这意味着这个文件可以处理所有这些方法的请求，并根据请求路径自动执行相应的数据库操作。
export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
