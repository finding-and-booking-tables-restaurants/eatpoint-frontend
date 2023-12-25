export function formatDate(eventDate: string) {
	const dateObj = new Date(eventDate);
	return dateObj.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long' });
}

// Функция для форматирования времени в формате "часы:минуты"
export function formatTime(eventDate: string) {
	const dateObj = new Date(eventDate);
	return dateObj.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
}
