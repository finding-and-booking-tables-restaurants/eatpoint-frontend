import './SelectTime.css';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { times } from '../../../utils/constants';

interface SelectWorkTimeProps {
	text: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function SelectWorkTime({ text }: SelectWorkTimeProps) {
	const [timeStart, setTimeStart] = React.useState<string[]>([]);
	const [timeEnd, setTimeEnd] = React.useState<string[]>([]);

	const handleChangeTimeStart = (
		event: SelectChangeEvent<typeof timeStart>
	) => {
		const {
			target: { value },
		} = event;
		setTimeStart(typeof value === 'string' ? value.split(',') : value);
	};

	const handleChangeTimeEnd = (event: SelectChangeEvent<typeof timeEnd>) => {
		const {
			target: { value },
		} = event;
		setTimeEnd(typeof value === 'string' ? value.split(',') : value);
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
					{times.map((time) => (
						<MenuItem
							key={time}
							value={time}
							sx={{ backgroundColor: '#FDFAF2' }}
						>
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
					{times.map((time) => (
						<MenuItem
							key={time}
							value={time}
							sx={{ backgroundColor: '#FDFAF2' }}
						>
							{time}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}

export default SelectWorkTime;
