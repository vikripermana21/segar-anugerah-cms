import * as yup from 'yup';

export const PRODUCT_CATEGORY_ALL_QUERY_KEY = 'product-category-all-list';
export const PRODUCT_CATEGORY_QUERY_KEY = 'product-category-list';

export const PRODUCT_CATEGORY_DEFAULT_VALUE = {
	name: ''
};

export const PRODUCT_CATEGORY_SCHEMA = yup.object({
	name: yup.string().required('Name is required')
});

export const PRODUCT_VARIATION_ALL_QUERY_KEY = 'product-variation-all-list';
export const PRODUCT_CATEGORY_VARIATION_QUERY_KEY = 'product-variation-list';

export const PRODUCT_CATEGORY_VARIATION_DEFAULT_VALUE = {
	name: ''
};

export const PRODUCT_CATEGORY_VARIATION_SCHEMA = yup.object({
	name: yup.string().required('Name is required')
});

export const PRODUCT_CATEGORY_VARIATION_OPTION_SCHEMA = yup.object({
	name: yup.string().required('Value is required')
});
