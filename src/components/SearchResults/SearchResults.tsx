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
import { Box, Button, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';

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
	const numberOfFilters =
		selectedKitchenFilters.length +
		selectedTypeFilters.length +
		(selectedCheckFilters ? 1 : 0) +
		selectedServiceFilters.length;

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

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<Box component={'section'} className="search-results">
			<Box
				sx={{
					height: {
						xs: 'auto',
						sm: `${!isSearching && '255px'} `,
						md: `${!isSearching && '525px'} `,
					},
				}}
				className={`search-results__bg-box ${
					isSearching ? 'search-results__bg-box_none' : ''
				}`}
			>
				<Box
					m={{ xs: '32px auto 0 auto', md: 'auto' }}
					maxWidth={{ xs: '360px', sm: '725px', md: '1068px' }}
					minWidth={{
						xs: '328px',
						sm: 'auto',
						lg: `${isSearching ? '1068px' : 'auto'}`,
					}}
				>
					{!isSearching && (
						<Typography
							component={'h2'}
							sx={{
								color: 'white',
								textAlign: 'center',
								fontSize: { xs: '24px', sm: '36px', md: '57px' },
								lineHeight: { sm: '42px', md: '64px' },
								fontWeight: { xs: 400, sm: 600 },
								mb: { xs: 0, sm: '10px', md: '100px', lg: '160px' },
							}}
						>
							{windowWidth > 900
								? 'Откройте двери лучших ресторанов вашего города'
								: 'Найди свой стол'}
						</Typography>
					)}
					<SearchForm isSearching={isSearching} onSubmit={onSubmit}>
						<SearchInput
							query={query}
							setQuery={setQuery}
							isSearching={isSearching}
						/>
						{isSearching && (
							<div className="search-results__box-filters">
								<Button
									variant={areFiltersSelected ? 'contained' : 'outlined'}
									onClick={handleToggleFilterBtn}
									sx={{
										textTransform: 'none',
										borderRadius: '8px',
										minWidth: {
											xs: `${areFiltersSelected ? 'fit-content' : '100%'}`,
											sm: '137px',
										},
										maxHeight: '32px',
										borderColor: '#006C60',
										p: '5px 10px',
										color: '#49454F',
										backgroundColor: `${
											areFiltersSelected ? '#E4F4F1' : 'transparent'
										}`,
									}}
									startIcon={<TuneIcon />}
								>
									{`Фильтры ${
										numberOfFilters > 0 ? `(${numberOfFilters})` : ''
									}`}
								</Button>
								{areFiltersSelected && (
									<Button
										variant="outlined"
										onClick={handleResetFilters}
										sx={{
											textTransform: 'none',
											borderRadius: '8px',
											maxWidth: 'max-content',
											maxHeight: '32px',
											borderColor: '#006C60',
											color: '#49454F',
											p: '5px 10px',
										}}
										endIcon={<ClearIcon />}
									>
										Сбросить фильтры
									</Button>
								)}
							</div>
						)}
						<Button
							variant="contained"
							type="submit"
							sx={{
								backgroundColor: '#05887B',
								textTransform: 'none',
								borderRadius: '8px',
								minHeight: '40px',
								minWidth: { xs: '100%', sm: '225px', md: '355px' },
								display: { xs: 'flex', sm: `${isSearching ? 'none' : 'flex'}` },
							}}
						>
							Искать
						</Button>
					</SearchForm>
				</Box>
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
			</Box>
			{isSearching && (
				<Box
					maxWidth={{ xs: '328px', sm: '688px', lg: '1050px' }}
					minWidth={{ xs: '328px', sm: '550px', lg: '1050px' }}
					m="auto"
				>
					<h2 id="search-results" className="search-results__title_results">
						Результаты поиска
					</h2>
					<p className="search-results__find-items">
						Найдено {mainArr.length} заведений
					</p>

					<Box
						display={'flex'}
						flexWrap={'wrap'}
						p="24px 0"
						gap={{ xs: '16px', sm: '32px', md: '24px' }}
					>
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
					</Box>
				</Box>
			)}
		</Box>
	);
}

export default SearchResults;
