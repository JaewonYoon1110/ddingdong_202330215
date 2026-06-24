'use client';

import { useCart } from '@/store/useCart';
import Link from 'next/link';

export default function CartIcon() {
  const totalCount = useCart((state) => state.totalCount());

  return (
    <Link href="/cart" className="relative hover:text-orange-500 transition text-sm font-medium text-gray-700">
      장바구니
      {totalCount > 0 && (
        <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalCount}
        </span>
      )}
    </Link>
  );
}