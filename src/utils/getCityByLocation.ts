import {
	setKey,
	setLanguage,
	setRegion,
	RequestType,
	geocode,
} from 'react-geocode';

const apiKey = process.env.REACT_APP_GEO_API_KEY;

setKey(apiKey || '');
setLanguage('ru');
setRegion('ru');

interface Coordinates {
	latitude: number;
	longitude: number;
}

function getLocation(): Promise<Coordinates> {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const latitude: number = position.coords.latitude;
					const longitude: number = position.coords.longitude;
					resolve({ latitude, longitude });
				},
				(error) => {
					reject(error);
				}
			);
		} else {
			reject(new Error('Геолокация не поддерживается вашим браузером'));
		}
	});
}

export const getCityNameByLocation = () => {
	return getLocation()
		.then((coordinates) => {
			const longitude = coordinates.longitude;
			const latitude = coordinates.latitude;
			const latLngString = String(latitude + ',' + longitude);
			return geocode(RequestType.LATLNG, latLngString)
				.then(({ results }) => {
					const address = results[0].formatted_address;
					const { city, state, country } = results[0].address_components.reduce(
						(acc: any, component: any) => {
							if (component.types.includes('locality'))
								acc.city = component.long_name;
							else if (component.types.includes('administrative_area_level_1'))
								acc.state = component.long_name;
							else if (component.types.includes('country'))
								acc.country = component.long_name;
							return acc;
						}
					);
					return city;
				})
				.catch(console.error);
		})
		.catch((error) => {
			console.error('Произошла ошибка:', error.message);
			// Обработка ошибок
		});
};
