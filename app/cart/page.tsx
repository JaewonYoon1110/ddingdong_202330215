'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, totalAmount, removeItem, clearCart, restaurantId, restaurantName } = useCart();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);
  const [minOrderAmount, setMinOrderAmount] = useState(0);

  useEffect(() => {
    if (restaurantId) {
      fetch(`/api/restaurants/${restaurantId}`)
        .then((res) => res.json())
        .then((data) => setMinOrderAmount(data.minOrderAmount || 0));
    }
  }, [restaurantId]);

  const handleCheckout = async () => {
    if (items.length === 0) return alert('장바구니가 비어있습니다.');
    if (totalAmount() < minOrderAmount) {
      return alert(`최소 주문금액은 ${minOrderAmount.toLocaleString()}원입니다.\n${(minOrderAmount - totalAmount()).toLocaleString()}원 더 담아주세요.`);
    }

    setIsOrdering(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, totalAmount: totalAmount() }),
      });

      if (res.ok) {
        alert('주문이 완료되었습니다!');
        clearCart();
        router.push('/orders');
        router.refresh();
      } else if (res.status === 401) {
        alert('로그인이 필요합니다.');
        router.push('/login');
      } else {
        const data = await res.json();
        alert(data.message || '주문 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-2">장바구니</h1>
      {restaurantName && (
        <p className="text-gray-400 text-sm mb-6">{restaurantName} · 최소주문 {minOrderAmount.toLocaleString()}원</p>
      )}

      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-20">장바구니가 비어있어요 🛒</p>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm p-6">
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.price.toLocaleString()}원</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-lg flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => useCart.getState().addItem({ id: item.id, name: item.name, price: item.price }, restaurantId!, restaurantName!)}
                    className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="font-bold w-24 text-right text-orange-500">{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 pt-6 border-t flex justify-between items-center">
            <span className="text-xl font-extrabold">총 결제금액</span>
            <span className="text-2xl font-extrabold text-orange-500">{totalAmount().toLocaleString()}원</span>
          </div>

          {totalAmount() < minOrderAmount && (
            <p className="text-red-400 text-sm text-right mt-2">
              최소주문금액까지 {(minOrderAmount - totalAmount()).toLocaleString()}원 남았어요
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={isOrdering}
            className="w-full bg-orange-500 text-white py-4 rounded-xl mt-6 font-extrabold text-lg hover:bg-orange-600 disabled:bg-gray-300 transition"
          >
            {isOrdering ? '주문 처리 중...' : '결제하기'}
          </button>
        </div>
      )}
    </div>
  );
}