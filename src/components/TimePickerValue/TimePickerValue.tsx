import React, { useState, ChangeEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';

function MyTimePicker() {
	const [time, setTime] = useState<Dayjs | null>(dayjs(dayjs()));

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newTime = dayjs(event.target.value, 'HH:mm');
		setTime(newTime);
	};

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
			inputProps={{
				step: 300,
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
