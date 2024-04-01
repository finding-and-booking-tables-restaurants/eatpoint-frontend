/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ChangeEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { timesForTimePicker as times } from '../../utils/constants';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Clocks from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';

interface IMyTimePickerProps {
	availableTimes: string[];
	setTimeValue: (time: string[]) => void;  
  }

function MyTimePicker({ availableTimes, setTimeValue }: IMyTimePickerProps) {


	// const selectedTime = JSON.parse(localStorage.getItem('selected-time'));

	const [time, setTime] = useState<string[]>([]);

	const handleTimeChange = (event: SelectChangeEvent<typeof time>) => {
		const {
			target: { value },
		  } = event;
		  const firstAvailableTime = Array.from(availableTimes[0]);
		localStorage.setItem('selected-time', JSON.stringify(firstAvailableTime || []));
		setTime(typeof value === 'string' ? value.split(',') : value);
		setTimeValue(typeof value === 'string' ? value.split(',') : value)
	};

	const isSelectedTimeAvailable = (time: string) => {
		if (!time) return false;
		return availableTimes.some((t) => t === time);
	};

	useEffect(() => {
		if (availableTimes.length) {
			// if (isSelectedTimeAvailable(selectedTime)) {
			// 	setTime(selectedTime);
			// 	setTimeValue(selectedTime)
			// 	return;
			// }
			// const firstTimeAvailable = Array.from(availableTimes[0]);
			// localStorage.setItem('selected-time', JSON.stringify(firstTimeAvailable || []));
			// setTime(firstTimeAvailable);
			// setTimeValue(firstTimeAvailable)
		}
	}, [availableTimes.length]);

	return (
		<Select
			id="outlined-select-currency"
			name="start_time_reservation"
			value={time}
			multiple
			onChange={handleTimeChange}
			sx={{
				maxWidth: 328,
				minWidth: 160,
				borderRadius: '8px',
				backgroundColor: 'white',
			}}
			inputProps={{
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
		</Select>
	);
}

export default MyTimePicker;
