import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";
import CartIcon from "./components/CartIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "띵동",
  description: "빠르고 맛있는 배달앱",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-extrabold text-orange-500">
              띵동 🔔
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
              <CartIcon />
              {session ? (
                <>
                  <Link href="/orders" className="hover:text-orange-500 transition">주문내역</Link>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">{session.user?.name}님</span>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/login?mode=register" className="hover:text-orange-500 transition">회원가입</Link>
                  <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                    로그인
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}