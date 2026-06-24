import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any).id) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    include: {
      items: {
        include: { menuItem: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">내 주문 내역</h1>
      
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-10">주문 내역이 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between border-b pb-4 mb-4">
                <span className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleString('ko-KR')}
                </span>
                <span className="font-semibold text-blue-600">{order.status}</span>
              </div>
              
              <ul className="space-y-2">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between text-gray-700">
                    <span>{item.menuItem.name} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t text-right">
                <span className="font-bold text-lg">총액: {order.totalAmount.toLocaleString()}원</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}