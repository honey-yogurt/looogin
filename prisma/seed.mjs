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

  // 为电子产品分类创建属性定义
  const electronicAttributes = await Promise.all([
    prisma.categoryAttribute.create({
      data: {
        name: '品牌',
        categoryId: electronicsCategory.id,
        order: 1
      }
    }),
    prisma.categoryAttribute.create({
      data: {
        name: '购买日期',
        categoryId: electronicsCategory.id,
        order: 2
      }
    }),
    prisma.categoryAttribute.create({
      data: {
        name: '使用时长',
        categoryId: electronicsCategory.id,
        order: 3
      }
    })
  ]);

  // 为服饰分类创建属性定义
  const clothingAttributes = await Promise.all([
    prisma.categoryAttribute.create({
      data: {
        name: '品牌',
        categoryId: clothingCategory.id,
        order: 1
      }
    }),
    prisma.categoryAttribute.create({
      data: {
        name: '尺码',
        categoryId: clothingCategory.id,
        order: 2
      }
    }),
    prisma.categoryAttribute.create({
      data: {
        name: '材质',
        categoryId: clothingCategory.id,
        order: 3
      }
    })
  ]);

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

  // 创建测���商品
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 14 Pro',
        oprice: 8999.00,
        price: 7999.00,
        quantity: 1,
        description: '全新未拆封的 iPhone 14 Pro，深空黑色，256GB',
        image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        depreciation: '全新',
        ownerId: normalUser.id,
        categoryId: phoneCategory.id,
        label: labels[1].name,
        wants: 10,
        popularity: 100,
        attributes: {
          create: [
            { name: '品牌', value: 'Apple' },
            { name: '购买日期', value: '2023-12' },
            { name: '使用时长', value: '0个月' }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: 'MacBook Pro 2023',
        oprice: 15999.00,
        price: 12999.00,
        quantity: 1,
        description: '95新 MacBook Pro M2 芯片，16GB内存，512GB固态硬盘',
        image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01xORLnC2AwLHkvHNJz_!!4611686018427382523-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        depreciation: '次新',
        ownerId: normalUser.id,
        categoryId: computerCategory.id,
        label: labels[2].name,
        wants: 15,
        popularity: 150,
        attributes: {
          create: [
            { name: '品牌', value: 'Apple' },
            { name: '购买日期', value: '2023-06' },
            { name: '使用时长', value: '6个月' }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: '耐克运动鞋',
        oprice: 699.00,
        price: 399.00,
        quantity: 1,
        description: '全新耐克运动鞋，尺码42，黑色',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01szBRUh1YT4UgdTJZ0_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        depreciation: '明显使用痕迹',
        ownerId: normalUser.id,
        categoryId: shoesCategory.id,
        label: labels[0].name,
        wants: 5,
        popularity: 50,
        attributes: {
          create: [
            { name: '品牌', value: 'Nike' },
            { name: '尺码', value: '42' },
            { name: '材质', value: '织物+橡胶' }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: '面试西装',
        oprice: 899.00,
        price: 399.00,
        quantity: 1,
        description: '只穿过一次的面试西装',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        depreciation: '次新',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name,
        wants: 5,
        popularity: 50,
        attributes: {
          create: [
            { name: '品牌', value: 'ZARA' },
            { name: '尺码', value: 'L' },
            { name: '材质', value: '聚酯纤维' }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: '商务正装',
        oprice: 1299.00,
        price: 599.00,
        quantity: 1,
        description: '穿过两次的商务正装，98新',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        depreciation: '次新',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name,
        wants: 8,
        popularity: 80,
        attributes: {
          create: [
            { name: '品牌', value: 'Hugo Boss' },
            { name: '尺码', value: 'M' },
            { name: '材质', value: '羊毛混纺' }
          ]
        }
      }
    }),
    prisma.product.create({
      data: {
        name: '休闲西装',
        oprice: 799.00,
        price: 299.00,
        quantity: 1,
        description: '灰色休闲西装，适合日常穿着',
        image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
        status: 'AVAILABLE',
        depreciation: '明显使用痕迹',
        ownerId: normalUser.id,
        categoryId: clothesCategory.id,
        label: labels[0].name,
        wants: 3,
        popularity: 30,
        attributes: {
          create: [
            { name: '品牌', value: 'Uniqlo' },
            { name: '尺码', value: 'XL' },
            { name: '材质', value: '棉混纺' }
          ]
        }
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
 