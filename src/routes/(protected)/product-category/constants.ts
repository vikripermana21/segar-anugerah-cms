import * as yup from 'yup';

export const PRODUCT_CATEGORY_QUERY_KEY = 'product-category-list';

export const PRODUCT_CATEGORY_DEFAULT_VALUE = {
	name: ''
};

export const PRODUCT_CATEGORY_SCHEMA = yup.object({
	name: yup.string().required('Name is required')
});
