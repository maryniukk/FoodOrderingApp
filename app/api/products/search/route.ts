import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	// Вытаскиваем query из url
	const query = req.nextUrl.searchParams.get('query') || null;
	// Ищем продукты по названию
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query || '',
				mode: 'insensitive',
			},
		},
		take: 5,
	});

	return NextResponse.json({ products });
}
