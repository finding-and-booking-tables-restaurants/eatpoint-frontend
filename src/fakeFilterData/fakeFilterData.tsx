const fakeFilterData = [
	{
		id: 0,
		owner: 0,
		name: 'Гурман',
		types: [
			{
				id: 0,
				name: 'Кофейня',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Бар',
				description: 'string',
				slug: 'string',
			},
		],
		city: 'string',
		address: 'м. Речной вокзал',
		kitchens: [
			{
				id: 0,
				name: 'Азиатская',
				description: 'string',
				slug: 'string',
			},
		],
		services: [
			{
				id: 0,
				name: 'Парковка',
				description: 'string',
				slug: 'string',
			},
			{
				id: 0,
				name: 'Wi-Fi',
				description: 'string',
				slug: 'string',
			},
		],
		zones: [
			{
				zone: 'string',
				seats: 1,
			},
		],
		average_check: 'до 1000',
		poster: 'http://example.com',
		email: 'user@example.com',
		telephone: 'string',
		description: 'string',
		is_verified: true,
		worked: [
			{
				day: 'понедельник',
				start: '08:00',
				end: '08:00',
				day_off: true,
			},
		],
		is_favorited: true,
		socials: [
			{
				name: 'http://example.com',
			},
		],
		image: [
			{
				name: 'string',
				image:
					'https://resizer.otstatic.com/v2/photos/wide-medium/3/51998483.webp',
			},
		],
		rating: 4.5,
	},
	{
		id: 1,
		owner: 1,
		name: 'Уютный уголок',
		types: [
			{
				id: 0,
				name: 'Фаст-фуд',
				description: 'string',
				slug: 'string',
			},
		],
		city: 'string',
		address: 'string',
		kitchens: [
			{
				id: 0,
				name: 'Русская',
				description: 'string',
				slug: 'string',
			},
		],
		services: [
			{
				id: 0,
				name: 'Терасса',
				description: 'string',
				slug: 'string',
			},
		],
		zones: [
			{
				zone: 'string',
				seats: 1,
			},
		],
		average_check: '1000 - 2000',
		poster: 'http://example.com',
		email: 'user@example.com',
		telephone: 'string',
		description: 'string',
		is_verified: true,
		worked: [
			{
				day: 'понедельник',
				start: '08:00',
				end: '08:00',
				day_off: true,
			},
		],
		is_favorited: true,
		socials: [
			{
				name: 'http://example.com',
			},
		],
		image: [
			{
				name: 'string',
				image:
					'https://resizer.otstatic.com/v2/photos/wide-medium/1/25153597.webp',
			},
		],
		rating: 4.3,
	},
	{
		id: 2,
		owner: 2,
		name: 'Итальянское наслаждение',
		types: [
			{
				id: 0,
				name: 'Ресторан',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Бар',
				description: 'string',
				slug: 'string',
			},
		],
		city: 'string',
		address: 'м. Преображенская площадь',
		kitchens: [
			{
				id: 0,
				name: 'Итальянская',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Азиатская',
				description: 'string',
				slug: 'string',
			},
		],
		services: [
			{
				id: 0,
				name: 'Детская комната',
				description: 'string',
				slug: 'string',
			},
		],
		zones: [
			{
				zone: 'string',
				seats: 1,
			},
		],
		average_check: '2000 - 3000',
		poster: 'http://example.com',
		email: 'user@example.com',
		telephone: 'string',
		description: 'string',
		is_verified: true,
		worked: [
			{
				day: 'понедельник',
				start: '08:00',
				end: '08:00',
				day_off: true,
			},
		],
		is_favorited: true,
		socials: [
			{
				name: 'http://example.com',
			},
		],
		image: [
			{
				name: 'string',
				image:
					'https://resizer.otstatic.com/v2/photos/wide-medium/3/27748532.webp',
			},
		],
		rating: 4.8,
	},
	{
		id: 3,
		owner: 3,
		name: 'Володя',
		types: [
			{
				id: 0,
				name: 'Ресторан',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Бар',
				description: 'string',
				slug: 'string',
			},
		],
		city: 'string',
		address: 'м. Преображенская площадь',
		kitchens: [
			{
				id: 0,
				name: 'Итальянская',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Европейская',
				description: 'string',
				slug: 'string',
			},
		],
		services: [
			{
				id: 0,
				name: 'Wi-Fi',
				description: 'string',
				slug: 'string',
			},
		],
		zones: [
			{
				zone: 'string',
				seats: 1,
			},
		],
		average_check: 'от 3000',
		poster: 'http://example.com',
		email: 'user@example.com',
		telephone: 'string',
		description: 'string',
		is_verified: true,
		worked: [
			{
				day: 'понедельник',
				start: '08:00',
				end: '08:00',
				day_off: true,
			},
		],
		is_favorited: true,
		socials: [
			{
				name: 'http://example.com',
			},
		],
		image: [
			{
				name: 'string',
				image:
					'https://resizer.otstatic.com/v2/photos/wide-medium/3/27748532.webp',
			},
		],
		rating: 4.8,
	},
	{
		id: 4,
		owner: 4,
		name: 'Валерий',
		types: [
			{
				id: 0,
				name: 'Мексиканская',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Кофейня',
				description: 'string',
				slug: 'string',
			},
		],
		city: 'string',
		address: 'м. Преображенская площадь',
		kitchens: [
			{
				id: 0,
				name: 'Итальянская',
				description: 'string',
				slug: 'string',
			},
			{
				id: 1,
				name: 'Азиатская',
				description: 'string',
				slug: 'string',
			},
		],
		services: [
			{
				id: 0,
				name: 'Wi-Fi',
				description: 'string',
				slug: 'string',
			},
		],
		zones: [
			{
				zone: 'string',
				seats: 1,
			},
		],
		average_check: 'до 1000',
		poster: 'http://example.com',
		email: 'user@example.com',
		telephone: 'string',
		description: 'string',
		is_verified: true,
		worked: [
			{
				day: 'понедельник',
				start: '08:00',
				end: '08:00',
				day_off: true,
			},
		],
		is_favorited: true,
		socials: [
			{
				name: 'http://example.com',
			},
		],
		image: [
			{
				name: 'string',
				image:
					'https://resizer.otstatic.com/v2/photos/wide-medium/3/27748532.webp',
			},
		],
		rating: 4.8,
	},
];

export default fakeFilterData;
