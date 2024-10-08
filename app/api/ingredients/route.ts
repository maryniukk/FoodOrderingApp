import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

// Получаем все ингридиенты и отдаем в json формате
export async function GET() {
	const ingridients = await prisma.ingredient.findMany();
	return NextResponse.json(ingridients);
}
