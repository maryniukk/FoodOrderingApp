import { Product } from '@prisma/client';
import { axiosInstance } from './Instance';
import { ApiRoutes } from './constants';
export const search = async (query: string): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(
		ApiRoutes.SEARCH_PRODUCTS,
		{
			params: { query },
		}
	);
	return data;
};

// Этот файл нужен для того, чтобы вытащить данные Product, указываем дженерик, адрес, параметры, и возвращаем data.
// Через него мы будем вытаскивать данные для поиска блюд.
