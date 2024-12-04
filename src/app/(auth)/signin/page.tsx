'use client'

// 导入必要的组件和hooks
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Trophy } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Signin() {
  // 定义状态变量
  const [email, setEmail] = useState('') // 存储邮箱输入
  const [password, setPassword] = useState('') // 存储密码输入
  const [error, setError] = useState<string | null>(null) // 存储错误信息
  const [isLoading, setIsLoading] = useState(false) // 控制加载状态
  const router = useRouter() // 用于页面导航

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // 阻止表单默认提交行为
    setIsLoading(true) // 开始加载状态
    setError(null) // 清除之前的错误信息

    try {
      // 调用 NextAuth 的 signIn 方法进行身份验证
      const result = await signIn('credentials', {
        redirect: false, // 禁用自动重定向
        email,
        password,
      })

      if (result?.error) {
        setError('Invalid email or password') // 设置登录失败错误信息
      } else {
        router.push('/dashboard') // 登录成功，跳转到仪表板
        router.refresh() // 刷新页面状态
      }
    } catch (error) {
      setError('An error occurred. Please try again.') // 设置系统错误信息
    } finally {
      setIsLoading(false) // 结束加载状态
    }
  }

  return (
    // 登录卡片界面
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="space-y-3">
        <Trophy className="size-10 text-primary font-bold" /> {/* 显示奖杯图标 */}
        <CardTitle className="text-2xl font-semibold mt-10">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 邮箱输入框 */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-white/50 dark:bg-slate-800/50"
              required 
            />
          </div>
          {/* 密码输入框 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* 忘记密码链接 */}
              <Button variant="link" className="px-0 font-normal" asChild>
                <a href="/forgot-password">Forgot password?</a>
              </Button>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="bg-white/50 dark:bg-slate-800/50"
              required 
            />
          </div>
          {/* 错误信息显示 */}
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
            Sign in
          </Button>
        </form>
      </CardContent>
      {/* 注册链接 */}
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Don't have an account?{' '}
          <Button variant="link" className="px-0 font-normal" asChild>
            <a href="/signup">Create an account</a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
