'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';

export default function CartFloatingButton({ restaurantId }: { restaurantId: string }) {
  const { items, totalAmount, restaurantId: currentRestaurantId } = useCart();
  const router = useRouter();

  if (currentRestaurantId !== restaurantId || items.length === 0) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
      <button
        onClick={() => router.push('/cart')}
        className="bg-orange-500 text-white px-8 py-4 rounded-2xl shadow-xl font-extrabold text-lg hover:bg-orange-600 transition flex items-center gap-3"
      >
        <span className="bg-white text-orange-500 rounded-full w-7 h-7 flex items-center justify-center font-extrabold text-sm">
          {totalCount}
        </span>
        장바구니 보기 · {totalAmount().toLocaleString()}원
      </button>
    </div>
  );
}