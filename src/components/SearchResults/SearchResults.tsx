import { useState } from 'react';
import './SearchResults.css';
import { MouseEvent, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import TimePickerValue from '../TimePickerValue/TimePickerValue';
import DatePickerValue from '../DatePickerValue/DatePickerValue';
import NumberOfPerson from '../NumberOfPerson/NumberOfPerson';
import SearchInput from '../SearchFormInput/SearchInput';
import SearchBtn from '../SearchFormBtn/SearchBtn';
import RestCard from '../RestCard/RestCard';
import FilterMenu from '../FilterMenu/FilterMenu';
import { Restaurant } from '../../utils/constants';
import { formatRating } from '../../utils/formatRating';

interface SearchResultsProps {
	searchEstablishments: Restaurant[];
	setAllEstablishments: (restaurants: Restaurant[]) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	query: string;
	setQuery: (query: string) => void;
	isSearching: boolean;
}

function SearchResults({
	searchEstablishments,
	onSubmit,
	query,
	setQuery,
	isSearching,
}: SearchResultsProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [mainArr, setMainArr] = useState(searchEstablishments);
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

	useEffect(() => {
		setMainArr(searchEstablishments);
	}, [searchEstablishments]);

	const handleResetFilters = () => {
		setMainArr(searchEstablishments);
		setSelectedKitchenFilters([]);
		setSelectedTypeFilters([]);
		setSelectedCheckFilters(null);
		setSelectedServiceFilters([]);
	};

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
		const kitchenFilteredRestaurants = mainArr.filter((restaurant) => {
			if (selectedKitchenFilters.length === 0) {
				return true;
			}
			return restaurant.kitchens.some((kitchen) =>
				selectedKitchenFilters.includes(kitchen.name)
			);
		});
		// Фильтрация по типу ресторана
		const typeFilteredRestaurants = mainArr.filter((restaurant) => {
			if (selectedTypeFilters.length === 0) {
				return true;
			}
			return restaurant.types.some((type) =>
				selectedTypeFilters.includes(type.name)
			);
		});

		// Фильтрация по среднему чеку
		const averageCheckFilteredRestaurants = mainArr.filter((restaurant) => {
			if (selectedCheckFilters === null) {
				return true;
			}
			return restaurant.average_check === selectedCheckFilters;
		});

		// Фильтрация по доп сервисам
		const serviceFilteredRestaurants = mainArr.filter((restaurant) => {
			if (selectedServiceFilters.length === 0) {
				return true;
			}
			return restaurant.services.some((service) =>
				selectedServiceFilters.includes(service.name)
			);
		});

		if (
			selectedKitchenFilters.length > 0 ||
			selectedTypeFilters.length > 0 ||
			selectedCheckFilters !== null ||
			selectedServiceFilters.length > 0
		) {
			// Объединение результатов фильтрации
			const combinedFilteredRestaurants = typeFilteredRestaurants.filter(
				(restaurant) =>
					kitchenFilteredRestaurants.includes(restaurant) &&
					averageCheckFilteredRestaurants.includes(restaurant) &&
					serviceFilteredRestaurants.includes(restaurant)
			);

			setMainArr(combinedFilteredRestaurants);
		} else {
			setMainArr(searchEstablishments);
		}
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
				<SearchForm onSubmit={onSubmit}>
					<div className="search-results__flex-box">
						<DatePickerValue />
						<TimePickerValue />
					</div>
					<NumberOfPerson />
					<SearchInput
						handleFilterClick={handleToggleFilterBtn}
						query={query}
						setQuery={setQuery}
						isSearching={isSearching}
					/>
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
			{isSearching && (
				<div className="search-results__cards-container">
					<h2 id="search-results" className="search-results__title">
						Результаты поиска
					</h2>
					<p className="search-results__find-items">
						Найдено {mainArr.length} заведений
					</p>
					{/* <button className='search-input__filter-btn'></button> */}
					{/* <button onClick={handleResetFilters}>Сбросить фильтры</button> */}
					<ul className="search-results__list">
						{mainArr.map((restaurant: Restaurant, index: number) => (
							<RestCard
								key={index}
								name={restaurant.name}
								rating={formatRating(restaurant.rating)}
								img={restaurant.poster}
								search={true}
								address={restaurant.address}
								id={restaurant.id}
								reviews={restaurant.review_count}
								average_check={restaurant.average_check}
							/>
						))}
					</ul>
				</div>
			)}
		</section>
	);
}

export default SearchResults;
