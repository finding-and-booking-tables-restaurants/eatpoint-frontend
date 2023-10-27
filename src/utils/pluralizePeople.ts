export function pluralizePeople(count: number) {
	if (count === 1) {
		return '1 человек';
	} else if (count >= 2 && count <= 4) {
		return `${count} человека`;
	} else {
		return `${count} человек`;
	}
}
