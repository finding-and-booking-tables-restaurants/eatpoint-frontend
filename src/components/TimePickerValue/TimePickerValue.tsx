import { useState, ChangeEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { timesForTimePicker as times } from '../../utils/constants';
import { MenuItem } from '@mui/material';
import Clocks from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';

function MyTimePicker({ availableTimes }: { availableTimes: string[] }) {
	const selectedTime = localStorage.getItem('selected-time') || '';

	const [time, setTime] = useState<string>('');

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const pickedTime = event.target.value;
		localStorage.setItem('selected-time', pickedTime);
		setTime(pickedTime);
	};

	const isSelectedTimeAvailable = (time: string) => {
		if (!time) return false;
		return availableTimes.some((t) => t === time);
	};

	// console.log('available', isSelectedTimeAvailable(selectedTime));

	useEffect(() => {
		if (availableTimes.length) {
			if (isSelectedTimeAvailable(selectedTime)) {
				setTime(selectedTime);
				return;
			}
			const firstTimeAvailable = availableTimes[0];
			localStorage.setItem('selected-time', firstTimeAvailable || times[23]);
			setTime(firstTimeAvailable || times[23]);
		}
	}, [availableTimes.length]);

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
			{availableTimes.map((time, idx) => (
				<MenuItem sx={{ paddingLeft: '50px' }} key={idx} value={time}>
					{time}
				</MenuItem>
			))}
		</TextField>
	);
}

export default MyTimePicker;
