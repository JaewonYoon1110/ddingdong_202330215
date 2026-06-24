import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.restaurant.create({
    data: {
      name: '해운대 원조 뼈국밥',
      description: '진한 사골 육수로 우려낸 든든한 한 끼',
      menus: {
        create: [
          { name: '돼지국밥', price: 9000 },
          { name: '순대국밥', price: 9500 },
          { name: '맛보기 수육', price: 12000 },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: '광안리 비치 수제버거',
      description: '바다를 보며 즐기는 100% 소고기 패티 버거',
      menus: {
        create: [
          { name: '클래식 치즈버거', price: 8500 },
          { name: '베이컨 더블버거', price: 11000 },
          { name: '트러플 감자튀김', price: 5000 },
        ],
      },
    },
  });

  await prisma.restaurant.create({
    data: {
      name: '전포동 로스터리 카페',
      description: '직접 로스팅한 원두와 달콤한 디저트',
      menus: {
        create: [
          { name: '아이스 아메리카노', price: 4500 },
          { name: '시그니처 바닐라 라떼', price: 6000 },
          { name: '바스크 치즈 케이크', price: 7000 },
        ],
      },
    },
  });

  console.log('초기 데이터 생성 완료!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });