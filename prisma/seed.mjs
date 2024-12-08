import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();
const { hash } = bcryptjs;

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
      image: 'https://img.tuxiangyan.com/uploads/allimg/210908/1_0ZP31Q3E48.jpg'
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: '测试用户',
      password: await hash('user123', 12),
      role: 'USER',
      image: 'https://img.tuxiangyan.com/uploads/allimg/210908/1_0ZP31Q3E48.jpg'
    },
  });

  // 创建测试商品
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 14 Pro',
        price: 7999.00,
        quantity: 1,
        description: '全新未拆封的 iPhone 14 Pro，深空黑色，256GB',
        image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
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
        image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01xORLnC2AwLHkvHNJz_!!4611686018427382523-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
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
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01szBRUh1YT4UgdTJZ0_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: adminUser.id,
        category: '服饰鞋包',
        label: '运动鞋,耐克,全新',
        wants: 5,
        popularity: 50
      }
    }),
    prisma.product.create({
        data: {
          name: 'xiaomi',
          price: 7999.00,
          quantity: 1,
          description: '全新未拆封的xiaomi，深空黑色，256GB',
          image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
          status: 'AVAILABLE',
          ownerId: normalUser.id,
          category: '电子产品',
          label: '手机,小米,全新',
          wants: 10,
          popularity: 100
        }
      }),
      prisma.product.create({
        data: {
          name: 'Dell',
          price: 12999.00,
          quantity: 1,
          description: '95新 戴尔手机',
          image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01xORLnC2AwLHkvHNJz_!!4611686018427382523-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
          status: 'AVAILABLE',
          ownerId: normalUser.id,
          category: '电子产品',
          label: '笔记本,戴尔,二手',
          wants: 15,
          popularity: 150
        }
      }),
      prisma.product.create({
        data: {
          name: '帽子',
          price: 399.00,
          quantity: 1,
          description: '国产帽子',
          image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01szBRUh1YT4UgdTJZ0_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
          status: 'AVAILABLE',
          ownerId: adminUser.id,
          category: '服饰鞋包',
          label: '帽子,国产,全新',
          wants: 5,
          popularity: 50
        }
      }),
  ]);

  console.log('数据库种子数据已创建');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
 