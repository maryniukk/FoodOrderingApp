import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import SortPopup from './sort-popup';
import { cn } from '@/lib/utils';

type Props = {
	className: string;
};

export default function TopBar({ className }: Props) {
	return (
		<div
			className={cn(
				'sticky top-0 bg-white shadow-lg shadow-black/5 z-10',
				className
			)}
		>
			<Container className='py-5'>
				<Categories />
				<SortPopup />
			</Container>
		</div>
	);
}
