interface Restaurant {
	id: number;
	name: string;
	cuisine: string;
	rating: number;
	city: string;
	address: string;
	openingHoursWeekday: {
		opens: string;
		closes: string;
	};
	openingHoursWeekends: {
		opens: string;
		closes: string;
	};
	reviews: Review[];
	photos: string[];
	check: number;
	phone: string;
	description: string;
	features: {
		parking: boolean;
		wifi: boolean;
		terrace: boolean;
		kidsRoom: boolean;
	};
	zone: {
		mainHall: boolean;
		terrace: boolean;
		banquetHall: boolean;
	};
}

interface Review {
	id: number;
	username: string;
	rating: number;
	text: string;
}

export const restaurants: Restaurant[] = [
	{
		id: 1,
		name: 'Village-Kitchen',
		cuisine: 'Грузинская кухня',
		rating: 4.5,
		city: 'Москва',
		address: 'ул. Арбат, 25',
		openingHoursWeekday: { opens: '12:00', closes: '00:00' },
		openingHoursWeekends: { opens: '14:00', closes: '02:00' },
		photos: [
			'https://thecity.m24.ru/b/d/SYketSivfYo7JPfObLLBFlFNHBpuaXnwmJxNbycGshjv55OD3HWFWh2pL8EsPwl5DpSHzm95vRzNbdeHauL5EWcJ5w9e=oSzRMDYwqMLPrlb3jkregA.jpg',
		],
		check: 1000,
		phone: '7 123 1232323',
		description:
			'The place that everybody is talking about, the cocktail bar and modern fusion restaurant that will mesmerise you. Let our executive chef, Takeshi Ito, delight you with his exquisite ‘tapas style’ creations which are a unique blend of well-known international classics, together with some of his house specials. Our sushi is sourced from only the finest suppliers, and Takeshi’s mouth-watering masterpieces will leave you spellbound. So, please enjoy our beautiful cuisine or just have a drink!',
		features: {
			parking: true,
			wifi: true,
			terrace: true,
			kidsRoom: true,
		},
		zone: {
			mainHall: true,
			terrace: true,
			banquetHall: true,
		},
		reviews: [
			{
				id: 1,
				username: 'John Doe',
				rating: 4,
				text: 'Очень вкусно',
			},
		],
	},
];

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
