'use client'

import { Card } from "@/components/ui/card"

export function ProductGrid() {
  const filters = [
    { label: "猜你喜欢", active: true },
    { label: "个人闲置", active: false },
    { label: "BJD娃娃", active: false },
    { label: "重约", active: false },
    { label: "吉他乐器", active: false },
    { label: "台球", active: false },
    { label: "摄影摄像", active: false },
    { label: "钱币收藏", active: false },
    { label: "女装穿搭", active: false },
    { label: "居家好物", active: false },
    { label: "大牌美妆", active: false },
    { label: "机车", active: false },
  ]

  const products = [
    {
      image: "/images/beauty.jpg",
      title: "清洁好帮手",
      price: "¥18",
      views: "5人想要",
      seller: {
        avatar: "/images/avatar1.jpg",
        name: "卖家1"
      }
    },
    {
        image: "/images/beauty.jpg",
        title: "清洁好帮手",
        price: "¥18",
        views: "5人想要",
        seller: {
          avatar: "/images/avatar1.jpg",
          name: "卖家1"
        }
      },
      {
        image: "/images/beauty.jpg",
        title: "清洁好帮手",
        price: "¥18",
        views: "5人想要",
        seller: {
          avatar: "/images/avatar1.jpg",
          name: "卖家1"
        }
      },
      {
        image: "/images/beauty.jpg",
        title: "清洁好帮手",
        price: "¥18",
        views: "5人想要",
        seller: {
          avatar: "/images/avatar1.jpg",
          name: "卖家1"
        }
      },
      {
        image: "/images/beauty.jpg",
        title: "清洁好帮手",
        price: "¥18",
        views: "5人想要",
        seller: {
          avatar: "/images/avatar1.jpg",
          name: "卖家1"
        }
      },
      {
        image: "/images/beauty.jpg",
        title: "清洁好帮手",
        price: "¥18",
        views: "5人想要",
        seller: {
          avatar: "/images/avatar1.jpg",
          name: "卖家1"
        }
      },
    // ... 更多商品数据
  ]

  return (
    <div>
      {/* 筛选栏 */}
      <div className="bg-white rounded-lg mb-4 p-4">
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              className={`px-4 py-1 rounded-full whitespace-nowrap text-sm transition-colors
                ${filter.active 
                  ? 'bg-yellow-400 text-black font-medium' 
                  : 'hover:bg-gray-100'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 商品网格 */}
      <div className="grid grid-cols-5 gap-4">
        {products.map((product, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm line-clamp-2">{product.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-red-500 font-bold">{product.price}</span>
                <span className="text-gray-500 text-xs">{product.views}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img 
                  src={product.seller.avatar}
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs text-gray-500">
                  {product.seller.name}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 