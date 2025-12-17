import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('✅ Prisma client loaded');

  /* 1️⃣ قراءة الإعدادات الحالية */
  const settings = await prisma.setting.findMany();
  console.log('📦 Current settings:', settings);

  /* 2️⃣ إنشاء إعدادات جديدة (اختبار كتابة) */
  const created = await prisma.setting.create({
    data: {
      siteName: 'IronCastle Test Site',
      adminEmail: 'admin@test.com',
    },
  });

  console.log('✍️ Created setting:', created);

  /* 3️⃣ قراءة السجل الذي أنشأناه */
  const fetched = await prisma.setting.findUnique({
    where: { id: created.id },
  });

  console.log('🔎 Fetched setting:', fetched);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Disconnected');
  });
