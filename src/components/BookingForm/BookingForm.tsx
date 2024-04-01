import React, { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import DatePickerValue from '../DatePickerValue/DatePickerValue';
import TimePickerValue from '../TimePickerValue/TimePickerValue';
import NumberOfPerson from '../NumberOfPerson/NumberOfPerson';

import '../SearchResults/SearchResults.css';
import '../SearchFormBtn/SearchBtn.css';
import './BookingForm.css';
import { useLocation } from 'react-router-dom';

interface BookingFormProps {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	availableDates: { date: string }[];
	availableTimes: string[];
	currentDate: (date: string) => void;
	setTime?: (time: string[]) => void;
	numOfPeople?: string[];
	numberPerson?: (value: string) => void;
}

const BookingForm: FC<BookingFormProps> = ({
	children,
	onSubmit,
	availableDates,
	availableTimes,
	currentDate,
	setTime,
	numOfPeople,
	numberPerson,
}) => {
	const location = useLocation();
	const chechLocation = (path: string) => {
		return location.pathname.includes(path) ? true : false;
	};

	return (
		<Box
			component="form"
			display="flex"
			flexDirection={{
				xs: 'column',
				sm: `${chechLocation('/establishment') ? 'row' : 'column'}`,
			}}
			flexWrap="wrap"
			justifyContent="center"
			onSubmit={onSubmit}
			gap={{
				xs: '16px',
				sm: `${chechLocation('/booking') ? '24px' : '16px'}`,
			}}
		>
			<Box
				display={'flex'}
				flexWrap={'wrap'}
				gap={{
					xs: '16px',
					sm: `${chechLocation('/booking') ? '32px' : '16px'}`,
				}}
				justifyContent="center"
			>
				<Box
					sx={{
						display: 'flex',
						gap: { xs: '8px' },
					}}
				>
					<DatePickerValue
						currentDate={currentDate}
						availableDates={availableDates}
					/>
					<TimePickerValue
						availableTimes={availableTimes}
						setTimeValue={setTime || (() => {})}
					/>
				</Box>
				<NumberOfPerson numOfPeople={numOfPeople!} numberPerson={numberPerson!}/>
			</Box>
			{children}
		</Box>
	);
};

export default BookingForm;
