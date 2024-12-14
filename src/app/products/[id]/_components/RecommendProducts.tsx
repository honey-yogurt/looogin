'use client'

import { useFindManyProduct } from "@/lib/hooks/product"
import { Card } from "@/components/ui/card"
import type { Product, User } from "@prisma/client"
import { useRouter } from "next/navigation"

interface RecommendProductsProps {
  currentProductId: string
}

export function RecommendProducts({ currentProductId }: RecommendProductsProps) {
  const router = useRouter()

  const { data: products } = useFindManyProduct({
    where: {
      id: { not: currentProductId },
    },
    orderBy: { popularity: 'desc' },
    take: 5,
    include: {
      owner: true
    }
  })

  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium mb-4">为你推荐</h2>
      <div className="grid grid-cols-5 gap-4">
        {products?.map((product: Product & { owner: User }) => (
          <Card 
            key={product.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => router.push(`/products/${product.id}`)}
          >
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
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}