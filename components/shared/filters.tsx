'use client';
import React, { useEffect, useState } from 'react';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import CheckBoxFiltersGroup from './checkbox-filters-group';
import { cn } from '@/lib/utils';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';
import { useSet } from 'react-use';
import qs from 'qs';
import { useRouter } from 'next/navigation';

type Props = {
	className: string;
};

type PriseProps = {
	priceFrom?: number;
	priceTo?: number;
};

export default function Filters({ className }: Props) {
	const router = useRouter();
	const { ingredients, onAddId, selectedIds } = useFilterIngredients();
	const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>([])
	);

	//Создаем state для фильтра цены
	const [prices, setPrice] = useState<PriseProps>({});

	const items = ingredients.map((item) => ({
		value: item.id.toString(),
		text: item.name,
	}));

	const updatePrice = (name: keyof PriseProps, value: number) => {
		// Функция, которая обновляет изменения для name
		setPrice({
			...prices,
			//фигурные скобки берут название из вне функции.
			[name]: value,
		});
	};

	useEffect(() => {
		const filters = {
			...prices,
			pizzaTypes: Array.from(pizzaTypes),
			sizes: Array.from(sizes),
			ingredients: Array.from(selectedIds),
		};
		const query = qs.stringify(filters, {
			arrayFormat: 'comma',
		});
		router.push(`?${query}`); //пушим фильтры в url
	}, [prices, pizzaTypes, sizes, selectedIds]);

	return (
		<div className={cn(className, 'min-w-[200px]')}>
			<Title text='Filter' size='sm' className='mb-5 font-bold' />
			<CheckBoxFiltersGroup
				title='Dough type:'
				name='sizes'
				className='mb-5'
				onClickCheckBox={togglePizzaTypes}
				selected={pizzaTypes}
				items={[
					{ text: 'Thin', value: '1' },
					{ text: 'Traditional', value: '2' },
				]}
			/>
			<CheckBoxFiltersGroup
				title='Sizes:'
				name='sizes'
				className='mb-5'
				onClickCheckBox={toggleSizes}
				selected={sizes}
				items={[
					{ text: '20 cm', value: '20' },
					{ text: '30 cm', value: '30' },
					{ text: '40 cm', value: '40' },
				]}
			/>
			{/* Upper Checkboxes*/}
			<div className='flex flex-col gap-4'></div>

			{/* Price filter */}
			<div className='mt-5 border-y border-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>The price from and to:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={20}
						value={String(prices.priceFrom)}
						onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
					/>
					<Input
						type='number'
						min={0}
						max={30}
						placeholder='30'
						value={String(prices.priceTo)}
						onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={30}
					step={1}
					value={[prices.priceFrom || 0, prices.priceTo || 30]}
					onValueChange={([priceFrom, priceTo]) => {
						setPrice({ priceFrom, priceTo });
					}}
				/>
				<CheckBoxFiltersGroup
					title='Ingredients'
					name='ingredients'
					limit={6}
					defaultItems={items.slice(0, 6)}
					items={items}
				/>
			</div>
		</div>
	);
}
