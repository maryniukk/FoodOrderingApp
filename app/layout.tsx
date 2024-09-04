import Header from '@/components/shared/header';
import type { Metadata } from 'next';
import './globals.css';

const systemFonts = {
	className: 'font-system',
	variable: '--font-system',
};

export const metadata: Metadata = {
	title: 'Next Pizza',
	description: 'Created by Nikita Maryniuk',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={systemFonts.className}>
				<main className='min-h-screen'>
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
