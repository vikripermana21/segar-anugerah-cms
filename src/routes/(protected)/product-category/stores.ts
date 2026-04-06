import { writable } from 'svelte/store';

export const dataSelected = writable({
	id: '',
	name: ''
});

// Modal
export const isOpenCreate = writable(false);
export const isOpenCreateSub = writable(false);
export const isOpenCreateProductCategoryVariation = writable(false);
export const isOpenCreateProductCategoryVariationOption = writable(false);

export const isOpenEdit = writable(false);
export const isOpenEditSub = writable(false);
export const isOpenEditProductCategoryVariation = writable(false);
export const isOpenEditProductCategoryVariationOption = writable(false);

export const isOpenDelete = writable(false);
export const isOpenDeleteSub = writable(false);
export const isOpenDeleteProductCategoryVariation = writable(false);
export const isOpenDeleteProductCategoryVariationOption = writable(false);
