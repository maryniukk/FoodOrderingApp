'use client';
import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { cn } from '@/lib/utils';
import ProductCard from './product-card';
import { useCategoryStore } from '@/store/category';

type ProductItem = {
	price: number;
};

type Product = {
	id: number;
	name: string;
	imageUrl?: string;
	price: number;
	items?: ProductItem[];
};

type Props = {
	title: string;
	items: Product[];
	categoryId: number;
	listClassName?: string;
	className?: string;
};

export default function ProductsGroupList({
	items,
	title,
	listClassName,
	className,

	categoryId,
}: Props) {
	// Создаем ref, изначальное значение должно быть null.
	const interSectionRef = React.useRef(null);
	const intersection = useIntersection(interSectionRef, {
		threshold: 0.4,
	});
	// вытаскиваем функцию из глобального стейта
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	//Создаем useEffect, который будет отлавливать изменения.
	useEffect(() => {
		//если блок видимости в экране
		if (intersection && intersection.isIntersecting) {
			//тогда меняем наш Id
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, title]);

	return (
		<div className={className} id={title} ref={interSectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />
			<div className='grid grid-cols-3 gap-[50px]'>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items ? product.items[0].price : product.price}
					/>
				))}
			</div>
		</div>
	);
}
