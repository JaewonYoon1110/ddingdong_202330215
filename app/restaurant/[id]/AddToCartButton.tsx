'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ 
  menu, 
  restaurantId, 
  restaurantName 
}: { 
  menu: { id: string; name: string; price: number };
  restaurantId: string;
  restaurantName: string;
}) {
  const { addItem, restaurantId: currentRestaurantId, restaurantName: currentRestaurantName, items } = useCart();
  const router = useRouter();

  const handleClick = () => {
    if (currentRestaurantId && currentRestaurantId !== restaurantId) {
      const confirm = window.confirm(
        `장바구니에 "${currentRestaurantName}"의 메뉴가 있어요.\n비우고 "${restaurantName}"의 메뉴를 담을까요?`
      );
      if (!confirm) return;
      useCart.getState().clearCart();
    }
    addItem({ id: menu.id, name: menu.name, price: menu.price }, restaurantId, restaurantName);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        onClick={handleClick}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
      >
        담기
      </button>
      {cartCount > 0 && currentRestaurantId === restaurantId && (
        <button
          onClick={() => router.push('/cart')}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          장바구니 보기 ({cartCount})
        </button>
      )}
    </div>
  );
}