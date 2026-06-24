import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
    include: { menus: true },
  });

  if (!restaurant) notFound();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{restaurant.name}</h1>
        <p className="text-gray-500">{restaurant.description}</p>
        <div className="mt-3 inline-block bg-orange-50 text-orange-600 text-sm font-semibold px-3 py-1 rounded-full">
          최소주문금액 {restaurant.minOrderAmount.toLocaleString()}원
        </div>
      </div>

      <h2 className="text-2xl font-extrabold mb-6">메뉴</h2>
      <div className="space-y-4">
        {restaurant.menus.map((menu) => (
          <div key={menu.id} className="flex justify-between items-center p-4 border rounded-xl bg-white shadow-sm">
            <div>
              <p className="text-lg font-semibold text-gray-900">{menu.name}</p>
              <p className="text-orange-500 font-bold mt-1">{menu.price.toLocaleString()}원</p>
            </div>
            <AddToCartButton 
              menu={menu} 
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}