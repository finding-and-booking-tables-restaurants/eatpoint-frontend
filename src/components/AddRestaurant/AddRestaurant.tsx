import './AddRestaurant.css';
import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';
import FilterMenuCheckBox from '../FilterMenu/FilterMenuCheckBox/FilterMenuCheckBox';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SelectWorkTime from './SelectWorkTime/SelectWorkTime';

interface Zone {
	zone?: string;
	seats?: number;
	available_seats?: number;
}

interface RestaurantData {
	name: string;
	types: string[];
	cities: string;
	address: string;
	kitchens: string[];
	services: string[];
	zones: Zone[];
	average_check: string;
	poster: string;
	email: string;
	telephone: string;
	description: string;
	worked: {
		day: string;
		start: string;
		end: string;
		day_off?: boolean;
	}[];
	socials?: { name: string }[];
	images?: { name: string; image: string }[];
}

function AddRestaurant() {
	const [formData, setFormData] = useState<RestaurantData>({
		name: '',
		types: [], // array with checkbox
		cities: '',
		address: '',
		kitchens: [], // array with checkbox выбор любой
		services: [], // array with checkbox
		zones: [{ zone: '', seats: 0, available_seats: 0 }],
		average_check: '', //checkbox 1 выбор
		poster: '',
		email: '',
		telephone: '',
		description: '',
		worked: [{ day: '', start: '', end: '' }], // ???
	});

	const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
		[key: string]: boolean;
	}>({});

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setSelectedCheckboxes((prevSelectedTypes) => ({
			...prevSelectedTypes,
			[name]: checked,
		}));
	};

	function handleSubmit(evt: React.FormEvent) {
		evt.preventDefault();
	}

	const handleAddZone = (value: string) => {
		setFormData((prevData) => ({
			...prevData,
			zones: [
				...prevData.zones,
				{
					zone: value,
				},
			],
		}));
	};

	const handleAddSeats = (value: number) => {
		setFormData((prevData) => ({
			...prevData,
			zones: [
				...prevData.zones,
				{
					seats: value,
				},
			],
		}));
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

	// const handleCheckFilterClick = (filter: string) => {
	// 	setSelectedCheckFilters((prevCheckFilter) =>
	// 		prevCheckFilter === filter ? null : filter
	// 	);
	// };

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
					/>
					<input
						className="add-restaurant__input"
						placeholder="Город"
						type="text"
						maxLength={30}
						name="cities"
						value={formData.cities}
						onChange={handleInputChange}
					/>
					<input
						className="add-restaurant__input"
						placeholder="Адрес"
						type="text"
						maxLength={30}
						name="address"
						value={formData.address}
						onChange={handleInputChange}
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
					/>
					<input
						className="add-restaurant__input"
						placeholder="Email заведения"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
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
									checked={selectedCheckboxes[item] || false}
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
						></input>
						<input
							className="add-restaurant__input-place_num"
							placeholder="Мест"
							maxLength={4}
							type="text"
							name="seats"
							onChange={(e) => handleAddSeats(parseInt(e.target.value))}
						/>
					</div>
					<button className="add-restaurant__moreBtn">Еще</button>
					<h3 className="add-restaurant__category">Режим работы (от, до)</h3>
					<SelectWorkTime text={'Пн'} />
					<SelectWorkTime text={'Вт'} />
					<SelectWorkTime text={'Ср'} />
					<SelectWorkTime text={'Чт'} />
					<SelectWorkTime text={'Пт'} />
					<SelectWorkTime text={'Сб'} />
					<SelectWorkTime text={'Вс'} />
					<h3 className="add-restaurant__category">Средний чек</h3>
					<ul className="add-restaurant__radio-list">
						<FilterMenuCheckBox text={'до 1000'} />
						<FilterMenuCheckBox text={'1000 - 2000'} />
						<FilterMenuCheckBox text={'2000 - 3000'} />
						<FilterMenuCheckBox text={'от 3000'} />
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
					></textarea>
					<h3 className="add-restaurant__category_padding-bot">Фотографии</h3>
					<input
						className="add-restaurant__input"
						placeholder="Ссылка на фотографию"
						type="url"
						name="poster"
						value={formData.poster}
						onChange={handleInputChange}
					></input>
					<button className="add-restaurant__submit-btn">
						Добавить заведение
					</button>
				</form>
			</section>
			<Footer />
		</>
	);
}

export default AddRestaurant;
