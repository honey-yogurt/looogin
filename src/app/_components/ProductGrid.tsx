'use client'

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useFindManyProduct } from "@/lib/hooks/product"
import type { Product, User } from "@prisma/client"
import { FilterBar } from "./FilterBar"

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState("猜你喜欢")

  // 查询商品数据
  const {data: products, isLoading: isLoadingProducts} = useFindManyProduct({
    where: {
      label: activeFilter === '猜你喜欢' ? undefined : activeFilter
    },
    orderBy: activeFilter === '猜你喜欢' 
      ? { popularity: 'desc' }
      : { wants: 'desc' },
    include: {
      owner: true
    },
  })

  if (isLoadingProducts) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <FilterBar 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* 商品网格 */}
      <div className="grid grid-cols-5 gap-4">
        {products?.map((product: Product & { 
          owner: User 
        }) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-red-500 font-bold">¥{product.price}</span>
                <span className="text-gray-500 text-xs">{product.wants}人想要</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img 
                  src={product.owner.image || "/images/avatar1.jpg"}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-gray-500">
                  {product.owner.name}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 