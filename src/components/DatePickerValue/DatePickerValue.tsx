import { FC, useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import {
	DateValidationError,
	PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

interface DatePickerValueProps {
	availableDates: { date: string }[];
	currentDate: any;

}

const DatePickerValue: FC<DatePickerValueProps> = ({
	availableDates,
	currentDate,
}) => {
	const formatedSelectedDate =
		localStorage.getItem('selected-date-formated') || '';

	const [value, setValue] = useState<Dayjs | null>(dayjs());

	const handleDateChange = (
		value: dayjs.Dayjs | null,
		context: PickerChangeHandlerContext<DateValidationError>
	) => {
		if (!value) return;
		localStorage.setItem('selected-date', String(value));
		localStorage.setItem(
			'selected-date-formated',
			String(value.format('YYYY-MM-DD'))
		);
		setValue(value);
		currentDate(String(value?.format('YYYY-MM-DD')));
	};



	const isDateAvailable = (date: string) => {
		if (!date) return false;
		return availableDates.some((availableDate) => availableDate.date === date);
	};

	const shouldDisableDate = (day: Dayjs): boolean => {
		const dateStr = day.format('YYYY-MM-DD');
		return !isDateAvailable(dateStr);
	};

	const handleInitDateSelect = () => {
		if (availableDates.length) {
			if (isDateAvailable(formatedSelectedDate)) {
				setValue(dayjs(formatedSelectedDate));
				currentDate(formatedSelectedDate)
				return;
			}
			const firstAvailableDate = availableDates[0]?.date || '';
			localStorage.setItem('selected-date', firstAvailableDate);
			setValue(dayjs(firstAvailableDate));
			localStorage.setItem('selected-date-formated', firstAvailableDate);
		}
	};

	useEffect(() => {
		handleInitDateSelect();
	}, [availableDates.length]);

	// useEffect(() => {
	// 	currentDate(String(value?.format('YYYY-MM-DD')));
	// }, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<DatePicker
				value={value}
				onChange={handleDateChange}
				disablePast
				onError={() => handleInitDateSelect()}
				shouldDisableDate={shouldDisableDate}
				slotProps={{
					inputAdornment: {
						position: 'start',
					},
				}}
				sx={{
					'.MuiDateCalendar-root': {
						backgroundColor: 'black',
					},
					'.MuiInputBase-input': {
						fontSize: 15,
						maxWidth: 160,
						backgroundColor: 'white',
						borderRadius: '8px',
					},
					'.MuiInputBase-root': {
						maxWidth: 160,
						minHeight: 56,
						backgroundColor: 'white',
					},
					'.MuiOutlinedInput-input': {
						paddingLeft: 2,
					},
					'.MuiTextField-root': {
						width: 50,
					},
				}}
			/>
		</LocalizationProvider>
	);
};

export default DatePickerValue;
