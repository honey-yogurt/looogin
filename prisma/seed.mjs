import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();
const { hash } = bcryptjs;

// 定义一些常用的图片URL
const detailImageUrls = [
  'https://img.alicdn.com/bao/uploaded/i1/6000000002718/TB29xb2fNrI8KJjy0FpXXb5hVXa_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/6000000003311/TB2UlRvbjgy_uJjSZKzXXb_jXXa_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
  'https://img.alicdn.com/bao/uploaded/i4/6000000003311/TB2UlRvbjgy_uJjSZKzXXb_jXXa_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp'
];

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

  // 创建更多标签
  const labels = await Promise.all([
    prisma.label.upsert({
      where: { name: '二手' },
      update: {},
      create: { name: '二手', popularity: 100 }
    }),
    prisma.label.upsert({
      where: { name: '95新' },
      update: {},
      create: { name: '95新', popularity: 80 }
    }),
    prisma.label.upsert({
      where: { name: '保修中' },
      update: {},
      create: { name: '保修中', popularity: 50 }
    }),
    prisma.label.upsert({
      where: { name: '配件齐全' },
      update: {},
      create: { name: '配件齐全', popularity: 30 }
    }),
    prisma.label.upsert({
      where: { name: '急售' },
      update: {},
      create: { name: '急售', popularity: 40 }
    }),
    prisma.label.upsert({
      where: { name: '议价' },
      update: {},
      create: { name: '议价', popularity: 60 }
    }),
    prisma.label.upsert({
      where: { name: '学生专供' },
      update: {},
      create: { name: '学生专供', popularity: 45 }
    }),
    prisma.label.upsert({
      where: { name: '正品' },
      update: {},
      create: { name: '正品', popularity: 90 }
    }),
    prisma.label.upsert({
      where: { name: '包邮' },
      update: {},
      create: { name: '包邮', popularity: 70 }
    }),
    prisma.label.upsert({
      where: { name: '限时特价' },
      update: {},
      create: { name: '限时特价', popularity: 55 }
    })
  ]);

  // 创建更多分类
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

  const booksCategory = await prisma.category.create({
    data: {
      name: '图书教材',
      description: '包含教材、课外书等',
    }
  });

  const sportsCategory = await prisma.category.create({
    data: {
      name: '运动户外',
      description: '包含运动器材、户外装备等',
    }
  });

  // 创建更多商品
  const products = [
    {
      name: 'iPhone 13',
      oprice: 6999.00,
      price: 4999.00,
      description: '去年买的iPhone 13，256G，保修到2024年',
      image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Z5xl4k1w9CMPH4Qz4_!!6000000006263-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: electronicsCategory.id,
      labels: [labels[0].name, labels[1].name, labels[2].name],
      wants: 120,
      popularity: 500,
      depreciation: '次新'
    },
    {
      name: 'MacBook Pro 2022',
      oprice: 12999.00,
      price: 9999.00,
      description: 'M1芯片 MacBook Pro，性能强劲，续航持久',
      image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: electronicsCategory.id,
      labels: [labels[0].name, labels[3].name, labels[4].name],
      wants: 80,
      popularity: 400,
      depreciation: '全新'
    },
    {
      name: '耐克运动鞋',
      oprice: 899.00,
      price: 399.00,
      description: 'Nike Air Max 运动鞋，尺码42，穿着舒适',
      image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: sportsCategory.id,
      labels: [labels[0].name, labels[5].name, labels[8].name],
      wants: 45,
      popularity: 200,
      depreciation: '明显使用痕迹'
    },
    {
      name: '高等数学教材',
      oprice: 76.00,
      price: 30.00,
      description: '同济第七版高等数学教材，配套习题册',
      image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: booksCategory.id,
      labels: [labels[6].name, labels[8].name],
      wants: 200,
      popularity: 800,
      depreciation: '全新'
    },
    {
      name: 'AirPods Pro',
      oprice: 1999.00,
      price: 1299.00,
      description: '苹果降噪耳机，音质出众',
      image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: electronicsCategory.id,
      labels: [labels[1].name, labels[3].name, labels[7].name],
      wants: 60,
      popularity: 300,
      depreciation: '次新'
    },
    {
      name: '优衣库卫衣',
      oprice: 299.00,
      price: 99.00,
      description: 'UNIQLO基础款卫衣，尺码L',
      image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: clothingCategory.id,
      labels: [labels[0].name, labels[9].name],
      wants: 30,
      popularity: 150,
      depreciation: '明显使用痕迹'
    },
    {
      name: '篮球',
      oprice: 199.00,
      price: 89.00,
      description: '斯伯丁篮球，室内外通用',
      image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: sportsCategory.id,
      labels: [labels[6].name, labels[5].name],
      wants: 25,
      popularity: 120,
      depreciation: '次新'
    },
    {
      name: 'iPad Air 4',
      oprice: 4799.00,
      price: 3499.00,
      description: '2021款iPad Air，64G，WIFI版',
      image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Z5xl4k1w9CMPH4Qz4_!!6000000006263-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: electronicsCategory.id,
      labels: [labels[1].name, labels[2].name, labels[7].name],
      wants: 70,
      popularity: 350,
      depreciation: '次新'
    },
    {
      name: '专业相机',
      oprice: 8999.00,
      price: 5999.00,
      description: 'Canon EOS R6，专业微单相机',
      image: 'https://img.alicdn.com/bao/uploaded/i4/O1CN01Bv43LP27D3HJ52BQ5_!!4611686018427381954-0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: electronicsCategory.id,
      labels: [labels[3].name, labels[7].name, labels[4].name],
      wants: 40,
      popularity: 200,
      depreciation: '全新'
    },
    {
      name: '编程书籍套装',
      oprice: 399.00,
      price: 199.00,
      description: 'JavaScript高级程序设计+算法导论',
      image: 'https://img.alicdn.com/bao/uploaded/i3/O1CN01okoyh32Lz3JHDHoEi_!!0-fleamarket.jpg_790x10000Q90.jpg_.webp',
      categoryId: booksCategory.id,
      labels: [labels[6].name, labels[8].name, labels[9].name],
      wants: 150,
      popularity: 600,
      depreciation: '全新'
    }
  ];

  // 批量创建商品
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        quantity: 1,
        status: 'AVAILABLE',
        ownerId: normalUser.id,
        detailImages: {
          create: detailImageUrls.map((url, index) => ({
            url,
            description: `${product.name} 细节图 ${index + 1}`,
            order: index
          }))
        },
        attributes: {
          create: [
            { name: '品牌', value: '各品牌' },
            { name: '成色', value: product.depreciation }
          ]
        }
      }
    });
  }

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
 