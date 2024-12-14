import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import type { PrismaClient } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 * 模块扩充用于 `next-auth` 类型。允许我们向 `session` 对象添加自定义属性并保持类型安全。
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }

  // 添加这个接口声明
  interface User {
    role?: "ADMIN" | "USER";
  }
}

/**
 * Authorization function - handles user login verification
 * 认证函数 - 处理用户登录验证
 * @param prisma - Prisma client instance
 * @param prisma - Prisma 客户端实例
 */
function authorize(prisma: PrismaClient) {
  return async (
    credentials: Partial<Record<"email" | "password", unknown>>,
  ) => {
    // Check if necessary credentials are provided
    // 验证必要的认证信息是否存在
    if (!credentials) throw new Error("Missing credentials");
    if (!credentials.email)
      throw new Error('"email" is required in credentials');
    if (!credentials.password)
      throw new Error('"password" is required in credentials');

    // Find user by email
    // 通过邮箱查找用户
    const maybeUser = await prisma.user.findFirst({
      where: { email: credentials.email },
      select: { id: true, email: true, password: true, role: true },
    });
    
    // If user or password is not found, return null
    // 如果未找到用户或密码，返回 null
    if (!maybeUser?.password) return null;

    // Verify the input password with stored hash
    // 验证输入的密码与存储的哈希值
    const isValid = await compare(
      credentials.password as string,
      maybeUser.password,
    );
    
    // If password is invalid, return null
    // 如果密码无效，返回 null
    if (!isValid) return null;

    // Return user information if authentication is successful
    // 如果认证成功，返回用户信息
    return { 
      id: maybeUser.id, 
      email: maybeUser.email, 
      role: maybeUser.role as "ADMIN" | "USER" 
    };
  };
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 * NextAuth.js 的配置选项，用于配置适配器、提供者、回调等。
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  // Configure authentication providers
  // 配置认证提供者
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: authorize(db),
    }),
  ],
  
  // Use Prisma adapter to connect to the database
  // 使用 Prisma 适配器连接数据库
  adapter: PrismaAdapter(db),
  
  // Configure session strategy as JWT
  // 配置会话策略为 JWT
  session: {
    strategy: "jwt",
  },
  
  // Configure callback functions
  // 配置回调函数
  callbacks: {
    // JWT callback - add user role to the token
    // JWT 回调 - 在 token 中添加用户角色
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Session callback - construct session object
    // Session 回调 - 构建会话对象
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: (token.id as string) || token.sub!,
          role: token.role as "ADMIN" | "USER"
        },
      };
    },
  },
} satisfies NextAuthConfig;
