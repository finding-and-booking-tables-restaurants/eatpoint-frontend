export interface Zone {
	zone?: string;
	seats?: number;
	available_seats?: number;
}

interface RestaurantData {
	name: string;
	types: string[];
	cities: string;
	address: string;
	kitchens: string[];
	services: string[];
	zones: Zone[];
	average_check: string;
	// poster: File | string | null | undefined;
	poster: any;
	email: string;
	telephone: string;
	description: string;
	worked: {
		day: string;
		start: string;
		end: string;
		day_off?: boolean;
	}[];
	socials?: { name: string }[];
	images?: { name: string; image: string }[];
}

export type { RestaurantData };

export interface Zone {
	zone?: string;
	seats?: number;
	available_seats?: number;
}
