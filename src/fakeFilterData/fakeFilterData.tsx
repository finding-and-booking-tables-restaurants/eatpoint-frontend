const fakeFilterData = [
	{
		count: 7,
		next: null,
		previous: null,
		results: [
			{
				id: 1,
				owner: 1,
				name: 'Пиццерия',
				types: [
					{
						id: 5,
						name: 'Пивнуха',
						description: 'Животик ням ням',
						slug: 'pivnuha',
					},
				],
				cities: 'Абрамцево',
				address: 'ул. Мирная, 14',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
				],
				services: [
					{
						id: 3,
						name: 'Wi-Fi',
						description: 'Есть вайфайю, но нету чаю',
						slug: 'wi-fi',
					},
				],
				zones: [],
				average_check: '1000 - 2000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_O6kaTw6.jpeg',
				email: 'asfa@asdsa.re',
				telephone: '+79998998878',
				description: 'dasda',
				is_verified: true,
				worked: [
					{
						day: 'вторник',
						start: '08:00',
						end: '12:00',
						day_off: false,
					},
				],
				is_favorited: false,
				socials: [],
				images: [],
				rating: null,
			},
			{
				id: 2,
				owner: 5,
				name: 'Шаурма у дома',
				types: [
					{
						id: 2,
						name: 'Бар',
						description: 'Билли Херрингтон пьёт пиво в баре.',
						slug: 'bar',
					},
				],
				cities: 'Москва',
				address: 'Красная площадь, д. 1',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
				],
				services: [
					{
						id: 5,
						name: 'Парковка',
						description: '123',
						slug: 'parkovka',
					},
					{
						id: 6,
						name: 'Терасса',
						description: '123',
						slug: 'terassa',
					},
				],
				zones: [
					{
						id: 1,
						zone: 'У окна',
						seats: 99,
						available_seats: 96,
					},
					{
						id: 2,
						zone: 'Амфитеатр',
						seats: 67,
						available_seats: 64,
					},
					{
						id: 3,
						zone: 'Чердак',
						seats: 1,
						available_seats: 0,
					},
				],
				average_check: 'от 3000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_XvjuZnM.jpeg',
				email: 'mamba@mamba.cone',
				telephone: '+79999999999',
				description: 'Вкусная шаурма',
				is_verified: true,
				worked: [
					{
						day: 'понедельник',
						start: '08:00',
						end: '17:30',
						day_off: false,
					},
					{
						day: 'вторник',
						start: '08:00',
						end: '17:30',
						day_off: false,
					},
					{
						day: 'среда',
						start: '08:00',
						end: '17:30',
						day_off: false,
					},
					{
						day: 'четверг',
						start: '08:00',
						end: '17:30',
						day_off: false,
					},
					{
						day: 'пятница',
						start: '08:00',
						end: '17:00',
						day_off: false,
					},
					{
						day: 'суббота',
						day_off: true,
						day_off_st: 'Выходной',
					},
					{
						day: 'воскресенье',
						day_off: true,
						day_off_st: 'Выходной',
					},
				],
				is_favorited: false,
				socials: [
					{
						name: 'http://twith.tv',
					},
					{
						name: 'http://yuotabu.com',
					},
				],
				images: [
					{
						name: 'У моря',
						image:
							'http://backend:8000/media/establishment/images/est_image/q_oC-LRgGUo.jpeg',
					},
					{
						name: 'У кона',
						image:
							'http://backend:8000/media/establishment/images/est_image/q_oC-LRgGUo_ca1nEGA.jpeg',
					},
				],
				rating: 3,
			},
			{
				id: 3,
				owner: 4,
				name: 'Пиццерия у пруда',
				types: [
					{
						id: 3,
						name: 'Пиццерия',
						description: 'Пиццы нет и не будет',
						slug: 'picceriya',
					},
				],
				cities: 'Сусанино',
				address: 'Квашенная, д. 28',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
					{
						id: 4,
						name: 'Татарская',
						description: 'На чак-чаке растут горы',
						slug: 'tatarskaya',
					},
				],
				services: [
					{
						id: 2,
						name: 'С живтоными',
						description: 'Можно с котами и собаками, но не с рептилоидами',
						slug: 's-zhivtonymi',
					},
					{
						id: 3,
						name: 'Wi-Fi',
						description: 'Есть вайфайю, но нету чаю',
						slug: 'wi-fi',
					},
				],
				zones: [
					{
						id: 4,
						zone: 'У обрыва',
						seats: 24,
						available_seats: 23,
					},
					{
						id: 5,
						zone: 'У стены',
						seats: 24,
						available_seats: 24,
					},
					{
						id: 6,
						zone: 'У входа',
						seats: 54,
						available_seats: 54,
					},
				],
				average_check: 'до 1000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_pK4yKWE.jpeg',
				email: 'kvasha@mda.com',
				telephone: '+79999999997',
				description:
					'Аыыыы бааааа даааааааааааааааааааааааааааааааааааааааааааааааа',
				is_verified: true,
				worked: [
					{
						day: 'понедельник',
						day_off: true,
						day_off_st: 'Выходной',
					},
					{
						day: 'вторник',
						start: '08:00',
						end: '16:30',
						day_off: false,
					},
					{
						day: 'среда',
						day_off: true,
						day_off_st: 'Выходной',
					},
					{
						day: 'четверг',
						day_off: true,
						day_off_st: 'Выходной',
					},
					{
						day: 'пятница',
						day_off: true,
						day_off_st: 'Выходной',
					},
					{
						day: 'суббота',
						day_off: true,
						day_off_st: 'Выходной',
					},
					{
						day: 'воскресенье',
						day_off: true,
						day_off_st: 'Выходной',
					},
				],
				is_favorited: false,
				socials: [
					{
						name: 'http://mamba@mommy.com',
					},
				],
				images: [
					{
						name: 'Абоба',
						image:
							'http://backend:8000/media/establishment/images/est_image/q_oC-LRgGUo_Y8qzhfs.jpeg',
					},
				],
				rating: null,
			},
			{
				id: 5,
				owner: 3,
				name: 'Пивная у вокзала',
				types: [
					{
						id: 2,
						name: 'Бар',
						description: 'Билли Херрингтон пьёт пиво в баре.',
						slug: 'bar',
					},
					{
						id: 6,
						name: 'Фаст-Фуд',
						description: '123',
						slug: 'fast-fud',
					},
				],
				cities: 'Крапивинский',
				address: 'Большая, д.98',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
				],
				services: [
					{
						id: 3,
						name: 'Wi-Fi',
						description: 'Есть вайфайю, но нету чаю',
						slug: 'wi-fi',
					},
				],
				zones: [],
				average_check: 'до 1000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_cX5VWCt.jpeg',
				email: 'mamfkdf@asda.re',
				telephone: '+79999999991',
				description: 'sadasdwdsad',
				is_verified: true,
				worked: [],
				is_favorited: false,
				socials: [],
				images: [],
				rating: null,
			},
			{
				id: 7,
				owner: 4,
				name: 'Кушать не дам',
				types: [
					{
						id: 2,
						name: 'Бар',
						description: 'Билли Херрингтон пьёт пиво в баре.',
						slug: 'bar',
					},
					{
						id: 3,
						name: 'Пиццерия',
						description: 'Пиццы нет и не будет',
						slug: 'picceriya',
					},
					{
						id: 6,
						name: 'Фаст-Фуд',
						description: '123',
						slug: 'fast-fud',
					},
				],
				cities: 'Вербилки',
				address: 'вфывфыв',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
					{
						id: 5,
						name: 'Итальянская',
						description: '123',
						slug: 'italyanskaya',
					},
					{
						id: 6,
						name: 'Европейская',
						description: '123',
						slug: 'evropejskaya',
					},
				],
				services: [
					{
						id: 3,
						name: 'Wi-Fi',
						description: 'Есть вайфайю, но нету чаю',
						slug: 'wi-fi',
					},
					{
						id: 5,
						name: 'Парковка',
						description: '123',
						slug: 'parkovka',
					},
					{
						id: 6,
						name: 'Терасса',
						description: '123',
						slug: 'terassa',
					},
				],
				zones: [],
				average_check: '1000 - 2000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_1HaC2yC.jpeg',
				email: 'dasdsa@sadasd.re',
				telephone: '+79999999994',
				description: 'dasdsa',
				is_verified: true,
				worked: [],
				is_favorited: false,
				socials: [],
				images: [],
				rating: null,
			},
			{
				id: 8,
				owner: 3,
				name: 'Винный ресторан',
				types: [
					{
						id: 2,
						name: 'Бар',
						description: 'Билли Херрингтон пьёт пиво в баре.',
						slug: 'bar',
					},
					{
						id: 3,
						name: 'Пиццерия',
						description: 'Пиццы нет и не будет',
						slug: 'picceriya',
					},
				],
				cities: 'Варнавино',
				address: 'фывфыв',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
					{
						id: 6,
						name: 'Европейская',
						description: '123',
						slug: 'evropejskaya',
					},
				],
				services: [
					{
						id: 3,
						name: 'Wi-Fi',
						description: 'Есть вайфайю, но нету чаю',
						slug: 'wi-fi',
					},
					{
						id: 5,
						name: 'Парковка',
						description: '123',
						slug: 'parkovka',
					},
					{
						id: 6,
						name: 'Терасса',
						description: '123',
						slug: 'terassa',
					},
				],
				zones: [],
				average_check: 'до 1000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_GN3M22Z.jpeg',
				email: 'dasdas@asdasdwe.re',
				telephone: '+79999999989',
				description: 'asdasd',
				is_verified: true,
				worked: [],
				is_favorited: false,
				socials: [],
				images: [],
				rating: null,
			},
			{
				id: 10,
				owner: 4,
				name: 'Бар оу май',
				types: [
					{
						id: 2,
						name: 'Бар',
						description: 'Билли Херрингтон пьёт пиво в баре.',
						slug: 'bar',
					},
				],
				cities: 'Верея',
				address: 'вфывыф',
				kitchens: [
					{
						id: 3,
						name: 'Русская',
						description: 'Пельменив забабахаем',
						slug: 'russkaya',
					},
					{
						id: 6,
						name: 'Европейская',
						description: '123',
						slug: 'evropejskaya',
					},
				],
				services: [
					{
						id: 6,
						name: 'Терасса',
						description: '123',
						slug: 'terassa',
					},
				],
				zones: [],
				average_check: 'до 1000',
				poster:
					'http://backend:8000/media/establishment/images/poster/q_oC-LRgGUo_hQiUxFC.jpeg',
				email: 'dasdsa@asdasd.re',
				telephone: '+79999999789',
				description: 'asdasda',
				is_verified: true,
				worked: [],
				is_favorited: false,
				socials: [],
				images: [],
				rating: null,
			},
		],
	},
];

export default fakeFilterData;
