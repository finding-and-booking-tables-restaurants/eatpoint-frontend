export const formatRating = (rating: number) => {
	if (!rating) return 0;
	return parseFloat(rating.toFixed(1));
};
