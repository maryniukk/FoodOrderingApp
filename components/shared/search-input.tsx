'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useClickAway } from 'react-use';
import Link from 'next/link';
import { search } from '@/services/products';
import { Product } from '@prisma/client';

type Props = {
	className?: string;
};

export default function SearchInput({ className }: Props) {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [focused, setFocused] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);

	const ref = useRef(null);
	useClickAway(ref, () => {
		console.log('OUTSIDE CLICKED');
		setFocused(false);
	});

	useEffect(() => {
		if (focused) {
			console.log('focused');
		}
	}, [focused]);

	useEffect(() => {
		if (searchQuery) {
			search(searchQuery).then((items) => setProducts(items));
		} else {
			setProducts([]);
		}
	}, [searchQuery]);

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
					placeholder='What you want to eat?'
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<div
					className={cn(
						'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
						focused ? 'visible opacity-100 top-12' : ''
					)}
				>
					{Array.isArray(products) &&
						products.map((product) => (
							<Link
								key={product.id}
								className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'
								href={`/products/${product.id}`}
							>
								<img
									className='rounded-sm h-10 w-10'
									src={product.imageUrl}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
				</div>
			</div>
		</>
	);
}
