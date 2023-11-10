interface ImageData {
	name: string;
	image: string;
}

interface RestCardProps {
	img: string;
	name: string;
	address: string;
	rating: number;
	reviews?: number;
	search: boolean;
	id: number;
	average_check: string;
}

export default RestCardProps;
