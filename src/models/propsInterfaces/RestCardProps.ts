interface ImageData {
	name: string;
	image: string;
}

interface RestCardProps {
	img: string;
	// img: ImageData;
	name: string;
	address: string;
	rating: number;
	reviews?: number;
	search: boolean;
}

export default RestCardProps;
