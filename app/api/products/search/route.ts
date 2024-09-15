import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// Извлекаем query из URL
	const query = req.nextUrl.searchParams.get('query') || '';
	// Ищем продукты по названию
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query,
				mode: 'insensitive',
			},
		},
		take: 5,
	});

	return NextResponse.json({ products });
}
