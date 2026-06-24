'use client';

import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartPage() {
  const { items, totalAmount, removeItem, clearCart, addItem } = useCart();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return alert('장바구니가 비어있습니다.');
    
    setIsOrdering(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, totalAmount: totalAmount() }),
      });

      if (res.ok) {
        alert('주문이 성공적으로 완료되었습니다!');
        clearCart();
        router.push('/orders');
        router.refresh();
      } else if (res.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
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
      <h1 className="text-3xl font-bold mb-8">장바구니</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">장바구니에 담긴 메뉴가 없습니다.</p>
      ) : (
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.price.toLocaleString()}원</p>
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
                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                    className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="font-bold w-20 text-right">{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t flex justify-between items-center">
            <span className="text-xl font-bold">총 결제 금액</span>
            <span className="text-2xl font-bold text-orange-500">{totalAmount().toLocaleString()}원</span>
          </div>

          <button 
            onClick={handleCheckout} 
            disabled={isOrdering}
            className="w-full bg-orange-500 text-white py-4 rounded-xl mt-8 font-bold text-lg hover:bg-orange-600 disabled:bg-gray-400 transition"
          >
            {isOrdering ? '주문 처리 중...' : '결제하기'}
          </button>
        </div>
      )}
    </div>
  );
}