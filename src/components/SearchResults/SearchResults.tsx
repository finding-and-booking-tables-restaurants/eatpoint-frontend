import './SearchResults.css';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import SearchForm from '../SearchForm/SearchForm';
import TimePickerValue from '../TimePickerValue/TimePickerValue';
import DatePickerValue from '../DatePicker/DatePickerValue';
import NumberOfPerson from '../NumberOfPerson/NumberOfPerson';
import SearchInput from '../SearchFormInput/SearchInput';
import SearchBtn from '../SearchFormBtn/SearchBtn';
import { Select, FormControl } from '@mui/material';
import { useState } from 'react';

function SearchResults() {
	const [value, setValue] = useState('5');

	const handleChange = (event: SelectChangeEvent) => {
		setValue(event.target.value);
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
					<SearchInput />
					<SearchBtn />
				</SearchForm>
			</div>
			<h2 className="search-results__title">Результаты поиска</h2>
			<p className="search-results__find-items">Найдено 18 заведений</p>
			<div className="search-results__filter-box">
				<button className="search-results__filter-btn"></button>
				<button className="search-results__map-btn"></button>
				<FormControl sx={{ minWidth: 171 }}>
					<Select
						value={value}
						onChange={handleChange}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						sx={{
							height: 32,
							backgroundColor: '#E4F4F1',
							border: 'none',
							fontSize: 14,
						}}
					>
						<MenuItem value={5}>По расстоянию</MenuItem>
						<MenuItem value={10}>По рейтингу</MenuItem>
						<MenuItem value={20}>По цене</MenuItem>
						<MenuItem value={30}>По новизне</MenuItem>
					</Select>
				</FormControl>
			</div>
		</section>
	);
}

export default SearchResults;
