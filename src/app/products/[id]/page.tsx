'use client'

import { Banner } from './_components/Banner'
import { SellerInfo } from './_components/SellerInfo'
import { ProductDetail } from './_components/ProductDetail'
import { RecommendProducts } from './_components/RecommendProducts'
import { useFindUniqueProduct } from '@/lib/hooks/product'
import { useParams } from 'next/navigation'

export default function ProductPage() {
  const { id } = useParams()
  const { data: product, isLoading } = useFindUniqueProduct({
    where: { id: id as string },
    include: {
      owner: true,
      detailImages: true,
      attributes: true,
    }
  })

  if (isLoading) return <div>加载中...</div>
  if (!product) return <div>商品不存在</div>

  return (
    <div className="min-h-screen">
      <Banner />
      <div className="max-w-7xl mx-auto px-4">
        <SellerInfo owner={product.owner} />
        <ProductDetail product={product} />
        <RecommendProducts 
          currentProductId={product.id}
          currentProductLabels={product.labels}
        />
      </div>
    </div>
  )
}