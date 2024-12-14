'use client'

import { useState } from "react"
import { ImageGallery } from "./ImageGallery"
import { ProductInfo } from "./ProductInfo"
import type { Product, User, ProductImage, productAttribute as ProductAttribute } from "@prisma/client"

interface ProductDetailProps {
  product: Product & {
    owner: User
    detailImages: ProductImage[]
    attributes: ProductAttribute[]
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex gap-8">
        <ImageGallery 
          mainImage={product.image}
          detailImages={product.detailImages}
        />
        <ProductInfo product={product} />
      </div>
    </div>
  )
} 