'use client'

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams, redirect } from "next/navigation"
import { useFindUniqueChatRoom, useCreateMessage, useUpdateChatRoom } from "@/lib/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from "date-fns"
import { zhCN } from "date-fns/locale"
import { usePusher } from "@/lib/pusher"
import { toast } from "sonner"

export default function ChatRoomPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = useParams()
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { data: chatRoom, refetch } = useFindUniqueChatRoom({
    where: { id: id as string },
    include: {
      product: true,
      sender: true,
      receiver: true,
      messages: {
        where: {
          OR: [
            { senderId: session?.user?.id },
            { chatRoom: { 
              OR: [
                { senderId: session?.user?.id },
                { receiverId: session?.user?.id }
              ]
            }}
          ]
        },
        include: { sender: true },
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  const { mutateAsync: createMessage } = useCreateMessage()
  const { mutateAsync: updateChatRoom } = useUpdateChatRoom()

  // 订阅 Pusher 频道
  useEffect(() => {
    if (!chatRoom || !session?.user?.id) return;

    const channel = usePusher.subscribe(`chat-${chatRoom.id}`);
    
    channel.bind('new-message', async (data: any) => {
      await refetch();
      
      if (data.senderId !== session.user.id) {
        const isSender = chatRoom.senderId === session.user.id;
        await updateChatRoom({
          where: { id: chatRoom.id },
          data: {
            [isSender ? 'senderUnread' : 'receiverUnread']: 0,
            lastMessage: data.content,
            messages: {
              updateMany: {
                where: { isRead: false },
                data: { isRead: true }
              }
            }
          }
        });
      }
    });

    return () => {
      usePusher.unsubscribe(`chat-${chatRoom.id}`);
    };
  }, [chatRoom, session]);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatRoom?.messages])

  if (!session) {
    return redirect('/signin')
  }

  if (!chatRoom) return <div>加载中...</div>

  const handleSend = async () => {
    if (!message.trim() || !chatRoom) return;

    try {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          chatRoomId: chatRoom.id,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "发送失败");
      }

      await refetch();
      setMessage("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "发送消息失败");
      console.error("发送消息失败:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col">
      {/* 聊天室头部 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center gap-4">
          <img 
            src={chatRoom.product.image} 
            alt={chatRoom.product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h2 className="font-medium">{chatRoom.product.name}</h2>
            <p className="text-red-500">¥{chatRoom.product.price}</p>
          </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="space-y-4">
          {chatRoom.messages.map(msg => {
            const isSelf = msg.senderId === session.user.id
            
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${isSelf ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.image || ""} />
                  <AvatarFallback>{msg.sender.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className={`max-w-[70%] ${isSelf ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      isSelf 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(msg.createdAt), { 
                      locale: zhCN,
                      addSuffix: true 
                    })}
                  </span>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入框 */}
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="输入消息..."
          className="flex-1"
        />
        <Button onClick={handleSend}>发送</Button>
      </div>
    </div>
  )
} 