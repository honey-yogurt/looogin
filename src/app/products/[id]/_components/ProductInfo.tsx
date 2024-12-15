'use client'

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useCreateChatRoom, useFindFirstChatRoom } from "@/lib/hooks"
import { toast } from "sonner"
import type { Product, User, ProductAttribute } from "@prisma/client"

interface ProductInfoProps {
  product: Product & {
    owner: User
    attributes: ProductAttribute[]
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const { mutateAsync: createChatRoom } = useCreateChatRoom()
  
  // 查找现有聊天室
  const { data: existingRoom } = useFindFirstChatRoom({
    where: {
      AND: [
        { productId: product.id },
        {
          OR: [
            { 
              senderId: session?.user?.id || '',
              receiverId: product.ownerId
            },
            { 
              senderId: product.ownerId,
              receiverId: session?.user?.id || ''
            }
          ]
        }
      ]
    }
  })

  const handleContact = async () => {
    // 确保用户已登录且会话已加载完成
    if (!session?.user?.id || sessionStatus !== 'authenticated') {
      router.push('/signin')
      return
    }

    // 检查是否是自己的商品
    if (session.user.id === product.ownerId) {
      toast.error('不能和自己聊天')
      return
    }

    try {
      // 先检查现有聊天室
      if (existingRoom) {
        router.push(`/messages/${existingRoom.id}`)
        return
      }

      // 创建新聊天室
      const newRoom = await createChatRoom({
        data: {
          senderId: session.user.id,
          receiverId: product.ownerId,
          productId: product.id,
          status: "ACTIVE",
          lastMessage: `关于商品：${product.name}`
        }
      })

      if (!newRoom?.id) {
        throw new Error('创建聊天室失败')
      }

      router.push(`/messages/${newRoom.id}`)
    } catch (error: any) {
      toast.error('创建聊天失败，请稍后重试')
    }
  }

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
        <Button 
          className="flex-1"
          onClick={handleContact}
          disabled={sessionStatus !== 'authenticated'}
        >
          联系卖家
        </Button>
        <Button className="flex-1" variant="secondary">立即购买</Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}