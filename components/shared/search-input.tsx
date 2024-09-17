'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Link, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useClickAway, useDebounce } from 'react-use';
import { Product } from '@prisma/client';
import { api } from '@/services/api-client';

type Props = {
	className?: string;
};

export default function SearchInput({ className }: Props) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [focused, setFocused] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);

	// Реф который следит за кликом вне поиска
	const ref = useRef(null);
	useClickAway(ref, () => {
		setFocused(false);
	});

	// Логика для отслеживания фокуса
	useEffect(() => {
		if (focused) {
			console.log('focused');
		}
	}, [focused]);

	//Хук, для того, чтобы сразу не отправлять запросы на сервер, а отправить после ввода 500мс
	useDebounce(
		() => {
			// Проверяем, что в поисковом запросе есть данные
			if (searchQuery.trim()) {
				api.products.search(searchQuery).then((response) => {
					setProducts(response.products); // Устанавливаем массив продуктов
				});
			}
			// Если поисковый запрос пуст, то очищаем массив
			if (searchQuery.trim() === '') {
				setProducts([]);
			}
		},
		250,
		[searchQuery]
	);

	return (
		<>
			{focused && (
				<div className='transition-all duration-300 fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />
			)}
			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
			>
				<Search
					size={16}
					className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400'
				/>
				<Input
					className='rounded-2xl outline-none w-full bg-gray-50 pl-11'
					type='text'
					placeholder='What would you like to eat?'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				{focused && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-100 invisible opacity-0',
							searchQuery && 'visible delay-700 opacity-100 top-12'
						)}
					>
						{products.length > 0 ? (
							products.map((product: Product) => (
								<a
									href={`/product/${product.id}`}
									className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
								>
									<img
										className='w-8 h-8 rounded-sm'
										src={product.imageUrl}
										alt={product.name}
									/>
									<span>{product.name}</span>
								</a>
							))
						) : (
							<div className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'>
								<span className='text-gray-400'>No products found</span>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}
