import './SelectWorkTime.css';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { timesForTimePicker } from '../../../utils/constants';

interface SelectWorkTimeProps {
	text: string;
	onTimeChange?: ((start: string, end: string) => void) | undefined;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 5;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 150,
		},
	},
};

function SelectWorkTime({ text, onTimeChange }: SelectWorkTimeProps) {
	const [timeStart, setTimeStart] = React.useState<string>(
		timesForTimePicker[0]
	);
	const [timeEnd, setTimeEnd] = React.useState<string>(timesForTimePicker[0]);

	const handleChangeTimeStart = (
		event: SelectChangeEvent<typeof timeStart>
	) => {
		const {
			target: { value },
		} = event;
		setTimeStart(value);

		if (onTimeChange) {
			onTimeChange(value, timeEnd);
		}
	};

	const handleChangeTimeEnd = (event: SelectChangeEvent<typeof timeEnd>) => {
		const {
			target: { value },
		} = event;
		setTimeEnd(value);

		if (onTimeChange) {
			onTimeChange(timeStart, value);
		}
	};

	return (
		<div className="select-work-time">
			<p className="select-work-time__day">{text}</p>
			<FormControl sx={{ m: 1, width: 116 }}>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					value={timeStart}
					onChange={handleChangeTimeStart}
					inputProps={{ 'aria-label': 'Without label' }}
					MenuProps={MenuProps}
					sx={{ backgroundColor: '#FDFAF2' }}
				>
					{timesForTimePicker.map((time, i) => (
						<MenuItem key={i} value={time} sx={{ backgroundColor: '#FDFAF2' }}>
							{time}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, width: 116 }}>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					value={timeEnd}
					onChange={handleChangeTimeEnd}
					inputProps={{ 'aria-label': 'Without label' }}
					MenuProps={MenuProps}
					sx={{ backgroundColor: '#FDFAF2' }}
				>
					{timesForTimePicker.map((time, i) => (
						<MenuItem key={i} value={time} sx={{ backgroundColor: '#FDFAF2' }}>
							{time}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default SelectWorkTime;
