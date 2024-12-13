'use client'

import { useFindManylabel } from "@/lib/hooks/label"

interface FilterBarProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  // 查询标签数据
  const { data: labels, isLoading: isLoadingLabels } = useFindManylabel({
    orderBy: {
      popularity: 'desc'
    },
    take: 11, // 只取前11个最热门的标签
  })

  // 组合filters数据
  const filters = [
    { label: "猜你喜欢", active: activeFilter === "猜你喜欢" },
    ...(labels?.map(label => ({
      label: label.name,
      active: activeFilter === label.name
    })) || [])
  ]

  if (isLoadingLabels) {
    return <div>加载中...</div>
  }

  return (
    <div className="bg-white rounded-lg mb-4 p-4">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => onFilterChange(filter.label)}
            className={`px-4 py-1 rounded-full whitespace-nowrap text-sm transition-colors
              ${filter.label === activeFilter 
                ? 'bg-yellow-400 text-black font-medium' 
                : 'hover:bg-gray-100'
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
} 