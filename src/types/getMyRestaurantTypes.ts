interface Worked {
	day: string;
	start: string;
	end: string;
	day_off: boolean;
}

interface Kitchen {
	id: number;
	name: string;
	description: string;
	slug: string;
}

interface Type {
	id: number;
	name: string;
	description: string;
	slug: string;
}

interface Service {
	id: number;
	name: string;
	description: string;
	slug: string;
}

interface Zone {
	id: number;
	zone: string;
	seats: number;
	available_seats: number;
}

interface Establishment {
	id: number;
	name: string;
	cities: string;
	address: string;
	average_check: string;
	description: string;
	email: string;
	images: string[];
	is_favorited: boolean;
	is_verified: boolean;
	owner: string;
	poster: string;
	rating: number | null;
	review_count: number;
	telephone: string;
	worked: Worked[];
	kitchens: Kitchen[];
	types: Type[];
	services: Service[];
	socials: [];
	zones: Zone[];
}

export type { Establishment };
