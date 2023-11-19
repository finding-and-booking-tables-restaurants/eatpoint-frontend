import './AddRestaurant.css';
import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';
import FilterMenuCheckBox from '../FilterMenu/FilterMenuCheckBox/FilterMenuCheckBox';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SelectWorkTime from './SelectWorkTime/SelectWorkTime';
import { RestaurantData } from '../../types/addRestaurantTypes';
import { mainApi } from '../../utils/mainApi';
import InputsZone from './InputsZone/InputsZone';
import { InputsZoneData } from '../../types/InputsZoneData';

export interface ImageFile {
	file: File;
	preview: string;
}

function AddRestaurant() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<RestaurantData>({
		mode: 'onChange',
	});
	const [formData, setFormData] = useState<RestaurantData>({
		name: '',
		types: [],
		cities: '',
		address: '',
		kitchens: [],
		services: [],
		zones: [{ zone: '', seats: 0 }],
		average_check: '',
		poster: '',
		email: '',
		telephone: '',
		description: '',
		worked: [
			{ day: 'понедельник', start: '00:00', end: '00:00', day_off: false },
			{ day: 'вторник', start: '00:00', end: '00:00', day_off: false },
			{ day: 'среда', start: '00:00', end: '00:00', day_off: false },
			{ day: 'четверг', start: '00:00', end: '00:00', day_off: false },
			{ day: 'пятница', start: '00:00', end: '00:00', day_off: false },
			{ day: 'суббота', start: '00:00', end: '00:00', day_off: false },
			{ day: 'воскресенье', start: '00:00', end: '00:00', day_off: false },
		],
		// images: [],
		socials: [],
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
		[key: string]: boolean;
	}>({});
	const [selectedCheckFilters, setSelectedCheckFilters] = useState<
		string | null
	>(null);
	const [inputsZone, setInputsZone] = useState<InputsZoneData[]>([
		{ zone: '', seats: 0 },
	]);

	const [selectedImageFile, setSelectedImageFiles] = useState<ImageFile[]>([]);

	const addInputsZoneComponent = () => {
		setInputsZone([...inputsZone, { zone: '', seats: 0 }]);
	};

	const removeInputsZoneComponent = (index: number) => {
		const newComponents = [...inputsZone];
		newComponents.splice(index, 1);
		setInputsZone(newComponents);

		setFormData((prevData) => {
			const updatedZones = [...prevData.zones];
			updatedZones.splice(index, 1);
			return {
				...prevData,
				zones: updatedZones,
			};
		});
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		const checkboxName = name;

		if (availableType.includes(checkboxName)) {
			setFormData((prevData) => ({
				...prevData,
				types: checked
					? [...prevData.types, checkboxName]
					: prevData.types.filter((type) => type !== checkboxName),
			}));
		} else if (availableKitchen.includes(checkboxName)) {
			setFormData((prevData) => ({
				...prevData,
				kitchens: checked
					? [...prevData.kitchens, checkboxName]
					: prevData.kitchens.filter((kitchen) => kitchen !== checkboxName),
			}));
		} else if (availableService.includes(checkboxName)) {
			setFormData((prevData) => ({
				...prevData,
				services: checked
					? [...prevData.services, checkboxName]
					: prevData.services.filter((service) => service !== checkboxName),
			}));
		}

		setSelectedCheckboxes((prevSelectedTypes) => ({
			...prevSelectedTypes,
			[name]: checked,
		}));
	};

	const handleCheckFilterClick = (filter: string) => {
		setSelectedCheckFilters(filter);
		setFormData((prevData) => ({
			...prevData,
			average_check: filter,
		}));
	};

	const handleAddZone = (value: string, index: number) => {
		setFormData((prevData) => {
			const updatedZones = [...prevData.zones];
			updatedZones[index] = { ...updatedZones[index], zone: value };
			return {
				...prevData,
				zones: updatedZones,
			};
		});
	};

	const handleAddSeats = (value: number, index: number) => {
		setFormData((prevData) => {
			const updatedZones = [...prevData.zones];
			updatedZones[index] = { ...updatedZones[index], seats: value };

			return {
				...prevData,
				zones: updatedZones,
			};
		});
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	function handlePosterFileInputChange(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault();
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = function (e: ProgressEvent<FileReader>) {
				const base64String = e.target?.result as string;

				setFormData({
					...formData,
					poster: base64String,
				});
				// console.log('Base64-строка изображения:', base64String);
			};
			reader.readAsDataURL(file);
		} else {
			setFormData({ ...formData, poster: undefined });
		}
	}

	const handleImagesFileInputChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		let newFiles: ImageFile[] = [];

		if (files) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();

				reader.onloadend = () => {
					newFiles.push({
						file: file,
						preview: reader.result as string,
					});

					if (newFiles.length === files.length) {
						setSelectedImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
					}
				};

				reader.readAsDataURL(file);
			}
		}
	};

	const handleDeleteImageFile = (index: number) => {
		setSelectedImageFiles((prevFiles) => {
			const newFiles = [...prevFiles];
			newFiles.splice(index, 1);
			return newFiles;
		});
	};

	const handleTimeChange = (day: string, start: string, end: string) => {
		setFormData((prevData) => {
			const updatedWorked = prevData.worked.map((workedDay) => {
				if (workedDay.day === day) {
					return {
						...workedDay,
						start,
						end,
					};
				} else {
					return workedDay;
				}
			});

			return {
				...prevData,
				worked: updatedWorked,
			};
		});
	};

	const handleDayOffChange = (day: string, dayOffValue: boolean) => {
		setFormData((prevData) => {
			const updatedWorked = prevData.worked.map((workedDay) => {
				if (workedDay.day === day) {
					return {
						...workedDay,
						day_off: dayOffValue,
					};
				} else {
					return workedDay;
				}
			});

			return {
				...prevData,
				worked: updatedWorked,
			};
		});
	};

	const handleAddRestaurantSubmit: SubmitHandler<RestaurantData> = async (
		data
	) => {
		try {
			const formDataSend = {
				name: data.name,
				types: formData.types,
				cities: formData.cities,
				address: data.address,
				kitchens: formData.kitchens,
				services: formData.services,
				zones: formData.zones,
				average_check: formData.average_check,
				poster: formData.poster,
				email: data.email,
				telephone: data.telephone,
				description: data.description,
				worked: formData.worked,
				socials: formData.socials,
			};

			await mainApi
				.createMyEstablishment(formDataSend)
				.then(async (res) => {
					const restaurantId = res.id;

					const filesToSend = selectedImageFile.map(
						(imageFile) => imageFile.file
					);

					console.log(filesToSend);
					if (filesToSend.length > 0) {
						await mainApi
							.createImagesEstablishment(restaurantId, filesToSend)
							.then((res) => {
								navigate('/business-profile');
							})
							.catch((err) => {
								console.log('idiot you', err);
							});
					}
				})
				.catch((err) => {
					console.error(err);
					alert('Что-то пошло не так');
				});
		} catch (err) {
			console.error(err);
			alert('Что-то пошло не так');
		}
	};

	return (
		<>
			<Header />
			<section className="add-restaurant">
				<div className="add-restaurant__box">
					<Link to="/business-profile" className="add-restautant__backBtn" />
					<h2 className="add-restaurant__title">Новое заведение</h2>
				</div>
				<form
					className="add-restaurant__form"
					onSubmit={handleSubmit(handleAddRestaurantSubmit)}
				>
					<div className="add-restaurant__box-relative">
						<input
							className={`add-restaurant__input ${
								errors.name ? 'add-restaurant__input_error' : ''
							}`}
							placeholder="Название"
							type="text"
							minLength={2}
							maxLength={30}
							// name="name"
							id="add-restaurant-name"
							// value={formData.name}
							// onChange={handleInputChange}
							required
							{...register('name', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Введите не менее 2 символов',
								},
								maxLength: {
									value: 30,
									message: 'Введите менее 30 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
									message: 'Введите корректное имя',
								},
							})}
						/>
						<span
							className={`add-restaurant__error ${
								errors.name ? 'add-restaurant__error_active' : ''
							}`}
						>
							{errors?.name?.message}
						</span>
						<label
							className={`add-restaurant__label-input ${
								errors.name ? 'add-restaurant__label-input_error' : ''
							}`}
							htmlFor="add-restaurant-name"
						>
							Название
						</label>
					</div>
					<div className="add-restaurant__box-relative">
						<input
							className="add-restaurant__input"
							placeholder="Город"
							type="text"
							maxLength={30}
							name="cities"
							id="add-restaurant-city"
							value={formData.cities}
							onChange={handleInputChange}
							required
						/>
						<label
							className="add-restaurant__label-input"
							htmlFor="add-restaurant-city"
						>
							Город
						</label>
					</div>
					<div className="add-restaurant__box-relative">
						<input
							className={`add-restaurant__input ${
								errors.address ? 'add-restaurant__input_error' : ''
							}`}
							placeholder="Адрес"
							type="text"
							minLength={5}
							maxLength={30}
							// name="address"
							id="add-restaurant-address"
							// value={formData.address}
							// onChange={handleInputChange}
							required
							{...register('address', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 5,
									message: 'Введите не менее 5 символов',
								},
								maxLength: {
									value: 30,
									message: 'Введите менее 30 символов',
								},
							})}
						/>
						<span
							className={`add-restaurant__error ${
								errors.address ? 'add-restaurant__error_active' : ''
							}`}
						>
							{errors?.address?.message}
						</span>
						<label
							className={`add-restaurant__label-input ${
								errors.address ? 'add-restaurant__label-input_error' : ''
							}`}
							htmlFor="add-restaurant-address"
						>
							Адрес
						</label>
					</div>
					<div className="add-restaurant__box-relative">
						<input
							className={`add-restaurant__input ${
								errors.telephone ? 'add-restaurant__input_error' : ''
							}`}
							placeholder="Телефон (+7 *** ***-**-**)"
							type="text"
							// name="telephone"
							id="add-restaurant-telephone"
							minLength={10}
							maxLength={12}
							// value={formData.telephone}
							// onChange={handleInputChange}
							required
							{...register('telephone', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
									message: 'Введите корректный номер телефона',
								},
								minLength: {
									value: 10,
									message: 'Минимальная длина - 10 символов',
								},
								maxLength: {
									value: 12,
									message: 'Максимальная длина - 12 символов',
								},
							})}
						/>
						<span
							className={`add-restaurant__error ${
								errors.telephone ? 'add-restaurant__error_active' : ''
							}`}
						>
							{errors?.telephone?.message}
						</span>
						<label
							className={`add-restaurant__label-input ${
								errors.telephone ? 'add-restaurant__label-input_error' : ''
							}`}
							htmlFor="add-restaurant-telephone"
						>
							Моб. телефон в виде +7(...)... .. ..
						</label>
					</div>
					<div className="add-restaurant__box-relative">
						<input
							className={`add-restaurant__input ${
								errors.email ? 'add-restaurant__input_error' : ''
							}`}
							placeholder="Email заведения"
							// type="email"
							// name="email"
							id="add-restaurant-email"
							// value={formData.email}
							// onChange={handleInputChange}
							required
							{...register('email', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value:
										/^(?!.*(__|-{2}))[A-Z0-9._%+-]+\S@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Электронная почта введена не корректно',
								},
								minLength: {
									value: 5,
									message: 'Введите не менее 5 символов',
								},
								maxLength: {
									value: 50,
									message: 'Введите менее 50 символов',
								},
							})}
						/>
						<span
							className={`add-restaurant__error ${
								errors.email ? 'add-restaurant__error_active' : ''
							}`}
						>
							{errors?.email?.message}
						</span>
						<label
							className={`add-restaurant__label-input ${
								errors.email ? 'add-restaurant__label-input_error' : ''
							}`}
							htmlFor="add-restaurant-email"
						>
							Email заведения
						</label>
					</div>
					<h3 className="add-restaurant__category">Тип заведения</h3>
					{formData.types.length === 0 && (
						<span className="add-restaurant__item_error">
							Выберите хотя бы одно значение
						</span>
					)}
					<ul className="add-restaurant__list">
						{availableType.map((item, i) => (
							<li className="add-restaurant__item" key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name={item}
									id={item}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category">Кухня</h3>
					{formData.kitchens.length === 0 && (
						<span className="add-restaurant__item_error">
							Выберите хотя бы одно значение
						</span>
					)}
					<ul className="add-restaurant__list">
						{availableKitchen.map((item, i) => (
							<li className="add-restaurant__item" key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name={item}
									id={item}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category">
						Типы столов и количество мест
					</h3>
					<p className="add-restaurant__description">
						Можно добавить любые типы столов и их доступное количество мест,
						например, «на терассе — 16».
					</p>
					{inputsZone.map((_, index) => (
						<InputsZone
							key={index}
							index={index}
							onRemove={removeInputsZoneComponent}
							onAddZone={handleAddZone}
							onAddSeats={handleAddSeats}
							formData={formData.zones}
						/>
					))}
					<button
						type="button"
						className="add-restaurant__moreBtn"
						onClick={addInputsZoneComponent}
					>
						Добавить еще
					</button>
					<h3 className="add-restaurant__category">Режим работы (от, до)</h3>
					<SelectWorkTime
						text={'Пн'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<SelectWorkTime
						text={'Вт'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<SelectWorkTime
						text={'Ср'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<SelectWorkTime
						text={'Чт'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<SelectWorkTime
						text={'Пт'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<SelectWorkTime
						text={'Сб'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<SelectWorkTime
						text={'Вс'}
						onTimeChange={handleTimeChange}
						onDayOffChange={handleDayOffChange}
					/>
					<h3 className="add-restaurant__category">Средний чек</h3>
					{formData.average_check === '' && (
						<span className="add-restaurant__item_error">
							Выберите хотя бы одно значение
						</span>
					)}
					<ul className="add-restaurant__radio-list">
						<FilterMenuCheckBox
							text={'до 1000'}
							isChecked={selectedCheckFilters === 'до 1000'}
							onChange={() => handleCheckFilterClick('до 1000')}
						/>
						<FilterMenuCheckBox
							text={'1000 - 2000'}
							isChecked={selectedCheckFilters === '1000 - 2000'}
							onChange={() => handleCheckFilterClick('1000 - 2000')}
						/>
						<FilterMenuCheckBox
							text={'2000 - 3000'}
							isChecked={selectedCheckFilters === '2000 - 3000'}
							onChange={() => handleCheckFilterClick('2000 - 3000')}
						/>
						<FilterMenuCheckBox
							text={'от 3000'}
							isChecked={selectedCheckFilters === 'от 3000'}
							onChange={() => handleCheckFilterClick('от 3000')}
						/>
					</ul>
					<h3 className="add-restaurant__category">Услуги</h3>
					{formData.services.length === 0 && (
						<span className="add-restaurant__item_error">
							Выберите хотя бы одно значение
						</span>
					)}
					<ul className="add-restaurant__list">
						{availableService.map((item, i) => (
							<li className="add-restaurant__item" key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name={item}
									id={item}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category_padding-bot">Описание</h3>
					<div className="add-restaurant__box-relative">
						<label
							className={`add-restaurant__label-text-area ${
								errors.description
									? 'add-restaurant__label-text-area_error'
									: ''
							}`}
							htmlFor="add-restaurant-description"
						>
							Описание заведения (не обязательно)
						</label>
						<textarea
							className={`add-restaurant__text-area ${
								errors.description ? 'add-restaurant__text-area_error' : ''
							}`}
							// name="description"
							id="add-restaurant-description"
							maxLength={400}
							// onChange={handleInputChange}
							{...register('description', {
								maxLength: {
									value: 400,
									message: 'Введите менее 400 символов',
								},
								pattern: {
									value: /^[a-zA-Zа-яА-ЯёЁ\s!?"()\d]*$/,
									message: 'Вы ввели недопустимые символы',
								},
							})}
						/>
						<span
							className={`add-restaurant__error ${
								errors.description ? 'add-restaurant__error_active' : ''
							}`}
						>
							{errors?.description?.message}
						</span>
					</div>
					<h3 className="add-restaurant__category_padding-bot">Обложка</h3>
					<div className="add-restaurant__flex-box-file">
						{formData.poster ? (
							<img
								className="add-restaurant__poster"
								src={
									typeof formData.poster === 'string'
										? formData.poster
										: undefined
								}
								alt="Poster"
							/>
						) : null}
						<div className="input__wrapper">
							<input
								className="input__file"
								name="filePoster"
								type="file"
								accept="image/*"
								id="filePoster"
								onChange={handlePosterFileInputChange}
							/>
							<label htmlFor="filePoster" className="input__file-button">
								<span className="input__file-button-text">Добавить фото</span>
							</label>
						</div>
					</div>
					<h3 className="add-restaurant__category_padding-bot">Фотографии</h3>
					<div className="add-restaurant__box-images">
						{selectedImageFile.map((file, index) => (
							<div className="input-file__background" key={index}>
								<img
									src={file.preview}
									alt={`Preview ${index}`}
									className="input-file__image"
								/>
								<button
									type="button"
									className="input-file__delete-image"
									onClick={() => handleDeleteImageFile(index)}
								></button>
							</div>
						))}
					</div>
					<div className="add-restaurant__flex-box-file">
						<div className="input__wrapper">
							<input
								className="input__file"
								name="file"
								type="file"
								accept="image/*"
								id="input__file"
								multiple
								onChange={handleImagesFileInputChange}
							/>
							<label htmlFor="input__file" className="input__file-button">
								<span className="input__file-button-text">Добавить фото</span>
							</label>
						</div>
					</div>
					<button
						disabled={!isValid}
						className={`add-restaurant__submit-btn ${
							!isValid ? 'add-restaurant__submit-btn_disabled' : ''
						}`}
						type="submit"
					>
						Создать
					</button>
				</form>
				<Link to="/business-profile" className="add-restaurant__back-btn">
					Назад
				</Link>
			</section>
			<Footer />
		</>
	);
}

export default AddRestaurant;
