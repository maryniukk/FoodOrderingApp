'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { useCategoryStore } from '@/store/category';

type Props = {
	className: string;
};

export const Categories: React.FC<Props> = ({ className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	const cats = [
		{ id: 1, name: 'Pizzas' },
		{ id: 2, name: 'Breakfasts' },
		{ id: 3, name: 'Закуски' },
		{ id: 4, name: 'Коктейли' },
		{ id: 5, name: 'Кофе' },
		{ id: 6, name: 'Напитки' },
		{ id: 7, name: 'Десерты' },
	];

	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
		>
			{cats.map(({ name, id }) => (
				<a
					href={`/#${name}`}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						categoryActiveId === id &&
							'bg-white shadow-md shadow-gray-200 text-primary'
					)}
					key={id}
				>
					<button onClick={() => setActiveCategoryId(id)}>
						<span>{name}</span>
					</button>
				</a>
			))}
		</div>
	);
};
