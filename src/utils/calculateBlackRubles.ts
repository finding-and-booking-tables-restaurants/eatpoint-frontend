export const calculateBlackRubles = (averageCheck: string) => {
	if (averageCheck === 'до 1000') return 1;
	if (averageCheck === '1000 - 2000') return 2;
	if (averageCheck === '2000 - 3000') return 3;
	if (averageCheck === 'от 3000') return 4;
	return 1;
};
