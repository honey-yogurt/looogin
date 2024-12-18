import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 创建测试用户
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '管理员',
      password: await hash('admin123', 12),
      role: 'ADMIN',
      image: 'https://avatars.githubusercontent.com/u/1234567'
    },
  })

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: '测试用户',
      password: await hash('user123', 12),
      role: 'USER',
      image: 'https://avatars.githubusercontent.com/u/7654321'
    },
  })

  // 创建测试商品
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 14 Pro',
        price: 7999.00,
        quantity: 1,
        description: '全新未拆封的 iPhone 14 Pro，深空黑色，256GB',
        image: 'https://example.com/iphone14pro.jpg',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        category: '电子产品',
        label: '手机,苹果,全新',
        wants: 10,
        popularity: 100
      }
    }),
    prisma.product.create({
      data: {
        name: 'MacBook Pro 2023',
        price: 12999.00,
        quantity: 1,
        description: '95新 MacBook Pro M2 芯片，16GB内存，512GB固态硬盘',
        image: 'https://example.com/macbookpro.jpg',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        category: '电子产品',
        label: '笔记本,苹果,二手',
        wants: 15,
        popularity: 150
      }
    }),
    prisma.product.create({
      data: {
        name: '耐克运动鞋',
        price: 399.00,
        quantity: 1,
        description: '全新耐克运动鞋，尺码42，黑色',
        image: 'https://example.com/nike.jpg',
        status: 'AVAILABLE',
        ownerId: adminUser.id,
        category: '服饰鞋包',
        label: '运动鞋,耐克,全新',
        wants: 5,
        popularity: 50
      }
    })
  ])

  console.log('数据库种子数据已创建')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 