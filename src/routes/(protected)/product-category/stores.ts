import { writable } from 'svelte/store';

// Modal
export const isOpenCreate = writable(false);
export const isOpenCreateSub = writable(false);
export const isOpenEdit = writable(false);
export const isOpenEditSub = writable(false);
export const isOpenDelete = writable(false);
export const isOpenDeleteSub = writable(false);

export const dataSelected = writable({
	id: '',
	name: ''
});
