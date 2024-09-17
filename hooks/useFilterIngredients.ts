'use client';

import { api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
	ingredients: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const ingredients = await api.ingredients.getAll();
				setIngredients(ingredients);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return {
		ingredients,
	};
};
