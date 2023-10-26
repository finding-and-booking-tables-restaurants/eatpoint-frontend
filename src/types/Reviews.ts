export interface ReviewType {
	id: number;
	establishment: string;
	author: {
		first_name: string;
		last_name: string;
		role: string;
	};
	text: string;
	created: string;
	score: number;
}
