'use client';

import { useCart } from '@/store/useCart';

export default function AddToCartButton({ 
  menu, 
  restaurantId, 
  restaurantName 
}: { 
  menu: { id: string; name: string; price: number };
  restaurantId: string;
  restaurantName: string;
}) {
  const { addItem, restaurantId: currentRestaurantId, restaurantName: currentRestaurantName } = useCart();

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

  return (
    <button
      onClick={handleClick}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
    >
      담기
    </button>
  );
}