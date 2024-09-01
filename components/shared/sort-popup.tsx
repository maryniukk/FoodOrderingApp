import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

type Props = {
	className: string;
};

export default function SortPopup({ className }: Props) {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-1 bg-gray-50 h-[52px] rounded-2xl cursor-pointer',
				className
			)}
		>
			<ArrowUpDown size={16} />
			<b>Sort</b>
			<b className='text-primary'>Popular</b>
		</div>
	);
}
