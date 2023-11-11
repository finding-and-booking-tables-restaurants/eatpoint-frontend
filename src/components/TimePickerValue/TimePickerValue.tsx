import { useState, ChangeEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { timesForTimePicker as times } from '../../utils/constants';
import { MenuItem } from '@mui/material';
import Clocks from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';

function MyTimePicker() {
	const selectedTime = localStorage.getItem('selected-time');

	const [time, setTime] = useState<string>(
		selectedTime ? selectedTime : times[23]
	);

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const pickedTime = event.target.value;
		localStorage.setItem('selected-time', pickedTime);
		setTime(pickedTime);
	};

	useEffect(() => {
		if (selectedTime) return;
		localStorage.setItem('selected-time', times[23]);
	}, []);

	return (
		<TextField
			id="outlined-select-currency"
			select
			name="start_time_reservation"
			value={time}
			onChange={handleTimeChange}
			sx={{
				maxWidth: 328,
				minWidth: 160,
				borderRadius: '8px',
				backgroundColor: 'white',
			}}
			SelectProps={{
				IconComponent: () => null,
				startAdornment: (
					<Clocks
						style={{
							marginRight: '12px',
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
				<MenuItem sx={{ paddingLeft: '50px' }} key={idx} value={time}>
					{time}
				</MenuItem>
			))}
		</TextField>
	);
}

export default MyTimePicker;
