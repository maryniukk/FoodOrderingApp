'use client';

import { api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

interface ReturnProps {
	ingredients: Ingredient[];
	selectedIds: Set<String>;
	onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [selectedIds, { toggle }] = useSet<string>(new Set<string>([]));

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
		onAddId: toggle,
		selectedIds,
	};
};
