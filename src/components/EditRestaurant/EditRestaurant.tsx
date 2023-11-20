import { useState, useEffect, ChangeEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FilterMenuCheckBox from '../FilterMenu/FilterMenuCheckBox/FilterMenuCheckBox';
import SelectWorkTime from '../AddRestaurant/SelectWorkTime/SelectWorkTime';
import {
	availableKitchen,
	availableType,
	availableService,
	maxWidthBoxConfig,
	minWidthBoxConfig,
} from '../../utils/constants';
import { RestaurantData } from '../../types/addRestaurantTypes';
import { mainApi } from '../../utils/mainApi';
import { daysOfWeek } from '../../utils/constants';
import InputsZone from '../AddRestaurant/InputsZone/InputsZone';
import { InputsZoneData } from '../../types/InputsZoneData';
import { Box } from '@mui/material';
import Preloader from '../Preloader/Preloader';

interface ImageFile {
	file: File;
	preview: string;
}

function EditRestaurant() {
	const params = useParams();
	const restaurantId = params.id;
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<RestaurantData>({
		mode: 'onChange',
	});

	useEffect(() => {
		mainApi.getMyEstablishmentById(restaurantId).then((res) => {
			setFormData(res);
			setSelectedCheckFilters(res.average_check);
			setInputsZone(res.zones);
		});
	}, [restaurantId]);

	const [formData, setFormData] = useState<RestaurantData>({
		name: '',
		types: [],
		cities: '',
		address: '',
		kitchens: [],
		services: [],
		zones: [],
		average_check: '',
		poster: '',
		email: '',
		telephone: '',
		description: '',
		worked: [],
		images: [],
	});

	useEffect(() => {
		setValue('name', formData.name);
		setValue('address', formData.address);
		setValue('telephone', formData.telephone);
		setValue('email', formData.email);
		setValue('description', formData.description);
		setValue('cities', formData.cities);
	}, [
		formData.address,
		formData.cities,
		formData.description,
		formData.email,
		formData.name,
		formData.telephone,
		setValue,
	]);

	console.log(formData);

	const [loading, setLoading] = useState(true);
	const [selectedCheckFilters, setSelectedCheckFilters] = useState<string>(
		formData.average_check || ''
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
		[key: string]: boolean;
	}>({});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [posterChanged, setPosterChanged] = useState(false);

	const [inputsZone, setInputsZone] = useState<InputsZoneData[]>([]);
	const [selectedImageFile, setSelectedImageFiles] = useState<ImageFile[]>([]);
	const haveTypes = formData.types.length === 0;
	const haveKitchen = formData.kitchens.length === 0;
	const haveServises = formData.services.length === 0;
	const haveAverageCheck = formData.average_check === '';
	const havePoster = !formData.poster;

	const addInputsZoneComponent = () => {
		setInputsZone([...inputsZone, { zone: '', seats: 0 }]);
	};

	const removeInputsZoneComponent = (index: number) => {
		const newComponents = [...inputsZone];
		newComponents.splice(index, 1);
		setInputsZone(newComponents);
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

	function handlePosterFileInputChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = function (e: ProgressEvent<FileReader>) {
				const base64String = e.target?.result as string;

				setFormData({
					...formData,
					poster: base64String,
				});
				setPosterChanged(true);
			};
			reader.readAsDataURL(file);
		} else {
			setFormData({ ...formData, poster: undefined });
			setPosterChanged(false);
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

	async function handleDeleteImageFromServer(
		restaurantId: string | undefined,
		imageId: number | undefined,
		index: number
	) {
		try {
			const response = await mainApi.deleteImagesEstablishment(
				restaurantId,
				imageId
			);
			console.log(response, 'Успешно');
			setFormData((prevFormData: any) => {
				const updatedImages = [...prevFormData.images];
				updatedImages.splice(index, 1);
				return {
					...prevFormData,
					images: updatedImages,
				};
			});
		} catch (error) {
			console.error('In catch Delete Image', error);
		}
	}

	const handleEditRestaurantSubmit: SubmitHandler<RestaurantData> = async (
		data
	) => {
		let formDataSend = {
			name: data.name,
			types: formData.types,
			cities: data.cities,
			address: data.address,
			kitchens: formData.kitchens,
			services: formData.services,
			zones: formData.zones,
			average_check: formData.average_check,
			// poster: formData.poster,
			poster: undefined,
			email: data.email,
			telephone: formData.telephone,
			description: data.description,
			worked: formData.worked,
		};

		if (posterChanged) {
			formDataSend = {
				...formDataSend,
				poster: formData.poster,
			};
		}

		mainApi
			.editMyEstablishment(formDataSend, restaurantId)
			.then((res) => {
				setFormData(res);
			})
			.then((res) => {
				const filesToSend = selectedImageFile.map(
					(imageFile) => imageFile.file
				);
				if (filesToSend.length > 0) {
					mainApi
						.createImagesEstablishment(restaurantId, filesToSend)
						.then((res) => {})
						.catch((err) => {
							console.log('catch error', err);
						});
				}
				navigate('/business-profile');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		mainApi.getMyEstablishmentById(restaurantId).then((res) => {
			setFormData(res);
			setLoading(false);
		});
	}, [restaurantId]);

	if (loading) {
		return <Preloader />;
	}

	return (
		<>
			<Header />
			<Box
				component={'section'}
				// p={'16px 16px 0 16px'}
				minWidth={maxWidthBoxConfig}
				maxWidth={minWidthBoxConfig}
				m={'auto auto 45px auto'}
			>
				<div className="add-restaurant__box">
					<Link to="/business-profile" className="add-restautant__backBtn" />
					<h2 className="add-restaurant__title">Редактировать заведение</h2>
				</div>
				<form
					className="add-restaurant__form"
					onSubmit={handleSubmit(handleEditRestaurantSubmit)}
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
							id="add-restaurant-name"
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
							className={`add-restaurant__input ${
								errors.cities ? 'add-restaurant__input_error' : ''
							}`}
							placeholder="Город"
							type="text"
							maxLength={30}
							// name="cities"
							id="add-restaurant-city"
							// value={formData.cities}
							// onChange={handleInputChange}
							required
							{...register('cities', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Введите не менее 2 символов',
								},
								maxLength: {
									value: 20,
									message: 'Введите менее 20 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
									message: 'Введите корректное имя',
								},
							})}
						/>
						<span
							className={`add-restaurant__error ${
								errors.cities ? 'add-restaurant__error_active' : ''
							}`}
						>
							{errors?.cities?.message}
						</span>
						<label
							className={`add-restaurant__label-input ${
								errors.cities ? 'add-restaurant__label-input_error' : ''
							}`}
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
							id="add-restaurant-address"
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
							id="add-restaurant-telephone"
							minLength={10}
							maxLength={12}
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
							id="add-restaurant-email"
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
					{haveTypes && (
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
									defaultChecked={formData.types.includes(item)}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category">Кухня</h3>
					{haveKitchen && (
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
									defaultChecked={formData.kitchens.includes(item)}
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
						className="add-restaurant__moreBtn"
						type="button"
						onClick={addInputsZoneComponent}
					>
						Добавить еще
					</button>
					<h3 className="add-restaurant__category">Режим работы (от, до)</h3>
					<div>
						{daysOfWeek.map((day, index) => {
							const dayData = formData?.worked[index];
							return (
								<SelectWorkTime
									key={day}
									text={day}
									onTimeChange={handleTimeChange}
									selectedTimeStart={dayData ? dayData.start : ''}
									selectedTimeEnd={dayData ? dayData.end : ''}
								/>
							);
						})}
					</div>
					<h3 className="add-restaurant__category">Средний чек</h3>
					{haveAverageCheck && (
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
					{haveServises && (
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
									defaultChecked={formData.services.includes(item)}
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
							id="add-restaurant-description"
							maxLength={400}
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
					<h3 className="add-restaurant__category_padding-bot">Фотография</h3>
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
						{formData.images
							? formData?.images.map((file, index: number) => (
									<div className="input-file__background" key={index}>
										<img
											src={file.image}
											alt={`Preview ${index}`}
											className="input-file__image"
										/>
										<button
											type="button"
											className="input-file__delete-image"
											onClick={() =>
												handleDeleteImageFromServer(
													restaurantId,
													file.id,
													index
												)
											}
										></button>
									</div>
							  ))
							: null}
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
						disabled={
							!isValid ||
							haveTypes ||
							haveKitchen ||
							haveServises ||
							haveAverageCheck ||
							havePoster
						}
						className={`add-restaurant__submit-btn ${
							!isValid ||
							haveTypes ||
							haveKitchen ||
							haveServises ||
							haveAverageCheck ||
							havePoster
								? 'add-restaurant__submit-btn_disabled'
								: ''
						}`}
						type="submit"
					>
						Сохранить
					</button>
				</form>
				<Link to="/business-profile" className="add-restaurant__back-btn">
					Назад
				</Link>
			</Box>
			<Footer />
		</>
	);
}

export default EditRestaurant;
