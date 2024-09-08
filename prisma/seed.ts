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
				role: 'ADMIN',
				verified: true,
			},
			{
				fullName: 'User User',
				email: 'user@user.com',
				password: hashSync('111111', 10),
				verified: true,
			},
		],
	});
	await prisma.category.createMany({
		data: categories,
	});
}
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}
async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.log(e);
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
