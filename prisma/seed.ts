import { categories } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcryptjs';

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
}

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
	});
