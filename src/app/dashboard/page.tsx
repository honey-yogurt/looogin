'use client'

import { CategoryNav } from "@/app/_components/CategoryNav";
import { MainBanner } from "@/app/_components/MainBanner";
import { ProductGrid } from "@/app/_components/ProductGrid";
import { TopNav } from "@/app/_components/TopNav";
import { FloatingButtons } from "@/app/_components/FloatingButtons";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <CategoryNav />
          <MainBanner />
        </div>
        <ProductGrid />
      </main>
      <FloatingButtons />
    </div>
  )
}
