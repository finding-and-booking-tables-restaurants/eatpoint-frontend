import './SearchSity.css';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import { mainApi } from '../../utils/mainApi';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { ICity } from '../../types/commonTypes';

const modalRoot = document.getElementById('modals') as HTMLDivElement;

interface SearchCityProps {
	onClose: () => void;
	setSity: (p: string) => void;
}

const SearchCity: React.FC<SearchCityProps> = ({ onClose, setSity }) => {
	const [data, setData] = useState([
		{ name: 'Москва' },
		{ name: 'Санкт-Петербург' },
		{ name: 'Казань' },
		{ name: 'Нижний Новгород' },
		{ name: 'Ростов-на-Дону' },
		{ name: 'Пермь' },
		{ name: 'Волгоград' },
		{ name: 'Воронеж' },
		{ name: 'Самара' },
		{ name: 'Екатеринбург' },
		{ name: 'Омск' },
		{ name: 'Челябинск' },
		{ name: 'Уфа' },
		{ name: 'Новосибирск' },
		{ name: 'Красноярск' },
	]);
	const [cities, setCities] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedItem, setSelectedItem] = useState('');

	useEffect(() => {
		mainApi
			.getAllCities()
			.then((cities) => setCities(cities))
			.catch((err) => console.log(err));
	}, []);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value;
		setSearchTerm(input);
	};

	const filteredData = cities.filter((item: ICity) => {
		return item.name.toLowerCase().startsWith(searchTerm.toLowerCase());
	});

	const handleItemClick = (item: ICity) => {
		setSelectedItem(item.name);
		localStorage.setItem('city', item.name);
		setSity(item.name);
		onClose();
	};

	return ReactDOM.createPortal(
		<div className="search-sity__section">
			<div className="search-sity__back">
				<button className="search-sity__button" onClick={onClose}>
					<ArrowBackIcon />
				</button>

				<p className="search-sity__text">Выбор города</p>
			</div>

			<TextField
				label="Поиск"
				sx={{ width: '328px', height: '56px' }}
				variant="outlined"
				onChange={handleInputChange}
				value={searchTerm}
				placeholder="Введите город"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<ul className="search-sity__list">
				{!searchTerm &&
					data.map((item: ICity, index) => (
						<li
							className="search-sity__city"
							key={index}
							onClick={() => handleItemClick(item)}
						>
							{item.name}
						</li>
					))}
				{searchTerm &&
					filteredData.map((item: ICity, index) => (
						<li
							className="search-sity__city"
							key={index}
							onClick={() => handleItemClick(item)}
						>
							{item.name}
						</li>
					))}
			</ul>
		</div>,
		modalRoot
	);
};

export default SearchCity;
