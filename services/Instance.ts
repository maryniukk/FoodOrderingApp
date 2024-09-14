import axios from 'axios';
// Создаем экземпляр axios() с базовым URL, который указывает на наш API.
export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
