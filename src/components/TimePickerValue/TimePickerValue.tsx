import React, { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';

function MyTimePicker() {
	const [time, setTime] = useState<Dayjs | null>(dayjs(dayjs()));

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedTime = dayjs(event.target.value, 'HH:mm');

		const roundedTime = roundToNearest(selectedTime, 30); // или roundToNearest(selectedTime, 60) для целых часов

		setTime(roundedTime);
	};

	function roundToNearest(time: Dayjs, minutes: number): Dayjs {
		const roundedMinutes = Math.round(time.minute() / minutes) * minutes;
		return time.set('minute', roundedMinutes);
	}

	return (
		<TextField
			label="Время"
			type="time"
			name="start_time_reservation"
			value={time ? time.format('HH:mm') : ''}
			onChange={handleTimeChange}
			InputLabelProps={{
				shrink: true,
			}}
			inputMode="text"
			inputProps={{
				step: 1800,
				type: 'time',
			}}
			sx={{
				backgroundColor: '#FCF8EA',
				maxWidth: 156,
				'.MuiInputBase-input': {
					width: 151,
					padding: 2.1,
					paddingRight: 2,
				},
				'.MuiInputBase-root': {
					maxWidth: 130,
					minHeight: 41,
				},
			}}
		/>
	);
}

export default MyTimePicker;
