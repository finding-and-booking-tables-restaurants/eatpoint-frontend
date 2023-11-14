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

function AddRestaurant() {
	const navigate = useNavigate();
	const {
		watch,
		register,
		setValue,
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
		images: [],
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

	function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
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

	// const handleAddRestaurantSubmit: SubmitHandler<RestaurantData> = async (
	// 	data
	// ) => {
	// 	try {
	// 		const formDataSend = {
	// 			name: data.name,
	// 			types: data.types,
	// 			cities: data.cities,
	// 			address: data.address,
	// 			kitchens: data.kitchens,
	// 			services: data.services,
	// 			zones: data.zones,
	// 			average_check: data.average_check,
	// 			poster: data.poster,
	// 			email: data.email,
	// 			telephone: data.telephone,
	// 			description: data.description,
	// 			worked: data.worked,
	// 			images: data.images,
	// 			socials: [],
	// 		};

	// 		await mainApi.createMyEstablishment(formDataSend);
	// 		navigate('/business-profile');
	// 	} catch (err) {
	// 		console.error(err);
	// 		alert('Что-то пошло не так');
	// 	}
	// };

	function handleAddRestaurantSubmit(evt: React.FormEvent) {
		evt.preventDefault();

		const formDataSend = {
			name: formData.name,
			types: formData.types,
			cities: formData.cities,
			address: formData.address,
			kitchens: formData.kitchens,
			services: formData.services,
			zones: formData.zones,
			average_check: formData.average_check,
			poster: formData.poster,
			email: formData.email,
			telephone: formData.telephone,
			description: formData.description,
			worked: formData.worked,
			images: formData.images,
			socials: [],
		};
		console.log(formDataSend);
		mainApi
			.createMyEstablishment(formDataSend)
			.then(() => {
				navigate('/business-profile');
			})
			.catch((err) => {
				console.log(err);
				alert('Что-то пошло не так');
			});
	}

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
					onSubmit={handleAddRestaurantSubmit}
				>
					<div className="add-restaurant__box-relative">
						<input
							className="add-restaurant__input"
							placeholder="Название"
							type="text"
							maxLength={30}
							name="name"
							id="add-restaurant-name"
							value={formData.name}
							onChange={handleInputChange}
							required
						/>
						<label
							className="add-restaurant__label-input"
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
							className="add-restaurant__input"
							placeholder="Адрес"
							type="text"
							maxLength={30}
							name="address"
							id="add-restaurant-address"
							value={formData.address}
							onChange={handleInputChange}
							required
						/>
						<label
							className="add-restaurant__label-input"
							htmlFor="add-restaurant-address"
						>
							Адрес
						</label>
					</div>
					<div className="add-restaurant__box-relative">
						<input
							className="add-restaurant__input"
							placeholder="Телефон (+7 *** ***-**-**)"
							type="text"
							name="telephone"
							id="add-restaurant-telephone"
							minLength={11}
							maxLength={12}
							value={formData.telephone}
							onChange={handleInputChange}
							required
						/>
						<label
							className="add-restaurant__label-input"
							htmlFor="add-restaurant-telephone"
						>
							Моб. телефон в виде +7(...)... .. ..
						</label>
					</div>
					<div className="add-restaurant__box-relative">
						<input
							className="add-restaurant__input"
							placeholder="Email заведения"
							type="email"
							name="email"
							id="add-restaurant-email"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
						<label
							className="add-restaurant__label-input"
							htmlFor="add-restaurant-email"
						>
							Email заведения
						</label>
					</div>
					<h3 className="add-restaurant__category">Тип заведения</h3>
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
							className="add-restaurant__label-text-area"
							htmlFor="add-restaurant-description"
						>
							Описание заведения (не обязательно)
						</label>
						<textarea
							className="add-restaurant__text-area"
							name="description"
							id="add-restaurant-description"
							maxLength={500}
							onChange={handleInputChange}
						></textarea>
					</div>
					<h3 className="add-restaurant__category_padding-bot">Обложка</h3>
					<div className="add-restaurant__flex-box-file">
						{/* <TEST
							label="загрузить фото"
							onChange={(file) => {
								setRecipeFile(file);
							}}
						></TEST> */}
						<div className="input__wrapper">
							<input
								className="input__file"
								name="file"
								type="file"
								accept="image/*"
								id="input__file"
								onChange={handleFileInputChange}
								required
							/>
							<label htmlFor="input__file" className="input__file-button">
								<span className="input__file-button-text">Добавить фото</span>
							</label>
						</div>
					</div>
					{formData.poster ? (
						<img
							src={
								typeof formData.poster === 'string'
									? formData.poster
									: undefined
							}
							alt="avatar"
							className="add-restaurant__poster"
						/>
					) : null}
					<button className="add-restaurant__submit-btn" type="submit">
						Добавить заведение
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
