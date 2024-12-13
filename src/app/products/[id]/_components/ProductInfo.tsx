'use client'

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import type { Product, User, productAttribute as ProductAttribute } from "@prisma/client"

interface ProductInfoProps {
  product: Product & {
    owner: User
    attributes: ProductAttribute[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-medium mb-4">{product.name}</h1>
      
      <div className="mb-4">
        <div className="text-red-500 text-3xl font-bold">
          ¥{product.price}
        </div>
        <div className="text-gray-500 line-through">
          原价: ¥{product.oprice}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-gray-600">折旧程度：{product.depreciation}</div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">商品描述</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">商品属性</h3>
        <div className="grid grid-cols-2 gap-2">
          {product.attributes.map(attr => (
            <div key={attr.id} className="flex gap-2">
              <span className="text-gray-500">{attr.name}:</span>
              <span>{attr.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1">联系卖家</Button>
        <Button className="flex-1" variant="secondary">立即购买</Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}