'use client';

import { useCart } from '@/store/useCart';

export default function AddToCartButton({ menu }: { menu: { id: string; name: string; price: number } }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <button
      onClick={() => {
        addItem({ id: menu.id, name: menu.name, price: menu.price });
        alert(`${menu.name}이(가) 장바구니에 담겼습니다.`);
      }}
      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
    >
      담기
    </button>
  );
}