import { useState } from 'react';
import './SearchResults.css';
import { MouseEvent, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
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
	const [areFiltersSelected, setAreFiltersSelected] = useState(false);

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
		const anyFiltersSelected =
			selectedKitchenFilters.length > 0 ||
			selectedTypeFilters.length > 0 ||
			selectedCheckFilters !== null ||
			selectedServiceFilters.length > 0;

		setAreFiltersSelected(anyFiltersSelected);

		// Фильтрация по кухне
		const kitchenFilteredRestaurants = mainArr.filter((restaurant) => {
			if (selectedKitchenFilters.length === 0) {
				return true;
			}

			return restaurant.kitchens.some((kitchen) =>
				selectedKitchenFilters.includes(kitchen)
			);
		});
		// Фильтрация по типу ресторана
		const typeFilteredRestaurants = mainArr.filter((restaurant) => {
			if (selectedTypeFilters.length === 0) {
				return true;
			}
			return restaurant.types.some((type) =>
				selectedTypeFilters.includes(type)
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
				selectedServiceFilters.includes(service)
			);
		});

		if (anyFiltersSelected) {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<div
				className={`search-results__bg-box ${
					isSearching ? 'search-results__bg-box_none' : ''
				}`}
			>
				{!isSearching && (
					<h2 className="search-results__title">Найди свой стол</h2>
				)}
				<SearchForm onSubmit={onSubmit}>
					<SearchInput
						handleFilterClick={handleToggleFilterBtn}
						query={query}
						setQuery={setQuery}
						isSearching={isSearching}
					/>
					{isSearching && (
						<div className="search-results__box-filters">
							<button
								className="search-input__filter-btn"
								onClick={handleToggleFilterBtn}
							>
								Фильтры
							</button>
							{areFiltersSelected && (
								<button
									onClick={handleResetFilters}
									className="search-results__reset-filters"
								>
									Сбросить фильтры
								</button>
							)}
						</div>
					)}
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
					<h2 id="search-results" className="search-results__title_results">
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
