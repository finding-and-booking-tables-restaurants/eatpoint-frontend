import './SearchResults.css';
import { MouseEvent, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import TimePickerValue from '../TimePickerValue/TimePickerValue';
import DatePickerValue from '../DatePicker/DatePickerValue';
import NumberOfPerson from '../NumberOfPerson/NumberOfPerson';
import SearchInput from '../SearchFormInput/SearchInput';
import SearchBtn from '../SearchFormBtn/SearchBtn';
import { useState } from 'react';
import RestCard from '../RestCard/RestCard';
import FilterMenu from '../FilterMenu/FilterMenu';
import fakeFilterData from '../../fakeFilterData/fakeFilterData';
import { Restaurant } from '../../models/data/RestData';

function SearchResults() {
	const [isOpen, setIsOpen] = useState(false);
	const [mainArr, setMainArr] = useState(fakeFilterData);
	const [selectedKitchenFilters, setSelectedKitchenFilters] = useState<
		string[]
	>([]);
	const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>([]);
	const [selectedCheckFilters, setSelectedCheckFilters] = useState<
		string | null
	>(null);
	const [selectedServiceFilters, setSelectedServiceFilters] = useState<
		string[]
	>([]);

	const handleFilterClick = (filter: string) => {
		if (selectedKitchenFilters.includes(filter)) {
			setSelectedKitchenFilters(
				selectedKitchenFilters.filter(
					(selectedFilter) => selectedFilter !== filter
				)
			);
		} else {
			setSelectedKitchenFilters([...selectedKitchenFilters, filter]);
		}
	};

	const handleTypeFilterClick = (filter: string) => {
		setSelectedTypeFilters((prevTypeFilters) =>
			prevTypeFilters.includes(filter)
				? prevTypeFilters.filter((selectedFilter) => selectedFilter !== filter)
				: [...prevTypeFilters, filter]
		);
	};

	const handleCheckFilterClick = (filter: string) => {
		setSelectedCheckFilters((prevCheckFilter) =>
			prevCheckFilter === filter ? null : filter
		);
	};

	const handleServiceFilterClick = (filter: string) => {
		setSelectedServiceFilters((prevServiceFilters) =>
			prevServiceFilters.includes(filter)
				? prevServiceFilters.filter(
						(selectedFilter) => selectedFilter !== filter
				  )
				: [...prevServiceFilters, filter]
		);
	};

	useEffect(() => {
		// Фильтрация по кухне
		const kitchenFilteredRestaurants = fakeFilterData.filter((restaurant) => {
			if (selectedKitchenFilters.length === 0) {
				return true;
			}
			return restaurant.kitchens.some((kitchen) =>
				selectedKitchenFilters.includes(kitchen.name)
			);
		});
		// Фильтрация по типу ресторана
		const typeFilteredRestaurants = fakeFilterData.filter((restaurant) => {
			if (selectedTypeFilters.length === 0) {
				return true;
			}
			return restaurant.types.some((type) =>
				selectedTypeFilters.includes(type.name)
			);
		});

		// Фильтрация по среднему чеку
		const averageCheckFilteredRestaurants = fakeFilterData.filter(
			(restaurant) => {
				if (selectedCheckFilters === null) {
					return true;
				}
				return restaurant.average_check === selectedCheckFilters;
			}
		);

		// Фильтрация по доп сервисам
		const serviceFilteredRestaurants = fakeFilterData.filter((restaurant) => {
			if (selectedServiceFilters.length === 0) {
				return true;
			}
			return restaurant.services.some((service) =>
				selectedServiceFilters.includes(service.name)
			);
		});

		// Объединение результатов фильтрации
		const combinedFilteredRestaurants = typeFilteredRestaurants.filter(
			(restaurant) =>
				kitchenFilteredRestaurants.includes(restaurant) &&
				averageCheckFilteredRestaurants.includes(restaurant) &&
				serviceFilteredRestaurants.includes(restaurant)
		);

		setMainArr(combinedFilteredRestaurants);
	}, [
		selectedKitchenFilters,
		selectedTypeFilters,
		selectedCheckFilters,
		selectedServiceFilters,
	]);

	const handleToggleFilterBtn = (evt: MouseEvent) => {
		evt.preventDefault();
		setIsOpen(!isOpen);
	};

	return (
		<section className="search-results">
			<div className="search-results__bg-box">
				<SearchForm>
					<div className="search-results__flex-box">
						<DatePickerValue />
						<TimePickerValue />
					</div>
					<NumberOfPerson />
					<SearchInput handleFilterClick={handleToggleFilterBtn} />
					<SearchBtn />
				</SearchForm>
				<FilterMenu
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					handleFilterKitchenClick={handleFilterClick}
					handleTypeFilterClick={handleTypeFilterClick}
					handleCheckFilterClick={handleCheckFilterClick}
					handleServiceFilterClick={handleServiceFilterClick}
					selectedKitchenFilters={selectedKitchenFilters}
					selectedTypeFilters={selectedTypeFilters}
					selectedCheckFilters={selectedCheckFilters}
					selectedServiceFilters={selectedServiceFilters}
				/>
			</div>
			<h2 id="search-results" className="search-results__title">
				Результаты поиска
			</h2>
			<p className="search-results__find-items">
				Найдено {mainArr.length} заведений
			</p>
			<ul className="search-results__list">
				{mainArr.map((restaurant: Restaurant, index: number) => (
					<RestCard
						key={index}
						name={restaurant.name}
						rating={restaurant.rating}
						img={restaurant.image[0].image}
						search={true}
						address={restaurant.address}
					/>
				))}
			</ul>
		</section>
	);
}

export default SearchResults;
