import './AddRestaurant.css';
import { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

function AddRestaurant() {
	const navigate = useNavigate();
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
			{ day: 'понедельник', start: '00:00', end: '00:00' },
			{ day: 'вторник', start: '00:00', end: '00:00' },
			{ day: 'среда', start: '00:00', end: '00:00' },
			{ day: 'четверг', start: '00:00', end: '00:00' },
			{ day: 'пятница', start: '00:00', end: '00:00' },
			{ day: 'суббота', start: '00:00', end: '00:00' },
			{ day: 'воскресенье', start: '00:00', end: '00:00' },
		],
	});

	const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
		[key: string]: boolean;
	}>({});
	const [selectedCheckFilters, setSelectedCheckFilters] = useState<
		string | null
	>(null);

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

	const handleAddZone = (value: string) => {
		setFormData((prevData) => {
			const updatedZones = prevData.zones.map((zone) => {
				if (zone.seats === 0) {
					return { ...zone, zone: value };
				}
				return zone;
			});

			return {
				...prevData,
				zones: updatedZones,
			};
		});
	};

	const handleAddSeats = (value: number) => {
		setFormData((prevData) => {
			const updatedZones = prevData.zones.map((zone, index) => {
				if (index === 0) {
					return { ...zone, seats: value };
				}
				return zone;
			});

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
		}
	}

	const handleTimeChange = (start: string, end: string) => {
		setFormData((prevData) => {
			const updatedWorked = prevData.worked.map((workedDay) => ({
				...workedDay,
				start,
				end,
			}));

			return {
				...prevData,
				worked: updatedWorked,
			};
		});
	};

	function handleSubmit(evt: React.FormEvent) {
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
		};

		mainApi
			.createEstablishment(formDataSend)
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
				<form className="add-restaurant__form" onSubmit={handleSubmit}>
					<input
						className="add-restaurant__input"
						placeholder="Название"
						type="text"
						maxLength={30}
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Город"
						type="text"
						maxLength={30}
						name="cities"
						value={formData.cities}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Адрес"
						type="text"
						maxLength={30}
						name="address"
						value={formData.address}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Телефон (+7 *** ***-**-**)"
						type="text"
						name="telephone"
						minLength={11}
						maxLength={12}
						value={formData.telephone}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Email заведения"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
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
					<div className="add-restaurant__flex-box">
						<input
							className="add-restaurant__input-place"
							placeholder="Основной зал"
							type="text"
							name="zones"
							maxLength={30}
							onChange={(evt) => handleAddZone(evt.target.value)}
							required
						></input>
						<input
							className="add-restaurant__input-place_num"
							placeholder="Мест"
							maxLength={4}
							type="text"
							name="seats"
							onChange={(e) => handleAddSeats(parseInt(e.target.value))}
							required
						/>
					</div>
					{/* <button className="add-restaurant__moreBtn">Еще</button> */}
					<h3 className="add-restaurant__category">Режим работы (от, до)</h3>
					<SelectWorkTime text={'Пн'} onTimeChange={handleTimeChange} />
					<SelectWorkTime text={'Вт'} onTimeChange={handleTimeChange} />
					<SelectWorkTime text={'Ср'} onTimeChange={handleTimeChange} />
					<SelectWorkTime text={'Чт'} onTimeChange={handleTimeChange} />
					<SelectWorkTime text={'Пт'} onTimeChange={handleTimeChange} />
					<SelectWorkTime text={'Сб'} onTimeChange={handleTimeChange} />
					<SelectWorkTime text={'Вс'} onTimeChange={handleTimeChange} />
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
					<textarea
						className="add-restaurant__text-area"
						name="description"
						maxLength={500}
						onChange={handleInputChange}
						required
					></textarea>
					<h3 className="add-restaurant__category_padding-bot">Фотография</h3>
					<div className="add-restaurant__flex-box-file">
						<p className="add-restaurant__file-paragraph">
							Добавьте фото размером до 5 МБ
						</p>
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
					<button className="add-restaurant__submit-btn" type="submit">
						Добавить заведение
					</button>
				</form>
			</section>
			<Footer />
		</>
	);
}

export default AddRestaurant;
