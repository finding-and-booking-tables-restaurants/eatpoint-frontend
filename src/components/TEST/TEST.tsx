import React, { ChangeEvent, useState } from 'react';

const ImageUploader: React.FC = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [base64Image, setBase64Image] = useState('');

	const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImageUrl(e.target.value);
	};

	const fetchImageAndConvertToBase64 = () => {
		fetch(imageUrl)
			.then((response) => response.blob())
			.then((blob) => {
				const reader = new FileReader();
				reader.onload = (e) => {
					const base64Data = e.target?.result as string;
					setBase64Image(base64Data);
				};
				reader.readAsDataURL(blob);
			})
			.catch((error) => {
				console.error('Ошибка при загрузке изображения:', error);
			});
	};

	function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = function (e: ProgressEvent<FileReader>) {
				const base64String = e.target?.result as string;
				console.log('Base64-строка изображения:', base64String);
			};
			reader.readAsDataURL(file);
		}
	}

	return (
		<div>
			<input
				type="text"
				placeholder="Введите URL изображения"
				value={imageUrl}
				onChange={handleUrlChange}
			/>
			<button onClick={fetchImageAndConvertToBase64}>
				Загрузить и преобразовать в Base64
			</button>
			{base64Image && (
				<div>
					<img src={base64Image} alt="Base64 изображение" />
					<textarea value={base64Image} readOnly />
				</div>
			)}

			<input type="file" accept="image/*" onChange={handleFileInputChange} />

			{/* <form method="post">
				<p>Загрузите ваши фотографии на сервер</p>
				<p>
					<input
						type="file"
						name="photo"
						multiple
						accept="image/*,image/jpeg"
					/>
					<input type="submit" value="Отправить" />
				</p>
			</form> */}
		</div>
	);
};

export default ImageUploader;
