import api from '@/http/axios.js';
import { useMutation, useQuery } from '@sveltestack/svelte-query';
import { PRODUCT_QUERY_KEY } from './constants.ts';

export const useProductQuery = (params: object) => {
	return useQuery({
		queryKey: [PRODUCT_QUERY_KEY, { ...params }],
		queryFn: async ({ signal, queryKey }) => {
			const [, params] = queryKey;

			return api.get('/product', { params, signal }).then((res) => res.data);
		}
	});
};

export const useProductDetail = (id: string) => {
	return useQuery({
		queryKey: [`product-detail-${id}`],
		queryFn: async ({ signal }) => {
			return api.get(`/product/${id}`, { signal }).then((res) => res.data);
		}
	});
};

export const useCreateProduct = () => {
	return useMutation((payload: FormData) => {
		return api.post('/product', payload, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	});
};

export const useEditProduct = (id: string) => {
	return useMutation((payload: FormData) => {
		return api.patch(`/product/${id}`, payload, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	});
};

export const useDeleteProduct = () => {
	return useMutation((id: string) => {
		return api.delete(`/product/${id}`);
	});
};

export const useProductVariationList = (id: string, params: object) => {
	return useQuery({
		queryKey: [`product-variation-list-${id}`, { ...params }],
		queryFn: async ({ signal, queryKey }) => {
			const [, params] = queryKey;

			return api.get(`/product/${id}/item`, { params, signal }).then((res) => res.data);
		}
	});
};

export const useCreateProductVariation = (id: string) => {
	return useMutation((payload: FormData) => {
		return api.post(`/product/${id}/item`, payload, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
	});
};
