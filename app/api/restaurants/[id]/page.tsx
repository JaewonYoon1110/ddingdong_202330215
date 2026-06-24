import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
    include: { menus: true },
  });

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
        <p className="text-gray-600">{restaurant.description}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">메뉴</h2>
      <div className="space-y-4">
        {restaurant.menus.map((menu) => (
          <div key={menu.id} className="flex justify-between items-center p-4 border rounded-xl bg-white shadow-sm">
            <div>
              <p className="text-lg font-medium">{menu.name}</p>
              <p className="text-gray-500 mt-1">{menu.price.toLocaleString()}원</p>
            </div>
            <AddToCartButton menu={menu} />
          </div>
        ))}
      </div>
    </div>
  );
}