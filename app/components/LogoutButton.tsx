'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
    >
      로그아웃
    </button>
  );
}