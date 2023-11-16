import React, { Children, FC, ReactNode, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
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
	booking?: boolean;
	restPage?: boolean;
}

const BookingForm: FC<BookingFormProps> = ({
	children,
	onSubmit,
	booking,
	restPage,
}) => {
	return (
		<div className="booking-form">
			<SearchForm booking={booking} restPage={restPage} onSubmit={onSubmit}>
				<Typography
					variant="h2"
					fontFamily="Ubuntu"
					fontSize="30px"
					fontWeight="400"
					lineHeight="36px"
					color="#fff"
				>
					Забронировать стол
				</Typography>
				<div className="search-results__flex-box">
					<TimePickerValue />
					<DatePickerValue />
				</div>
				<NumberOfPerson />
				{children}
			</SearchForm>
		</div>
	);
};

export default BookingForm;
