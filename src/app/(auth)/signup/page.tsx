"use client"; // 声明这是一个客户端组件

// 导入必要的UI组件和功能hooks
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUser } from "@/lib/hooks";
import { Loader2, Trophy } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
  // 状态管理
  const [email, setEmail] = useState('') // 邮箱输入状态
  const [password, setPassword] = useState('') // 密码输入状态
  const [error, setError] = useState<string | null>(null) // 错误信息状态
  const [isLoading, setIsLoading] = useState(false) // 加载状态
  const { mutateAsync: signup } = useCreateUser() // 创建用户的mutation hook
  const router = useRouter() // 路由导航hook

  // 表单提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // 阻止表单默认提交行为
    setIsLoading(true) // 开始加载状态
    setError(null) // 清除之前的错误信息

    try {
      // 尝试创建新用户
      await signup({ data: { email, password } })
      
      // 用户创建成功后自动登录
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Failed to sign in after account creation') // 自动登录失败
      } else {
        router.push('/dashboard') // 登录成功，跳转到仪表板
        router.refresh() // 刷新页面状态
      }
    } catch (err: any) {
      // 错误处理逻辑
      if (err.info?.prisma && err.info?.code === 'P2002') {
        setError('An account with this email already exists') // 邮箱已存在错误
      } else {
        setError('An error occurred. Please try again.') // 通用错误提示
      }
    } finally {
      setIsLoading(false) // 结束加载状态
    }
  }

  return (
    // 主卡片容器，设置为透明背景无边框
    <Card className="border-none shadow-none bg-transparent">
      {/* 卡片头部：标题和说明 */}
      <CardHeader className="space-y-3">
        <Trophy className="size-10 text-primary font-bold" /> {/* 奖杯图标 */}
        <CardTitle className="text-2xl font-semibold mt-10">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>

      {/* 卡片内容：注册表单 */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 邮箱输入区域 */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-white/50 dark:bg-slate-800/50" // 半透明背景，支持暗色模式
              required 
            />
          </div>

          {/* 密码输入区域 */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-white/50 dark:bg-slate-800/50"
              required 
              minLength={8} // 密码最小长度要求
            />
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* 错误信息显示区域 */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/15 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* 提交按钮 */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> // 加载中动画
            )}
            Create account
          </Button>

          {/* 服务条款和隐私政策说明 */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Button variant="link" className="px-0 font-normal" asChild>
              <a href="/terms">Terms of Service</a>
            </Button>
            {' '}and{' '}
            <Button variant="link" className="px-0 font-normal" asChild>
              <a href="/privacy">Privacy Policy</a>
            </Button>
            .
          </p>
        </form>
      </CardContent>

      {/* 卡片底部：登录链接 */}
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Already have an account?{' '}
          <Button variant="link" className="px-0 font-normal" asChild>
            <a href="/signin">Sign in</a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
