import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import CheckBoxFiltersGroup from './checkbox-filters-group';
import { cn } from '@/lib/utils';

type Props = {
	className: string;
};

export default function Filters({ className }: Props) {
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
				defaultItems={[
					{ text: 'Сырный соус', value: '1' },
					{ text: 'Моцарелла', value: '2' },
					{ text: 'Чеснок', value: '3' },
					{ text: 'Соленные огурчики', value: '4' },
				]}
				items={[
					{ text: 'Сырный соус', value: '1' },
					{ text: 'Моцарелла', value: '2' },
					{ text: 'Чеснок', value: '3' },
					{ text: 'Соленные огурчики', value: '4' },
					{ text: 'Сырный соус', value: '5' },
					{ text: 'Моцарелла', value: '6' },
					{ text: 'Чеснок', value: '7' },
					{ text: 'Соленные огурчики', value: '8' },
					{ text: 'Сырный соус', value: '9' },
					{ text: 'Моцарелла', value: '10' },
					{ text: 'Чеснок', value: '11' },
					{ text: 'Соленные огурчики', value: '12' },
					{ text: 'Сырный соус', value: '13' },
					{ text: 'Моцарелла', value: '14' },
					{ text: 'Чеснок', value: '15' },
					{ text: 'Соленные огурчики', value: '16' },
				]}
			/>
		</div>
	);
}
