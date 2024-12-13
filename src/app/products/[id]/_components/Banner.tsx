'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Banner() {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src="/logo.png" alt="闲鱼" className="h-8" />
        </div>
        <div className="flex items-center gap-4 flex-1 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Input 
              placeholder="搜索想要的宝贝" 
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <Button>搜索</Button>
        </div>
      </div>
    </div>
  )
} 