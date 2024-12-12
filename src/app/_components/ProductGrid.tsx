'use client'

import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useFindManyProduct } from "@/lib/hooks/product"

export function ProductGrid() {
  const [activeFilter, setActiveFilter] = useState("猜你喜欢")
  
  const filters = [
    { label: "猜你喜欢", active: activeFilter === "猜你喜欢" },
    { label: "个人闲置", active: activeFilter === "个人闲置" },
    { label: "摄影摄像", active: activeFilter === "摄影摄像" },
    // ... 其他筛选项
  ]

  // 查询商品数据
  const {data: products,isLoading} = useFindManyProduct({
    where: {
      label: activeFilter === '猜你喜欢' ? undefined : activeFilter // 如果是“猜你喜欢”，则不使用 label 过滤
    },
    orderBy: activeFilter === '猜你喜欢' 
      ? { popularity: 'desc' } // 根据 popularity 排序
      : { wants: 'desc' }, // 否则根据 wants 排序
    // 包含用户信息
    include: {
      owner: true
    },
  })

  if (isLoading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      {/* 筛选栏 */}
      <div className="bg-white rounded-lg mb-4 p-4">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter.label)}
              className={`px-4 py-1 rounded-full whitespace-nowrap text-sm transition-colors
                ${filter.label === activeFilter 
                  ? 'bg-yellow-400 text-black font-medium' 
                  : 'hover:bg-gray-100'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-5 gap-4">
        {products?.map((product) => (
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