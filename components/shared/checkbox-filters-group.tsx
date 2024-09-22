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
	onClickCheckBox?: (id: string) => void;
	defaultValue?: string;
	className?: string;
	selectedIds?: Set<string>;
};

export default function CheckBoxFiltersGroup({
	title,
	items,
	limit = 5,
	searchInputPlaceHolder = 'Search...',
	className,
	onClickCheckBox,
	defaultValue,
	selectedIds,
}: Props) {
	//Создаем стейт для показа или скрытия всего списка
	const [showAll, setShowAll] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	// Функция для фильтрации списка
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
					//Чекбокс
					<FilterCheckbox
						key={index}
						text={item.text}
						value={item.value}
						// то, что будет отображаться справа от чекбокса
						endAdornment={item.endAdornment}
						checked={selectedIds?.has(item.value)}
						onCheckedChange={() => onClickCheckBox?.(item.value)}
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
