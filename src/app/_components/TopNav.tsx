'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from 'lucide-react'
import { useState } from 'react'

export function TopNav() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  // 添加延时处理，避免菜单闪烁
  let closeTimeout: NodeJS.Timeout

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsOpen(false)
    }, 100) // 100ms 延迟关闭，提供更好的用户体验
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="跳蚤" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">跳蚤</span>
            </Link>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input 
                placeholder="搜索" 
                className="w-full pl-10"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                🔍
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                  <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        {session.user?.email?.split('@')[0]}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-40"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <User size={16} />
                          <span>账户中心</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 text-destructive"
                      >
                        <LogOut size={16} />
                        <span>退出登录</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
                <Button asChild>
                  <Link href="/orders">我的订单</Link>
                </Button>
              </>
            ) : (
              <>
               {/* 为每个按钮添加了 asChild 属性，这允许按钮将其属性传递给子元素。
            子元素：children 标签内部的内容就是子元素，Link 就是 Button 的子元素。
            asChild 属性：Button 组件的样式（比如颜色、阴影等）会应用到 Link 上，避免了不必要的标签嵌套
            */}  
                <Button variant="ghost" asChild>
                  <Link href="/signin">登录</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">注册</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 