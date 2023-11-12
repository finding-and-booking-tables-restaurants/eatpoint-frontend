import { API_URL } from './constants';
import { RestaurantData } from '../types/addRestaurantTypes';
import { ReservationFormValues } from '../types/ReservationFormValues';

class MainApi {
	private _baseUrl: string;
	private _headers: Record<string, string>;
	constructor(options: { baseUrl: string; headers: Record<string, string> }) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	_sendFetchRequest(path: string, settings: RequestInit) {
		return fetch(`${this._baseUrl}${path}`, settings).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res);
		});
	}

	getEstablishments(pageSize: number) {
		return this._sendFetchRequest(
			`/api/v1/establishments/?page_size=${pageSize}`,
			{
				headers: this._headers,
			}
		);
	}

	getEstablissmentData(id: number) {
		return this._sendFetchRequest(`/api/v1/establishments/${id}`, {
			headers: this._headers,
		});
	}

	getEstablishmentsBySearchQuery(query: string, pageSize: number) {
		return this._sendFetchRequest(
			`/api/v1/establishments/?page_size=${pageSize}&search=${query}`,
			{ headers: this._headers }
		);
	}

	getAllMyEstablishments() {
		return this._sendFetchRequest(`/api/v1/business/establishments/`, {
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		});
	}

	// createMyEstablishment(data: RestaurantData) {
	// 	return this._sendFetchRequest(`/api/v1/business/establishments/`, {
	// 		method: 'POST',
	// 		headers: {
	// 			authorization: 'Bearer ' + localStorage.getItem('access-token'),
	// 		},
	// 		body: JSON.stringify(data),
	// 	});
	// }

	createMyEstablishment(data: RestaurantData, files: FileList) {
		const formData = new FormData();

		// Добавляем текстовые данные
		Object.keys(data).forEach((key) => {
			// Проверяем, что key является ключом объекта
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				formData.append(key, (data as any)[key]);
			}
		});

		// Добавляем файлы
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}

		return this._sendFetchRequest(`/api/v1/business/establishments/`, {
			method: 'POST',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
			},
			body: formData,
		});
	}

	editMyEstablishment(data: RestaurantData, id: string | undefined) {
		return this._sendFetchRequest(`/api/v1/business/establishments/${id}/`, {
			method: 'PATCH',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}

	getMyEstablishmentById(id: string | undefined) {
		return this._sendFetchRequest(`/api/v1/business/establishments/${id}/`, {
			method: 'GET',
			headers: {
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
				'Content-Type': 'application/json',
			},
		});
	}

	getEstablishmentsReviews(id: number) {
		return this._sendFetchRequest(`/api/v1/establishments/${id}/reviews/`, {
			headers: this._headers,
		});
	}

	bookEstablishment(id: number, formData: ReservationFormValues) {
		return this._sendFetchRequest(
			`/api/v1/establishments/${id}/reservations/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
		);
	}
}

export const mainApi = new MainApi({
	baseUrl: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
