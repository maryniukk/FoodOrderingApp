import { categories, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcryptjs';

function randomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Admin v1.0.0',
				email: 'admin@admin.com',
				password: hashSync('admin', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
			{
				fullName: 'User User',
				email: 'user@user.com',
				role: 'USER',
				password: hashSync('admin', 10),
				verified: new Date(),
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});
	await prisma.ingredient.createMany({
		data: ingredients.map((ingredient) => ({
			...ingredient,
			productId: 1,
		})),
	});

	await prisma.product.createMany({
		data: products,
	});

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Пепперони фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				 ingredients.slice(0, 5),
			},
		},
	});
	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сырная',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	});
	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чоризо фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 40),
			},
		},
	});

	// Создаем вариации теста, размера для пиццы
	await prisma.productItem.createMany({
		data: [
			{
					productId: pizza1.id,
					pizzaType: 1,
					price: randomNumber(7, 11),
					size: 20,
			},
			{
				productId: pizza1.id,
				pizzaType: 2,
				price: randomNumber(7, 11),
				size: 30,
		},
		{
			productId: pizza1.id,
			pizzaType: 2 ,
			price: randomNumber(7, 11),
			size: 40,
	},
		]
	})

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	})
};
