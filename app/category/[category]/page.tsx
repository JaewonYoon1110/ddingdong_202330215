import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const EMOJI: Record<string, string> = {
  치킨: '🍗', 피자: '🍕', 햄버거: '🍔', 한식: '🍚',
  중식: '🥡', 일식: '🍣', 분식: '🌶️', 양식: '🥩', 디저트: '🍰',
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  const restaurants = await prisma.restaurant.findMany({
    where: { category: decodedCategory },
  });

  if (!restaurants) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {EMOJI[decodedCategory]} {decodedCategory}
        </h1>
        <p className="text-gray-400">식당을 선택해주세요</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {restaurants.map((res) => (
          <Link href={`/restaurant/${encodeURIComponent(res.id)}`} key={res.id}>
            <div className="rounded-2xl bg-white border shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer p-6">
              <div className="text-5xl mb-4">{EMOJI[decodedCategory]}</div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{res.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{res.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>⭐ 4.8</span>
                <span>🕐 20~30분</span>
                <span>🛵 무료배달</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}