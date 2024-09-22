'use client';
import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import CheckBoxFiltersGroup from './checkbox-filters-group';
import { cn } from '@/lib/utils';
import { useFilterIngredients } from '@/hooks/useFilterIngredients';

type Props = {
	className: string;
};

export default function Filters({ className }: Props) {
	//Оставновился тут 6:18

	const { ingredients, onAddId, selectedIds } = useFilterIngredients();

	const items = ingredients.map((item) => ({
		value: item.id.toString(),
		text: item.name,
	}));

	return (
		<div className={cn(className, 'min-w-[200px]')}>
			<Title text='Filter' size='sm' className='mb-5 font-bold' />

			{/* Upper Checkboxes*/}
			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='123' value='1' />
				<FilterCheckbox text='123' value='2' />
			</div>

			{/* Price filter */}
			<div className='mt-5 border-y border-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>The price from and to:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={20}
						defaultValue={0}
					/>
					<Input type='number' min={0} max={20} placeholder='30' />
				</div>

				<RangeSlider min={0} max={30} step={1} value={[0, 30]} />
			</div>
			<CheckBoxFiltersGroup
				title='Ingredients'
				className='mt-5'
				limit={4}
				defaultItems={items.slice(0, 6)}
				items={items}
				onClickCheckBox={onAddId}
				selectedIds={selectedIds}
			/>
		</div>
	);
}
