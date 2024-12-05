'use client'

export function CategoryNav() {
  const categories = [
    { icon: "📱", label: "手机 / 数码 / 电脑" },
    { icon: "👟", label: "服饰 / 箱包 / 运动" },
    { icon: "🎮", label: "玩具 / 卡牌 / 游戏" },
    { icon: "🏠", label: "母婴 / 美妆 / 个护" },
    { icon: "🛋", label: "家具 / 家电 / 家装" },
    // ... 其他分类
  ]

  return (
    <nav className="w-64 bg-white rounded-lg p-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </div>
      ))}
    </nav>
  )
} 