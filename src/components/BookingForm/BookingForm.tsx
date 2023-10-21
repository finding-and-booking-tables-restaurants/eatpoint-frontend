import React, { Children, FC, ReactNode, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import DatePickerValue from '../DatePickerValue/DatePickerValue';
import TimePickerValue from '../TimePickerValue/TimePickerValue';
import NumberOfPerson from '../NumberOfPerson/NumberOfPerson';
import SearchBtn from '../SearchFormBtn/SearchBtn';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../SearchResults/SearchResults.css';
import '../SearchFormBtn/SearchBtn.css';
import './BookingForm.css';
import { numOfPeople } from '../../utils/constants';

interface BookingFormProps {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const BookingForm: FC<BookingFormProps> = ({ children, onSubmit }) => {
	return (
		<div className="booking-form">
			<SearchForm onSubmit={onSubmit}>
				<div className="search-results__flex-box">
					<DatePickerValue />
					<TimePickerValue />
				</div>
				<TextField
					id="outlined-select-currency"
					select
					name="number_guests"
					label="Количество человек"
					defaultValue={1}
					sx={{
						backgroundColor: '#FCF8EA',
						maxWidth: 328,
						'& .MuiSelect-menu': {
							// Установите желаемую минимальную и максимальную высоту
							minHeight: '100px',
							maxHeight: '200px',
						},
					}}
				>
					{numOfPeople.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
							sx={{
								backgroundColor: '#FCF8EA',
							}}
						>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				{children}
			</SearchForm>
		</div>
	);
};

export default BookingForm;
