// pages/index.tsx
import React from 'react';
import { Container, Title } from '@/components/shared';
import Filters from '@/components/shared/filters';
import ProductsGroupList from '@/components/shared/products-group-list';
import TopBar from '@/components/shared/top-bar';

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='All pizzas' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />
			<Container className='pb-14 pt-10'>
				<div className='flex'>
					{/* Фильтрация */}
					<Filters />
					<div className='w-[250px]'></div>
					{/* Список товаров */}
					<div className='flex-1'>
						<div className='flex flex-col gap-8'>
							<ProductsGroupList
								title='Pizzas'
								categoryId={1}
								items={[
									{
										id: 1,
										name: 'Pizza Margarita',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 10 }],
									},
									{
										id: 2,
										name: 'Pizza Pepperoni',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 12 }],
									},
									{
										id: 3,
										name: 'Pizza BBQ',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 15 }],
									},
									{
										id: 4,
										name: 'Pizza Veggie',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 8 }],
									},
								]}
							/>

							<ProductsGroupList
								title='Breakfasts'
								items={[
									{
										id: 1,
										name: 'Pizza Margarita',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 10 }],
									},
									{
										id: 2,
										name: 'Pizza Pepperoni',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 12 }],
									},
									{
										id: 3,
										name: 'Pizza BBQ',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 15 }],
									},
									{
										id: 4,
										name: 'Pizza Veggie',
										imageUrl:
											'https://cdn.dodostatic.net/static/Img/Products/d9c609f1422247f2b87b6293eb461ff0_1875x1875.jpeg',
										items: [{ price: 8 }],
									},
								]}
								categoryId={2} // Обратите внимание на изменённый categoryId
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
