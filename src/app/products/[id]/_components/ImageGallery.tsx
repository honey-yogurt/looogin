'use client'

import { useState } from "react"
import type { ProductImage } from "@prisma/client"
import { cn } from "@/lib/utils"

interface ImageGalleryProps {
  mainImage: string
  detailImages: ProductImage[]
}

export function ImageGallery({ mainImage, detailImages }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)
  const allImages = [mainImage, ...detailImages.map(img => img.url)]

  return (
    <div className="flex gap-4">
      {/* 缩略图列表 */}
      <div className="flex flex-col gap-2">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "w-16 h-16 border rounded cursor-pointer",
              selectedImage === image && "border-primary"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* 主图展示 */}
      <div className="w-[500px] h-[500px]">
        <img
          src={selectedImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
} 