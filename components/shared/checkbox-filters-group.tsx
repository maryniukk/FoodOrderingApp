'use client';
import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterChecboxProps;

// Типизируем пропсы
type Props = {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	searchInputPlaceHolder?: string;
	onChange?: (values: string[]) => void;
	defaultValue?: string;
	className?: string;
};

export default function CheckBoxFiltersGroup({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceHolder = 'Search...',
	className,
	onChange,
	defaultValue,
}: Props) {
	//Создаем стейт для показа или скрытия всего списка
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const list = showAll
		? items.filter((item) =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: items.slice(0, limit);

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						placeholder={searchInputPlaceHolder}
						className='bg-gray-50 border-none'
						onChange={onChangeInput}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{/* Список добавок */}
				{list.map((item, index) => (
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={false}
						onCheckedChange={() => {
							// Добавьте вашу логику для onCheckedChange
						}}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'
					>
						{showAll ? 'Show less' : '+ Show more'}
					</button>
				</div>
			)}
		</div>
	);
}
