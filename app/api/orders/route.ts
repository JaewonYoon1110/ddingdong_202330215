import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalAmount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "장바구니가 비어 있습니다." }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId: (session.user as any).id,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ message: "주문이 완료되었습니다.", orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "주문 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: (session.user as any).id },
      include: {
        items: {
          include: { menuItem: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "주문 내역을 불러오는 데 실패했습니다." }, { status: 500 });
  }
}