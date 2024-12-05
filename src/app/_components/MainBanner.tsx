'use client'

export function MainBanner() {
  const promotions = [
    {
      title: "衣服特卖",
      bgColor: "bg-yellow-50",
      icon: "👕",
      items: [
        { image: "/images/beauty.jpg", price: "¥160", title: "春季新款外套" },
        { image: "/images/computer.jpg", price: "¥34", title: "清仓T恤" },
      ]
    },
    {
      title: "二次元",
      bgColor: "bg-green-50",
      icon: "🎮",
      items: [
        { image: "/images/fashionbag.jpg", price: "¥949", title: "手办模型" },
        { image: "/images/beauty.jpg", price: "¥850", title: "动漫周边" },
      ]
    },
    {
      title: "手机数码",
      bgColor: "bg-blue-50",
      icon: "📱",
      items: [
        { image: "/images/computer.jpg", price: "¥49", title: "手机壳" },
        { image: "/images/fashionbag.jpg", price: "¥45", title: "数据线" },
      ]
    },
    {
      title: "省钱卡券",
      bgColor: "bg-pink-50",
      icon: "🎫",
      items: [
        { image: "/images/beauty.jpg", price: "¥40", title: "美食券" },
        { image: "/images/computer.jpg", price: "¥200", title: "购物券" },
      ]
    }
  ]

  return (
    <div className="flex-1 grid grid-cols-2 gap-4">
      {promotions.map((promo, index) => (
        <div key={index} className={`${promo.bgColor} rounded-lg p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{promo.icon}</span>
            <h3 className="text-lg font-bold">{promo.title}</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {promo.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-2 shadow-sm">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <div className="text-sm mb-1 line-clamp-1">{item.title}</div>
                <div className="text-red-500 font-bold">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 