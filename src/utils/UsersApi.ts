import { IRegisterFormData } from '../types/commonTypes';

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

	private _handleResponse(responce: Response): Promise<Response> {
		if (!responce.ok) {
			throw new Error(`Request failed with status ${responce.status}`);
		}
		return responce.json();
	}

	registerUser({
		telephone,
		email,
		firstName,
		lastName,
		password,
		role,
		is_agreement,
		confirm_code_send_method,
	}: IRegisterFormData): Promise<Response> {
		return fetch(`${this._baseUrl}/api/v1/auth/signup/`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				telephone: telephone,
				email: email,
				first_name: firstName,
				last_name: lastName,
				role: role,
				password: password,
				is_agreement: is_agreement,
				confirm_code_send_method: confirm_code_send_method,
			}),
		}).then(this._handleResponse);
	}
}

const usersApi = new UsersApi({
	baseUrl: 'http://80.87.109.70',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default usersApi;
