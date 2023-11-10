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
	booking: boolean;
}

const BookingForm: FC<BookingFormProps> = ({ children, onSubmit, booking }) => {
	return (
		<div className="booking-form">
			<SearchForm booking={booking} onSubmit={onSubmit}>
				<div className="search-results__flex-box">
					<DatePickerValue />
					<TimePickerValue />
				</div>
				<NumberOfPerson />
				{children}
			</SearchForm>
		</div>
	);
};

export default BookingForm;
