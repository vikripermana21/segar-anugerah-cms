import { goto } from '$app/navigation';
import { auth } from '../../stores/auth.ts';

export const ssr = false;

export const load = () => {
	auth.subscribe((value) => {
		if (value.token) {
			goto('/dashboard');
		}
	});

	return {};
};
