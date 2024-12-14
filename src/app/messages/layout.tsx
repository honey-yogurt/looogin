'use client'

import { TopNav } from "@/app/_components/TopNav"
import { FloatingButtons } from "@/app/_components/FloatingButtons"

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="container mx-auto py-6">
        {children}
      </main>
      <FloatingButtons />
    </div>
  )
} 