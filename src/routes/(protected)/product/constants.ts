import * as yup from 'yup';

export const PRODUCT_QUERY_KEY = 'product-list';

export const PRODUCT_DEFAULT_VALUE = {
	name: '',
	description: '',
	product_image: null,
	category_id: '',
	existing_image_url: ''
};

export const PRODUCT_SCHEMA = yup.object({
	name: yup.string().required('Name is required'),
	description: yup.string().required('Description is required'),
	category_id: yup.string().required('Category is required'),
	product_image: yup
		.mixed()
		.optional()
		.test('fileType', 'Only image files are allowed (JPEG, PNG, WebP)', (value) => {
			if (!value) return true;
			return ['image/jpeg', 'image/png', 'image/webp'].includes(value.type);
		})
		.test('fileSize', 'File size must be less than 2MB', (value) => {
			if (!value) return true;
			return value.size <= 2 * 1024 * 1024;
		})
});
