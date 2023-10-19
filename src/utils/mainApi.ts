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

	searchQuery(query: string) {
		return this._sendFetchRequest(`/establishments/?search=${query}`, {
			headers: this._headers,
		});
	}
}

export const mainApi = new MainApi({
	baseUrl: 'http://80.87.109.70/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
});