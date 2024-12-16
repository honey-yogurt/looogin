'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCreateProduct, useFindManyCategory } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ImageUpload } from "./_components/ImageUpload"
import { CategorySelect } from "./_components/CategorySelect"
import { useSession } from "next-auth/react"

export default function NewProductPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { mutateAsync: createProduct } = useCreateProduct()
  const { data: categories } = useFindManyCategory()
  
  const [isLoading, setIsLoading] = useState(false)
  const [mainImage, setMainImage] = useState("")
  const [detailImages, setDetailImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oprice: "",
    description: "",
    depreciation: "全新",
    categoryId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) {
      toast.error("请先登录")
      return
    }

    const userId: string = session.user.id

    if (!formData.categoryId) {
      toast.error("请选择商品分类")
      return
    }

    try {
      setIsLoading(true)
      
      if (!mainImage) {
        toast.error("请上传主图")
        return
      }

      const product = await createProduct({
        data: {
          name: formData.name,
          price: parseFloat(formData.price),
          oprice: parseFloat(formData.oprice),
          description: formData.description,
          depreciation: formData.depreciation,
          image: mainImage,
          status: "AVAILABLE",
          ownerId: userId,
          quantity: 1,
          categoryId: formData.categoryId,
          wants: 0,
          popularity: 0,
          detailImages: {
            create: detailImages.filter(Boolean).map((url, index) => ({
              url,
              order: index
            }))
          }
        }
      })

      if (product?.id) {
        toast.success("发布成功")
        router.push(`/products/${product.id}`)
      }
    } catch (error) {
      toast.error("发布失败")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">发布闲置</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 主图上传 */}
        <div className="space-y-2">
          <Label>商品主图</Label>
          <ImageUpload
            value={mainImage}
            onChange={setMainImage}
            className="w-full h-60"
          />
        </div>

        {/* 详情图上传 */}
        <div className="space-y-2">
          <Label>详情图片（可选，最多5张）</Label>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <ImageUpload
                key={index}
                value={detailImages[index] || ""}
                onChange={(url) => {
                  const newImages = [...detailImages]
                  newImages[index] = url
                  setDetailImages(newImages)
                }}
                className="w-full h-32"
              />
            ))}
          </div>
        </div>

        {/* 基本信息 */}
        <div className="space-y-4">
          {/* 分类选择 */}
          <div>
            <Label htmlFor="categoryId">商品分类</Label>
            <CategorySelect
              value={formData.categoryId}
              onChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
            />
          </div>

          <div>
            <Label htmlFor="name">商品名称</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">售价</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="oprice">原价</Label>
              <Input
                id="oprice"
                type="number"
                step="0.01"
                value={formData.oprice}
                onChange={(e) => setFormData(prev => ({ ...prev, oprice: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">商品描述</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="depreciation">成色</Label>
            <select
              id="depreciation"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={formData.depreciation}
              onChange={(e) => setFormData(prev => ({ ...prev, depreciation: e.target.value }))}
            >
              <option value="全新">全新</option>
              <option value="次新">次新</option>
              <option value="9成新">9成新</option>
              <option value="8成新">8成新</option>
              <option value="7成新及以下">7成新及以下</option>
            </select>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "发布中..." : "发布商品"}
        </Button>
      </form>
    </div>
  )
} 