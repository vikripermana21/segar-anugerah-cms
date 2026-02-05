import type { HandleFetch } from '@sveltejs/kit';
import { auth } from './stores/auth.ts';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	let token;

	auth.subscribe((value) => {
		token = value.token;
	});

	if (token) {
		request.headers.set('Authorization', `Bearer ${token}`);
	}

	return fetch(request);
};
