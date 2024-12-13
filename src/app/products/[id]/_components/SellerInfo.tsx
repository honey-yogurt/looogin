'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import type { User } from "@prisma/client"

interface SellerInfoProps {
  owner: User
}

export function SellerInfo({ owner }: SellerInfoProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={owner.image || ""} alt={owner.name || "用户头像"} />
              <AvatarFallback>{owner.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{owner.name}</h3>
              <p className="text-sm text-muted-foreground">
                注册时间：{new Date(owner.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            联系卖家
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}