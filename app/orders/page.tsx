import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const STATUS_STEPS = [
  { key: 'PENDING', label: '접수중' },
  { key: 'DELIVERING', label: '배달중' },
  { key: 'DONE', label: '배달완료' },
];

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || !(session.user as any).id) redirect('/login');

  const orders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    include: {
      items: { include: { menuItem: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8">주문 내역</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-20">주문 내역이 없어요 🛵</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStep = STATUS_STEPS.findIndex((s) => s.key === order.status);
            return (
              <div key={order.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                {/* 날짜 */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
                  <p className="font-extrabold text-orange-500">{order.totalAmount.toLocaleString()}원</p>
                </div>

                {/* 배달 상태 스텝 */}
                <div className="flex items-center mb-6">
                  {STATUS_STEPS.map((step, idx) => (
                    <div key={step.key} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                          ${idx === currentStep ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 
                            idx < currentStep ? 'bg-orange-200 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                          {idx < currentStep ? '✓' : idx + 1}
                        </div>
                        <p className={`text-xs mt-1 font-semibold ${idx === currentStep ? 'text-orange-500' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                      </div>
                      {idx < STATUS_STEPS.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-1 ${idx < currentStep ? 'bg-orange-300' : 'bg-gray-100'}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* 주문 메뉴 */}
                <div className="border-t pt-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span>{item.menuItem.name} x {item.quantity}</span>
                      <span>{(item.price * item.quantity).toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}