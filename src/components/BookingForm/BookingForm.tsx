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
}

const BookingForm: FC<BookingFormProps> = ({ children, onSubmit }) => {
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
				// width={'100%'}
			>
				<Box
					sx={{
						display: 'flex',
						gap: { xs: '8px' },
					}}
				>
					<TimePickerValue />
					<DatePickerValue />
				</Box>
				<NumberOfPerson />
			</Box>
			{children}
		</Box>
	);
};

export default BookingForm;
