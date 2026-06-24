import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        menus: true,
      },
    });
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "식당 목록을 불러오는 데 실패했습니다." }, { status: 500 });
  }
}