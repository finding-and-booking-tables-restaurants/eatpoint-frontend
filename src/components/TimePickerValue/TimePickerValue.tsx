import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { timesForTimePicker as times } from '../../utils/constants';
import { MenuItem } from '@mui/material';
import Clocks from '@mui/icons-material/AccessTime';

function MyTimePicker() {
	const [time, setTime] = useState<string>(times[23]);

	const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedTime = event.target.value;

		setTime(selectedTime);
	};

	return (
		<TextField
			id="outlined-select-currency"
			select
			name="start_time_reservation"
			label="Время"
			value={time}
			onChange={handleTimeChange}
			sx={{
				backgroundColor: '#FCF8EA',
				maxWidth: 328,
				minWidth: 151,
				ml: 'auto',
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
