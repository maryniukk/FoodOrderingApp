import logo from '@/public/assets/next-pizza-logo.svg';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Container } from './container';
import Link from 'next/link';
import { ArrowRight, Euro, ShoppingCart, User } from 'lucide-react';
import SearchInput from './search-input';

type Props = {};

export default function Header({}: Props) {
	return (
		<header>
			<Container className='flex items-center justify-between py-8'>
				{/*Левая часть */}
				<Link href={'/'}>
					<div className='flex items-center gap-4'>
						<Image src={logo} alt='' />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>
								It couldn't be tastier
							</p>
						</div>
					</div>
				</Link>
				<div className='mx-10 flex-1'>
					<SearchInput />
				</div>
				{/*Правая часть */}
				<div className='flex items-center gap-2'>
					<Button className='flex items-center gap-1' variant={'outline'}>
						<User size={16} />
						Sign in
					</Button>

					<div>
						<Button className='items-center group relative'>
							<p className='flex items-center'>
								10
								<Euro size={13} />
							</p>
							<span className='h-full w-[1px] bg-white/30 mx-3' />
							<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
								<ShoppingCart size={16} className='relative' />
								<b>3</b>
							</div>
							<ArrowRight
								size={16}
								className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
							/>
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
}
