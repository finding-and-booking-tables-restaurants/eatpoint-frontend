export interface Restaurant {
	id: number;
	owner: number;
	name: string;
	types: { id: number; name: string; description: string; slug: string }[];
	city: string;
	address: string;
	kitchens: { id: number; name: string; description: string; slug: string }[];
	services: { id: number; name: string; description: string; slug: string }[];
	zones: { zone: string; seats: number }[];
	average_check: string;
	poster: string;
	email: string;
	telephone: string;
	description: string;
	is_verified: boolean;
	worked: { day: string; start: string; end: string; day_off: boolean }[];
	is_favorited: boolean;
	socials: { name: string }[];
	image: { name: string; image: string }[];
	rating: number;
}
