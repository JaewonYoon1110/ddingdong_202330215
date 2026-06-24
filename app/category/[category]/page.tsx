import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
        <p className="text-orange-500 font-semibold text-sm mb-1">카테고리</p>
        <h1 className="text-4xl font-extrabold text-gray-900">{decodedCategory}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map((res) => (
          <Link href={`/restaurant/${res.id}`} key={res.id}>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold bg-orange-50 text-orange-500 px-2 py-1 rounded-full">
                  {decodedCategory}
                </span>
                <span className="text-xs text-gray-300">배달가능</span>
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">{res.name}</h2>
              <p className="text-gray-400 text-sm">{res.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs text-gray-400">최소주문 {res.minOrderAmount.toLocaleString()}원</span>
                <span className="text-orange-500 text-sm font-semibold">메뉴보기 →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}