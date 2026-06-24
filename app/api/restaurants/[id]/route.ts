import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
    });
    return NextResponse.json(restaurant);
  } catch (error) {
    return NextResponse.json({ message: "오류가 발생했습니다." }, { status: 500 });
  }
}