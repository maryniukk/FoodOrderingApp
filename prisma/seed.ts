import { Prisma } from '@prisma/client';
import { categories, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcryptjs';

function randomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number;
	pizzaType?: 1 | 2 | null;
	size?: 20 | 30 | 40 | null;
}) => {
	return {
		productId,
		pizzaType: pizzaType || null,
		size: size || null,
		price: randomNumber(500, 1000),
	} as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
	// Вшиваем пользователей
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
		// Создаем категории
		data: categories,
	});

	await prisma.product.createMany({
		// Создаем пиццы
		data: products,
	});

	await prisma.cart.createMany({
		// Создаем корзины для пользователей
		data: [
			{
				userId: 1,
				token: '1111',
				totalAmount: 0,
			},
			{
				userId: 2,
				token: '2222',
				totalAmount: 0,
			},
		],
	});
	// Создаем корзину для пользователя
	// await prisma.cartItem.create ({

	// })

	const createdIngredients = await prisma.ingredient.createMany({
		// Создаем ингредиенты
		data: ingredients.map((ingredient) => ({
			...ingredient,
			productId: 1,
		})),
	});

	const allIngredients = await prisma.ingredient.findMany(); // Получаем все ингредиенты

	const pizza1 = await prisma.product.create({
		//
		data: {
			name: 'Пепперони фреш',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: allIngredients.slice(0, 5).map((ing) => ({ id: ing.id })),
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
				connect: allIngredients.slice(5, 10).map((ing) => ({ id: ing.id })),
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
				connect: allIngredients.slice(10, 40).map((ing) => ({ id: ing.id })),
			},
		},
	});

	// Создаем вариации теста, размера для пиццы
	await prisma.productItem.createMany({
		data: [
			// Пицца "Пепперони фреш"
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

			// Пицца "Сырная"
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			// Пицца "Чоризо фреш"
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
		],
	});
}

async function down() {
	// Удаляем все данные
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
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
	});
