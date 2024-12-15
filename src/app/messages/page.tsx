'use client'

import { useFindManyChatRoom } from "@/lib/hooks"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { redirect } from 'next/navigation'

export default function MessagesPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const { data: chatRooms, isLoading } = useFindManyChatRoom({
    where: {
      OR: [
        { 
          senderId: session?.user?.id,
          messages: {
            some: {}
          }
        },
        { 
          receiverId: session?.user?.id,
          messages: {
            some: {}
          }
        }
      ]
    },
    include: {
      product: true,
      sender: true,
      receiver: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  if (!session) {
    return redirect('/signin')
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">我的消息</h1>
        <div className="text-center py-8">加载中...</div>
      </div>
    )
  }

  if (!chatRooms?.length) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">我的消息</h1>
        <div className="text-center py-8 text-gray-500">暂无消息</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">我的消息</h1>
      <div className="space-y-4">
        {chatRooms?.map(room => {
          const isSender = room.senderId === session.user.id
          const otherUser = isSender ? room.receiver : room.sender
          const unreadCount = isSender ? room.senderUnread : room.receiverUnread

          return (
            <div
              key={room.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/messages/${room.id}`)}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={otherUser.image || ""} />
                <AvatarFallback>{otherUser.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{otherUser.name}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(room.updatedAt), { 
                      locale: zhCN,
                      addSuffix: true 
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate">
                    {room.lastMessage || `关于商品: ${room.product.name}`}
                  </p>
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 