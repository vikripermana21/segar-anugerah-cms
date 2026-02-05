import { writable } from 'svelte/store';

export interface User {
	id: string;
	email: string;
	name: string;
	phone: string;
	role: string;
	provider: string;
}

export interface AuthState {
	token: string | null;
	user: User | null;
}

const STORAGE_KEY = 'segar-anugerah';

function createAuthStore() {
	let initial: AuthState = {
		token: null,
		user: null
	};

	// Read from localStorage (only in browser)
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				initial = JSON.parse(atob(stored));
			} catch {
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	}

	const { subscribe, set, update } = writable<AuthState>(initial);

	// Persist on every change
	subscribe((value) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(value)));
		}
	});

	return {
		subscribe,

		login: (token: string, user: User) => set({ token, user }),

		logout: () => {
			set({ token: null, user: null });
			if (typeof window !== 'undefined') {
				localStorage.removeItem(STORAGE_KEY);
			}
		},

		setUser: (user: User) => update((state) => ({ ...state, user }))
	};
}

export const auth = createAuthStore();
