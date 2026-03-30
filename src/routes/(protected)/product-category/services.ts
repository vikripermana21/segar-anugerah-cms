import api from '@/http/axios.js';
import { useMutation, useQuery } from '@sveltestack/svelte-query';
import {
	PRODUCT_CATEGORY_ALL_QUERY_KEY,
	PRODUCT_CATEGORY_QUERY_KEY,
	PRODUCT_CATEGORY_VARIATION_QUERY_KEY
} from './constants.ts';

export const useProductCategoryAllQuery = (params: object) => {
	return useQuery({
		queryKey: [PRODUCT_CATEGORY_ALL_QUERY_KEY, { ...params }],
		queryFn: async ({ signal, queryKey }) => {
			const [, params] = queryKey;

			return api.get('/product-category/all', { params, signal }).then((res) => res.data);
		}
	});
};

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

export const useProductCategoryVariation = (id: string, params: object) => {
	return useQuery({
		queryKey: [`product-category-variation-${id}`],
		queryFn: async ({ signal }) => {
			return api
				.get(`/product-category/${id}/variation`, { signal, params })
				.then((res) => res.data);
		}
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

export const useProductVariationQuery = (params: object) => {
	return useQuery({
		queryKey: [PRODUCT_CATEGORY_VARIATION_QUERY_KEY, { ...params }],
		queryFn: async ({ signal, queryKey }) => {
			const [, params] = queryKey;

			return api.get('/variation', { params, signal }).then((res) => res.data);
		}
	});
};

export const useProductVariationDetail = (id: string) => {
	return useQuery({
		queryKey: [`variation-detail-${id}`],
		queryFn: async ({ signal }) => {
			return api.get(`/variation/${id}`, { signal }).then((res) => res.data);
		}
	});
};

export const useCreateProductVariation = () => {
	return useMutation((payload: { name: string; category_id?: string }) => {
		return api.post('/variation', payload);
	});
};

export const useEditProductVariation = (id: string) => {
	return useMutation((payload: { name: string }) => {
		return api.patch(`/variation/${id}`, payload);
	});
};

export const useDeleteProductVariation = () => {
	return useMutation((id: string) => {
		return api.delete(`/variation/${id}`);
	});
};
