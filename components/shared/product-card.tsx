import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Title } from './title';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

type Props = {
	id: number;
	name: string;
	price: number;
	imageUrl: string; // Удалите опциональность
};

export default function ProductCard({ id, name, price, imageUrl }: Props) {
	return (
		<div>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg '>
					<Image src={imageUrl} alt={name} width={200} height={200} />
				</div>
				<Title text={name} size={'sm'} className='mb-1 mt-3 font-bold' />
				<p className='text-sm text-gray-400'>
					Цыпленок, Моцарелла, Чеддер, Пармезан, Томат
				</p>
				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						от <b>{price}</b> <span className='text-gray-400'>€</span>
					</span>
					<Button variant={'secondary'}>
						<Plus className='w-4 h-4 mr-1' />
						Add
					</Button>
				</div>
			</Link>
		</div>
	);
}
