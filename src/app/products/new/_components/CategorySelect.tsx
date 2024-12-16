'use client'

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFindManyCategory } from "@/lib/hooks"

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const { data: categories = [], isLoading } = useFindManyCategory()
  
  const selectedCategory = categories.find((category) => category.id === value)

  return (
    <Select
      value={value || undefined}
      onValueChange={onChange}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="选择分类">
          {isLoading ? "加载中..." : (selectedCategory?.name ?? "选择分类...")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {categories.length ? categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        )) : (
          <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground">
            没有可用的分类
          </div>
        )}
      </SelectContent>
    </Select>
  )
} 