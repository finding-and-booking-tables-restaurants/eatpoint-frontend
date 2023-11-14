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
	'Терраса',
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
	types: string[];
	cities: string;
	address: string;
	kitchens: string[];
	services: string[];
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
	review_count: number;
}

export const initRestaurant = {
	id: 0,
	owner: 0,
	name: '',
	types: [],
	cities: '',
	address: '',
	kitchens: [],
	services: [],
	zones: [],
	average_check: '',
	poster: '',
	email: '',
	telephone: '',
	description: '',
	is_verified: true,
	worked: [],
	is_favorited: true,
	socials: [],
	images: [],
	rating: 0,
	review_count: 0,
};

export interface UserData {
	[key: string]: any;
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
		url.replace('backend:8000', 'eatpoint.sytes.net');

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
		const response = await fetch(`${API_URL}/api/v1/establishments/${id}`);
		const data = await response.json();

		const updatedData = replaceBackendUrl(data);

		return updatedData;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
	return;
};

export const numOfPeople = [
	{ value: 1, label: '1 человек' },
	{ value: 2, label: '2 человека' },
	{ value: 3, label: '3 человека' },
	{ value: 4, label: '4 человека' },
	{ value: 5, label: '5 человек' },
	{ value: 6, label: '6 человек' },
	{ value: 7, label: '7 человек' },
	{ value: 8, label: '8 человек' },
	{ value: 9, label: '9 человек' },
	{ value: 10, label: '10 человек' },
	{ value: 11, label: '11 человек' },
	{ value: 12, label: '12 человек' },
	{ value: 13, label: '13 человек' },
	{ value: 14, label: '14 человек' },
	{ value: 15, label: '15 человек' },
	{ value: 16, label: '16 человек' },
	{ value: 17, label: '17 человек' },
	{ value: 18, label: '18 человек' },
	{ value: 19, label: '19 человек' },
	{ value: 20, label: '20 человек' },
];

export const BookingformValues: any = {
	reminder_one_day: true,
	reminder_three_hours: true,
	reminder_half_on_hour: true,
};

export const inputs = [
	{
		label: 'Имя',
		id: 'first_name',
		type: 'text',
		validationConfig: {
			required: 'Введите имя',
			minLength: {
				value: 2,
				message: 'Введите не менее 2 символов',
			},
			maxLength: {
				value: 30,
				message: 'Введите менее 30 символов',
			},
			pattern: {
				value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
				message: 'Введите корректное имя',
			},
		},
	},
	{
		label: 'Моб. телефон в виде +7... ... .. ..',
		id: 'telephone',
		type: 'text',
		validationConfig: {
			required: 'Введите моб. телефон',
			pattern: {
				value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
				message: 'Введите корректный номер телефона',
			},
			minLength: {
				value: 10,
				message: 'Минимальная длина - 10 символов',
			},
			maxLength: {
				value: 12,
				message: 'Максимальная длина - 12 символов',
			},
		},
	},
	{
		label: 'Эл. почта',
		type: 'email',
		id: 'email',
		validationConfig: {
			required: 'Введите эл. почту',
			pattern: {
				value: /^(?!.*(__|-{2}))[A-Z0-9._%+-]+\S@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: 'Электронная почта введена не корректно',
			},
			minLength: {
				value: 5,
				message: 'Введите не менее 5 символов',
			},
			maxLength: {
				value: 50,
				message: 'Введите менее 50 символов',
			},
		},
	},
	{
		label: 'Комментарий (не обязательно)',
		type: 'text',
		id: 'comment',
		validationConfig: {
			required: false,
			pattern: {
				value: /^[а-яА-ЯёЁ0-9\s\d!""#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}№~]+$/,
				message: 'Вы ввели недопустимые символы',
			},
			maxLength: {
				value: 1500,
				message: 'Длина комментария превышает 1500 символов',
			},
		},
	},
];

export const timesForTimePicker = [
	'00:00',
	'00:30',
	'01:00',
	'01:30',
	'02:00',
	'02:30',
	'03:00',
	'03:30',
	'04:00',
	'04:30',
	'05:00',
	'05:30',
	'06:30',
	'07:00',
	'07:30',
	'08:00',
	'08:30',
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
	'20:30',
	'21:00',
	'21:30',
	'22:00',
	'22:30',
	'23:00',
	'23:30',
];

const ERROR = 'Ошибка';
const ERROR_400 = 'Error: 400';
const ERROR_401 = 'Error: 401';
const ERROR_409 = 'Error: 409';

const EMAIL_ALREADY_REGISTERED_MESSAGE =
	'Пользователь с таким email или телефоном уже существует.';
const INCORRECT_ADD_USER_DATA = 'Переданы некорректные данные при регистрации';
const REG_ERROR_MESSAGE = 'При регистрации пользователя произошла ошибка.';
const INVALID_AUTH_DATA_ERROR_MESSAGE =
	'Вы ввели неправильный логин или пароль.';
const AUTH_ERROR_MESSAGE = 'При авторизации пользователя произошла ошибка.';
const UPDATE_USER_INFO_ERROR_MESSAGE =
	'При обновлении профиля произошла ошибка.';
const UPDATE_USER_INFO_MESSAGE = 'Данные успешно обновлены';
const DUPLICATE_EMAIL_PHONE_MESSAGE =
	'Пользователь с таким email или телефоном уже существует';

const INVALID_DATE_OR_TIME_RESERVATION_MESSAGE =
	'Данное время или дата бронирования недоступны';

const SERVER_ERROR_MESSAGE = 'Что-то пошло не так, попробуйте позже.';
export {
	ERROR,
	ERROR_400,
	ERROR_401,
	ERROR_409,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
	AUTH_ERROR_MESSAGE,
	INVALID_AUTH_DATA_ERROR_MESSAGE,
	UPDATE_USER_INFO_ERROR_MESSAGE,
	UPDATE_USER_INFO_MESSAGE,
	DUPLICATE_EMAIL_PHONE_MESSAGE,
	INVALID_DATE_OR_TIME_RESERVATION_MESSAGE,
	SERVER_ERROR_MESSAGE,
};

export const API_URL = 'https://eatpoint.sytes.net';

export const helpLinkList = [
	// Список якорных ссылок на странице помощи
	'Начало работы',
	'Поиск и бронирование столиков',
	'Политика лояльности и политика отмены бронирования',
	'Аккаунт и профиль',
	'Подтверждение и поддержка',
	'Безопасность и конфиденциальность',
	'Партнеры-рестораны',
	'Отзывы пользователей и рейтинги',
	'Уведомления',
	'Обратная связь и предложения',
	'Правовые нормы и условия предоставления услуг',
];

export const helpInfoLinks = [
	//  Массив ссылок на доп инфформацию в разделе помощи, добавить ссылки на контент
	{
		title: 'Начало работы',
		child: [
			{
				text: 'Как работает сервис бронирования столиков в ресторане?',
				url: '',
			},
			{
				text: 'Существует ли процесс регистрации или входа в систему?',
				url: '',
			},
			{
				text: 'Нужно ли скачивать приложение, чтобы пользоваться вашим сервисом?',
				url: '',
			},
		],
	},
	{
		title: 'Поиск и бронирование столиков',
		child: [
			{ text: 'Как искать рестораны и свободные столики?', url: '' },
			{
				text: 'Могу ли я отфильтровать результаты по кухне, местоположению или другим предпочтениям?',
				url: '',
			},
			{
				text: 'Какую информацию необходимо предоставить для бронирования?',
				url: '',
			},
			{ text: 'За какое время я могу забронировать столик?', url: '' },
			{
				text: 'Существует ли максимальное количество гостей для бронирования?',
				url: '',
			},
		],
	},
	{
		title: 'Политика лояльности и политика отмены бронирования',
		child: [
			{ text: 'Имеются ли скидки или программы лояльности?', url: '' },
			{ text: 'Какова политика отмены бронирования?', url: '' },
		],
	},
	{
		title: 'Аккаунт и профиль',
		child: [
			{
				text: 'Как я могу обновить свою личную информацию и предпочтения?',
				url: '',
			},
			{ text: 'Что делать, если я забыл свой пароль?', url: '' },
			{ text: 'Как удалить свою учетную запись?', url: '' },
		],
	},
	{
		title: 'Подтверждение и поддержка',
		child: [
			{ text: 'Как я получу подтверждение бронирования?', url: '' },
			{
				text: 'Что делать, если в процессе бронирования возникнут проблемы?',
				url: '',
			},
			{
				text: 'Имеется ли служба поддержки, если у меня возникнут вопросы или проблемы?',
				url: '',
			},
		],
	},
	{
		title: 'Безопасность и конфиденциальность',
		child: [
			{ text: 'Как защищена моя личная информация?', url: '' },
			{ text: 'Какова политика конфиденциальности данных?', url: '' },
			{ text: 'Передаете ли вы мою информацию третьим лицам?', url: '' },
		],
	},
	{
		title: 'Партнеры-рестораны',
		child: [
			{
				text: 'Как рестораны могут присоединиться к вашей платформе в качестве партнеров?',
				url: '',
			},
			{
				text: 'Каковы преимущества для ресторанов, использующих вашу платформу?',
				url: '',
			},
		],
	},
	{
		title: 'Отзывы пользователей и рейтинги',
		child: [
			{
				text: 'Могу ли я ознакомиться с отзывами и рейтингами ресторанов на вашей платформе?',
				url: '',
			},
			{
				text: 'Как я могу оставить отзыв о ресторане, который я посетил?',
				url: '',
			},
			{
				text: 'Какие меры принимаются для обеспечения подлинности отзывов?',
				url: '',
			},
		],
	},
	{
		title: 'Уведомления',
		child: [
			{
				text: 'Как я могу включить или отключить уведомления о бронировании?',
				url: '',
			},
		],
	},
	{
		title: 'Обратная связь и предложения',
		child: [
			{
				text: 'Есть ли возможность оставить отзыв или предложить улучшения в работе сервиса?',
				url: '',
			},
		],
	},
	{
		title: 'Правовые нормы и условия предоставления услуг',
		child: [
			{
				text: 'Где можно ознакомиться с условиями предоставления услуг и политикой конфиденциальности?',
				url: '',
			},
			{
				text: 'Какие юридические обязательства и отказы от ответственности связаны с использованием сервиса?',
				url: '',
			},
		],
	},
];
