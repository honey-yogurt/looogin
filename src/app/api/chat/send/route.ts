import { pusher } from "@/lib/pusher-server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { content, chatRoomId } = body;

    // 创建消息
    const message = await db.message.create({
      data: {
        content,
        senderId: session.user.id,
        chatRoomId,
        isRead: false,
      },
      include: {
        sender: true,
      },
    });

    // 更新聊天室
    const chatRoom = await db.chatRoom.findUnique({
      where: { id: chatRoomId }
    });

    if (!chatRoom) {
      throw new Error("Chat room not found");
    }

    // 修改更新逻辑
    await db.chatRoom.update({
      where: { id: chatRoomId },
      data: {
        lastMessage: content,
        receiverUnread: chatRoom.senderId === session.user.id ? 
          chatRoom.receiverUnread + 1 : chatRoom.receiverUnread,
        senderUnread: chatRoom.receiverId === session.user.id ? 
          chatRoom.senderUnread + 1 : chatRoom.senderUnread
      },
    });

    await pusher.trigger(`chat-${chatRoomId}`, "new-message", message);

    return NextResponse.json(message);
  } catch (error) {
    console.error("[CHAT_SEND]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 