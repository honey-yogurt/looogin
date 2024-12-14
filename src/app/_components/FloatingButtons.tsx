'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useFindManyChatRoom } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"

export function FloatingButtons() {
  const { data: session } = useSession()
  const router = useRouter()
  
  // 简化未读消息查询
  const { data: chatRooms } = useFindManyChatRoom({
    where: {
      OR: [
        { 
          receiverId: session?.user?.id ?? '',
          receiverUnread: { gt: 0 }
        },
        {
          senderId: session?.user?.id ?? '',
          senderUnread: { gt: 0 }
        }
      ],
      status: "ACTIVE"
    },
    select: {
      id: true,
      senderId: true,
      receiverId: true,
      senderUnread: true,
      receiverUnread: true
    }
  })

  const totalUnread = chatRooms?.reduce((acc, room) => {
    const isReceiver = room.receiverId === session?.user?.id
    return acc + (isReceiver ? room.receiverUnread : room.senderUnread)
  }, 0) ?? 0

  const buttons = [
    { 
      icon: "➕", 
      label: "发闲置",
      onClick: () => router.push("/products/new") 
    },
    { 
      icon: "💬", 
      label: "消息",
      badge: totalUnread > 0 ? totalUnread : undefined,
      onClick: () => router.push("/messages") 
    },
    { 
      icon: "🔄", 
      label: "反馈",
      onClick: () => router.push("/feedback") 
    },
  ]

  return (
    <TooltipProvider>
      <div className="fixed right-8 top-1/3 z-50">
        <div className="bg-white rounded-[30px] shadow-lg p-3 flex flex-col gap-4 relative before:content-[''] before:absolute before:inset-0 before:rounded-[30px] before:bg-gradient-to-b before:from-gray-100 before:to-white before:z-[-1]">
          {buttons.map((button, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button 
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors relative"
                  onClick={button.onClick}
                >
                  <span className="text-lg">{button.icon}</span>
                  {button.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 min-w-[20px] h-5"
                    >
                      {button.badge}
                    </Badge>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={5}>
                <p>{button.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
} 