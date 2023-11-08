async function imageUrlToBase64(url: any): Promise<string | undefined | File> {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const blob = await response.blob();
			return new Promise<string | undefined>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => {
					const result = reader.result as string;
					resolve(result);
				};
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
