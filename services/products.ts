import { Product } from '@prisma/client';
import { axiosInstance } from './Instance';

export const search = async (query: string) => {
	const { data } = await axiosInstance.get<Product>('products/search', {
		params: { query },
	});
	return data;
};

// Этот файл нужен для того, чтобы вытащить данные Product, указываем дженерик, адрес, параметры, и возвращаем data.
// Через него мы будем вытаскивать данные для поиска блюд.
