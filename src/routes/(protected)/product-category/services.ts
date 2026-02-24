import api from '@/http/axios.js';
import { useMutation, useQuery } from '@sveltestack/svelte-query';
import { PRODUCT_CATEGORY_QUERY_KEY } from './constants.ts';

export const useProductCategoryQuery = (params: object) => {
	return useQuery({
		queryKey: [PRODUCT_CATEGORY_QUERY_KEY, { ...params }],
		queryFn: async ({ signal, queryKey }) => {
			const [, params] = queryKey;

			return api.get('/product-category', { params, signal }).then((res) => res.data);
		}
	});
};

export const useProductCategoryDetail = (id: string) => {
	return useQuery({
		queryKey: [`product-category-detail-${id}`],
		queryFn: async ({ signal }) => {
			return api.get(`/product-category/${id}`, { signal }).then((res) => res.data);
		}
	});
};

export const useCreateProductCategory = () => {
	return useMutation((payload: { name: string; parent_category_id?: string }) => {
		return api.post('/product-category', payload);
	});
};

export const useEditProductCategory = (id: string) => {
	return useMutation((payload: { name: string }) => {
		return api.patch(`/product-category/${id}`, payload);
	});
};

export const useDeleteProductCategory = () => {
	return useMutation((id: string) => {
		return api.delete(`/product-category/${id}`);
	});
};
