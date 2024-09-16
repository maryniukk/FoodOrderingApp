'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useClickAway, useDebounce } from 'react-use';
import { Product } from '@prisma/client';
import { api } from '@/services/api-client';
import { search } from '@/services/products';
import Error from 'next/error';
import Link from 'next/link';

type Props = {
	className?: string;
};

export default function SearchInput({ className }: Props) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [focused, setFocused] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);

	const ref = useRef(null);
	useClickAway(ref, () => {
		setFocused(false);
	});

	useEffect(() => {
		if (focused) {
			console.log('focused');
		}
	}, [focused]);

	useDebounce(
		() => {
			if (searchQuery.trim()) {
				// Проверяем, что в поисковом запросе есть данные
				console.log('Sending search query:', searchQuery); // Логируем поисковый запрос
				api.products.search(searchQuery).then((products) => {
					console.log('Products from API:', products); // Логируем полученные данные
					setProducts(products); // Устанавливаем массив продуктов
				});
			}
		},
		500,
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
					placeholder='What are you looking for?'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<div
					className={cn(
						'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-300 invisible opacity-0',
						focused && 'visible opacity-100 top-12'
					)}
				>
					{products &&
						products.length > 0 &&
						products.map((product) => (
							<Link href={`/products/${product.id}`} key={product.id}>
								<p className='px-4 py-2 hover:bg-gray-100'>{product.name}</p>
							</Link>
						))}
				</div>
			</div>

			{/* additional info */}
			<div className='mt-4'>
				<p>Search Query: {searchQuery}</p>
				<p>Quantity: {products ? products.length : 0}</p>
				<p>Products: {JSON.stringify(products)}</p>
			</div>
		</>
	);
}
