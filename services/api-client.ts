// Крч, тут экспортируются функции, методы, и т.д. из других файлов.
// Это штука сугубо для подсказок, когда ты пишешь api.products.search() например.
import * as products from './products';
import * as ingredients from './ingredients';

export const api = {
	products,
	ingredients,
};
