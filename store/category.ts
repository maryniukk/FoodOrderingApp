import { create } from 'zustand';

interface State {
	//Текущий активный идентификатор категории
	activeId: number;
	//Функция для установки нового значения активного идентификатора
	setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<State>((set) => ({
	activeId: 1, // изначальное значение
	setActiveId: (activeId: number) => set({ activeId }), //функция, которая обновляет activeId,{set} обновление.
}));
