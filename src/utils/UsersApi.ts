import { IRegisterFormData, ILoginFormData } from '../types/commonTypes';
import { API_URL } from './constants';

class UsersApi {
	private _baseUrl: string;
	private _headers: { [key: string]: string };

	constructor({
		baseUrl,
		headers,
	}: {
		baseUrl: string;
		headers: { [key: string]: string };
	}) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	private async _handleResponse<T>(res: Response): Promise<T> {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status}`);
		}
		return res.json();
	}

	async registerUser({
		telephone,
		email,
		firstName,
		lastName,
		password,
		role,
		is_agreement,
		confirm_code_send_method,
	}: IRegisterFormData): Promise<Response> {
		return fetch(`${this._baseUrl}/auth/signup/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				telephone,
				email,
				first_name: firstName,
				last_name: lastName,
				role,
				password,
				is_agreement,
				confirm_code_send_method,
			}),
		}).then((res) => this._handleResponse<Response>(res));
	}

	async authorize({
		email,
		password,
	}: ILoginFormData): Promise<{ access: string; refresh: string }> {
		return fetch(`${this._baseUrl}/login/jwt/create/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email,
				password,
			}),
		}).then((res) =>
			this._handleResponse<{ access: string; refresh: string }>(res)
		);
	}

	confirmRegister = (email: string, code: string) => {
		return fetch(`${this._baseUrl}/auth/confirm-code/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email,
				confirmation_code: code,
			}),
		}).then((res) => this._handleResponse(res));
	};

	refreshToken(refresh: string) {
		return fetch(`${this._baseUrl}/login/jwt/refresh/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				refresh,
			}),
		}).then((res) => this._handleResponse<{ access: string }>(res));
	}

	updateUserInfo({
		telephone,
		email,
		firstName,
		lastName,
		role,
	}: {
		telephone: string;
		email: string;
		firstName: string;
		lastName: string;
		role: string;
	}): Promise<any> {
		const token = localStorage.getItem('access-token');

		return fetch(`${this._baseUrl}/users/me/`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				...this._headers,
			},
			body: JSON.stringify({
				telephone: telephone,
				email: email,
				first_name: firstName,
				last_name: lastName,
				role: role,
			}),
		}).then((res) => this._handleResponse(res));
	}

	getUserInfo(): Promise<any> {
		return fetch(`${this._baseUrl}/users/me/`, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		}).then((res) => this._handleResponse(res));
	}

	cancelBooking(id: string): Promise<any> {
		return fetch(`${this._baseUrl}/reservations/${id}/`, {
			method: 'PATCH',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ action: 'is_deleted' }),
		});
	}

	deleteBooking(id: string): Promise<any> {
		return fetch(`${this._baseUrl}/reservations/${id}/`, {
			method: 'DELETE',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		});
	}

	getUserBookings(): Promise<any> {
		return fetch(`${this._baseUrl}/reservations/`, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		}).then((res) => this._handleResponse(res));
	}

	sendReview(id: number, text: string, score: number): Promise<any> {
		return fetch(`${this._baseUrl}/establishments/${id}/reviews/`, {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text, score }),
		}).then((res) => this._handleResponse(res));
	}
}

const usersApi = new UsersApi({
	baseUrl: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default usersApi;
