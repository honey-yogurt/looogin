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

  // 创建商品分类
  const electronicsCategory = await prisma.category.create({
    data: {
      name: '电子产品',
      description: '包含手机、电脑等电子设备',
    }
  });

  const clothingCategory = await prisma.category.create({
    data: {
      name: '服饰鞋包',
      description: '包含衣服、鞋子、包包等',
    }
  });

  // 创建子分类
  const phoneCategory = await prisma.category.create({
    data: {
      name: '手机',
      description: '各类手机',
      parentId: electronicsCategory.id,
    }
  });

  const computerCategory = await prisma.category.create({
    data: {
      name: '电脑',
      description: '笔记本和台式机',
      parentId: electronicsCategory.id,
    }
  });

  const shoesCategory = await prisma.category.create({
    data: {
      name: '鞋子',
      description: '各式的鞋子',
      parentId: clothingCategory.id,
    }
  });

  const clothesCategory = await prisma.category.create({
    data: {
      name: '衣服',
      description: '各式的衣服',
      parentId: clothingCategory.id,
    }
  });

  // 创建标签
  const labels = await Promise.all([
    prisma.label.create({ data: { name: '个人闲置', popularity: 100 } }),
    prisma.label.create({ data: { name: '全新未拆', popularity: 80 } }),
    prisma.label.create({ data: { name: '摄影摄像', popularity: 60 } }),
    prisma.label.create({ data: { name: '钱币收藏', popularity: 90 } }),
    prisma.label.create({ data: { name: '居家好物', popularity: 30 } }),
    prisma.label.create({ data: { name: '学习帮手', popularity: 170 } }),
    prisma.label.create({ data: { name: '大牌美妆', popularity: 200 } }),
    prisma.label.create({ data: { name: '实用工具', popularity: 70 } }),
  ]);

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
        categoryId: phoneCategory.id,
        label: labels[1].name, // '全新未拆'
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
        categoryId: computerCategory.id,
        label: labels[2].name, // '学习帮手'
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
        ownerId: normalUser.id,
        categoryId: shoesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),
    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
        wants: 5,
        popularity: 50
      }
    }),

    prisma.product.create({
      data: {
        name: '面试西装',
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name, // '个人闲置'
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
 