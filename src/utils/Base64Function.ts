async function imageUrlToBase64(url: string) {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		} else {
			throw new Error(
				`Ошибка получения изображения. Код статуса: ${response.status}`
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Произошла ошибка: ${error.message}`);
		} else {
			throw new Error(`Произошла неизвестная ошибка`);
		}
	}
}

export default imageUrlToBase64;
