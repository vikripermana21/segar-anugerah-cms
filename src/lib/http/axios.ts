import axios from 'axios';
import { get } from 'svelte/store';
import { auth } from '../../stores/auth.ts';

const headersReg = {
	'Access-Control-Allow-Headers':
		'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
	'Content-Type': 'application/json',
	Authorization: '',
	Accept: '*/*',
	'Accept-Language': 'id'
};

const api = axios.create({
	baseURL: 'http://localhost:5000/api/internal',
	headers: headersReg
});

api.interceptors.request.use(
	(config) => {
		const token = get(auth).token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const status = error.response?.status;

		if (status === 401) {
			auth.logout();
			window.location.href = '/login';
		}

		return Promise.reject(error);
	}
);

export default api;
