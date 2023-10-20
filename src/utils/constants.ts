export const availableKitchen = [
	'Азиатская',
	'Русская',
	'Европейская',
	'Мексиканская',
	'Итальянская',
	'Грузинская',
];

export const availableType = [
	'Бар',
	'Ресторан',
	'Кофейня',
	'Пиццерия',
	'Фаст-фуд',
	'Караоке',
	'Кондитерская',
];

export const availableService = [
	'Парковка',
	'Терасса',
	'Wi-Fi',
	'Детская комната',
];

export interface kitchen {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface Kitchen {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface Service {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface Zone {
	id: number;
	zone: string;
	seats: number;
	available_seats: number;
}

export interface Type {
	id: number;
	name: string;
	description: string;
	slug: string;
}

export interface WorkedDay {
	day: string;
	start: string;
	end: string;
	day_off: boolean;
	day_off_st?: string;
}

export interface Social {
	name: string;
}

export interface Image {
	name: string;
	image: string;
}

export interface Restaurant {
	id: number;
	owner: number;
	name: string;
	types: Type[];
	cities: string;
	address: string;
	kitchens: Kitchen[];
	services: Service[];
	zones: Zone[];
	average_check: string;
	poster: string;
	email: string;
	telephone: string;
	description: string;
	is_verified: boolean;
	worked: WorkedDay[];
	is_favorited: boolean;
	socials: Social[];
	images: Image[];
	rating: number;
}

export interface Review {
	id: number;
	username: string;
	rating: number;
	text: string;
}

export const featuresLang: Record<string, string> = {
	parking: 'Парковка',
	wifi: 'Wi-Fi',
	terrace: 'Терраса',
	kidsRoom: 'Детская комната',
};

export const zoneLang: Record<string, string> = {
	mainHall: 'Основной зал',
	terrace: 'Терраса',
	banquetHall: 'Банкетный зал',
};

export const getDayAbbreviation = (day: string) => {
	switch (day) {
		case 'понедельник':
			return 'Пн.';
		case 'вторник':
			return 'Вт.';
		case 'среда':
			return 'Ср.';
		case 'четверг':
			return 'Чт.';
		case 'пятница':
			return 'Пт.';
		case 'суббота':
			return 'Сб.';
		case 'воскресенье':
			return 'Вс.';
		default:
			return day;
	}
};

function replaceBackendUrl(data: any): any {
	const replaceUrl = (url: string) =>
		url.replace('backend:8000', '80.87.109.70');

	if (typeof data === 'string') {
		return replaceUrl(data);
	} else if (Array.isArray(data)) {
		return data.map((item) => replaceBackendUrl(item));
	} else if (typeof data === 'object' && data !== null) {
		const updatedData: Record<string, any> = {};
		for (const key in data) {
			updatedData[key] = replaceBackendUrl(data[key]);
		}
		return updatedData;
	}

	return data;
}

export const fetchRestaurantData = async (id: number) => {
	try {
		const response = await fetch(
			`http://80.87.109.70/api/v1/establishments/${id}`
		);
		const data = await response.json();

		const updatedData = replaceBackendUrl(data);

		return updatedData;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	return;
};

export const numOfPeople = [
	{
		value: 1,
		label: '1 человек',
	},
	{
		value: 2,
		label: '2 человека',
	},
	{
		value: 3,
		label: '3 человека',
	},
	{
		value: 4,
		label: '4 человека',
	},
	{
		value: 5,
		label: '5 человек',
	},
	{
		value: 6,
		label: '6 человек',
	},
];

export const zones = [
	{
		value: 1,
		label: 'Основной зал',
	},
	{
		value: 2,
		label: 'Центральный зал',
	},
	{
		value: 3,
		label: 'Барная стойка',
	},
	{
		value: 4,
		label: 'Зона на терассе',
	},
	{
		value: 5,
		label: 'Банкетный зал',
	},
];

export const formValues: any = {
	// last_name: '',
	// end_time_reservation: '',
	reminder_one_day: true,
	reminder_three_hours: true,
	reminder_half_on_hour: true,
};

export const inputs = [
	{
		label: 'Имя',
		id: 'first_name',
		required: true,
	},
	{
		label: 'Моб. телефон',
		id: 'telephone',
		required: true,
	},
	{
		label: 'Эл. почта',
		id: 'email',
		required: true,
	},
	{
		label: 'Комментарий',
		id: 'comment',
		required: false,
	},
];

export const times = [
	`00-00`,
	'00-30',
	'01-00',
	'01-30',
	'02-00',
	'02-30',
	'03-00',
	'03-30',
	'04-00',
	'04-30',
	'05-00',
	'05-30',
	'06-30',
	'07-00',
	'07-30',
	'08-00',
	'08-30',
	'09-00',
	'09-30',
	'10-00',
	'10-30',
	'11-00',
	'11-30',
	'12-00',
	'12-30',
	'13-00',
	'13-30',
	'14-00',
	'14-30',
	'15-00',
	'15-30',
	'16-00',
	'16-30',
	'17-00',
	'17-30',
	'18-00',
	'18-30',
	'19-00',
	'19-30',
	'20-00',
	'20-30',
	'21-00',
	'21-30',
	'22-00',
	'22-30',
	'23-00',
	'23-30',
];
