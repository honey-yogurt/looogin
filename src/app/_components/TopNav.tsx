'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TopNav() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="闲鱼" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">闲鱼</span>
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
            <Button variant="ghost">登录</Button>
            <Button>发布</Button>
          </div>
        </div>
      </div>
    </header>
  )
} 