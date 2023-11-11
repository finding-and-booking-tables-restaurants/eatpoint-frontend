import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import {
	DateValidationError,
	PickerChangeHandlerContext,
} from '@mui/x-date-pickers';
import TodayIcon from '@mui/icons-material/Today';

export default function DatePickerValue() {
	const selectedDate = localStorage.getItem('selected-date');
	const [value, setValue] = useState<Dayjs | null>(
		selectedDate ? dayjs(selectedDate) : dayjs()
	);

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
	};

	useEffect(() => {
		if (selectedDate) return;
		localStorage.setItem('selected-date', String(dayjs()));
		localStorage.setItem(
			'selected-date-formated',
			String(dayjs().format('YYYY-MM-DD'))
		);
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<DatePicker
				value={value}
				onChange={handleDateChange}
				slotProps={{
					// Targets the `IconButton` component.

					// Targets the `InputAdornment` component.
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
						paddingLeft: { xs: 2, sm: 0 },
					},
					'.MuiTextField-root': {
						width: 50,
					},
				}}
			/>
		</LocalizationProvider>
	);
}
