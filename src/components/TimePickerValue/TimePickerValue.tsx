import React, { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { timesForTimePicker as times } from '../../utils/constants';
import { MenuItem } from '@mui/material';
import Clocks from '@mui/icons-material/AccessTime';
import { transform } from 'typescript';

function MyTimePicker() {
	// const [time, setTime] = useState<Dayjs | null>(dayjs(dayjs()));

	// const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	const selectedTime = dayjs(event.target.value, 'HH:mm');

	// 	const roundedTime = roundToNearest(selectedTime, 30); // или roundToNearest(selectedTime, 60) для целых часов

	// 	setTime(roundedTime);
	// };

	// function roundToNearest(time: Dayjs, minutes: number): Dayjs {
	// 	const roundedMinutes = Math.round(time.minute() / minutes) * minutes;
	// 	return time.set('minute', roundedMinutes);
	// }

	const [time, setTime] = useState<string>(times[23]);

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedTime = event.target.value;

		setTime(selectedTime);
	};

	return (
		// <TextField
		// 	label="Время"
		// 	type="time"
		// 	name="start_time_reservation"
		// 	value={time ? time.format('HH:mm') : ''}
		// 	onChange={handleTimeChange}
		// 	InputLabelProps={{
		// 		shrink: true,
		// 	}}
		// 	inputMode="text"
		// 	inputProps={{
		// 		step: 1800,
		// 		type: 'time',
		// 	}}
		// 	sx={{
		// 		backgroundColor: '#FCF8EA',
		// 		maxWidth: 156,
		// 		'.MuiInputBase-input': {
		// 			width: 151,
		// 			padding: 2.1,
		// 			paddingRight: 2,
		// 		},
		// 		'.MuiInputBase-root': {
		// 			maxWidth: 130,
		// 			minHeight: 41,
		// 		},
		// 	}}
		// />
		<TextField
			id="outlined-select-currency"
			select
			name="time"
			label="Время"
			value={time}
			onChange={handleTimeChange}
			sx={{
				backgroundColor: '#FCF8EA',
				maxWidth: 328,
				minWidth: 151,
			}}
			SelectProps={{
				IconComponent: () => (
					<Clocks
						style={{
							transform: 'rotate(0deg)',
							marginRight: 10,
							color: 'rgba(0, 0, 0, 0.54)',
						}}
					/>
				),
				MenuProps: {
					PaperProps: {
						style: {
							maxHeight: 334,
						},
					},
				},
			}}
		>
			{times.map((time, idx) => (
				<MenuItem
					key={idx}
					value={time}
					sx={{
						background: '#FCF8EA',
					}}
				>
					{time}
				</MenuItem>
			))}
		</TextField>
	);
}

export default MyTimePicker;
