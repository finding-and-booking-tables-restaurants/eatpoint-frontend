import { useState } from 'react';
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

export default function DatePickerValue() {
	const selectedDate = localStorage.getItem('selected-date');
	const [value, setValue] = useState<Dayjs | null>(
		selectedDate ? dayjs(selectedDate) : dayjs()
	);

	const handleDateChange = (
		value: dayjs.Dayjs | null,
		context: PickerChangeHandlerContext<DateValidationError>
	) => {
		localStorage.setItem('selected-date', String(value));
		setValue(value);
	};

	const newTheme = (theme: any) =>
		createTheme({
			...theme,
			components: {
				MuiDateCalendar: {
					styleOverrides: {
						root: {
							backgroundColor: 'white',
						},
					},
				},
				MuiPickersDay: {
					styleOverrides: {
						today: {
							backgroundColor: '#05887B',
							color: 'white',
						},
					},
				},
			},
		});

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<ThemeProvider theme={newTheme}>
				<input
					type="hidden"
					name="date_reservation"
					value={value?.format('YYYY-MM-DD')}
				/>
				<DatePicker
					value={value}
					onChange={handleDateChange}
					sx={{
						borderRadius: '8px',
						'.MuiDateCalendar-root': {
							backgroundColor: 'black',
						},
						'.MuiInputBase-input': {
							fontSize: 15,
							maxWidth: 160,
						},
						'.MuiInputBase-root': {
							maxWidth: 160,
							minHeight: 56,
							backgroundColor: '#FCF8EA',
						},
						'.MuiOutlinedInput-input': {
							paddingLeft: 2,
						},
						'.MuiTextField-root': {
							width: 50,
						},
					}}
				/>
			</ThemeProvider>
		</LocalizationProvider>
	);
}
