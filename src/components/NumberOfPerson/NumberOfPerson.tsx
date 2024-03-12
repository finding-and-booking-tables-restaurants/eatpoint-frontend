import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { FC, useEffect } from 'react';

export const selectTheme = (theme: any) =>
	createTheme({
		...theme,
		components: {
			MuiList: {
				styleOverrides: {
					root: {
						maxHeight: '336px',
					},
				},
			},
		},
	});

	interface SelectTextFieldsProps {
		numOfPeople: string[];
	}

const SelectTextFields: FC<SelectTextFieldsProps> = ({numOfPeople}) => {
	// const numberOfPeople = localStorage.getItem('selected-number-of-people');

	const handleSelectPeople = (event: React.ChangeEvent<HTMLInputElement>) => {
		localStorage.setItem('selected-number-of-people', event.target.value);
	};

	// useEffect(() => {
	// 	if (numberOfPeople) return;
	// 	localStorage.setItem('selected-number-of-people', '2');
	// }, []);

	return (
		<ThemeProvider theme={selectTheme}>
			<TextField
				id="outlined-select-currency"
				select
				name="number_guests"
				onChange={handleSelectPeople}
				defaultValue=""
				sx={{
					width: 328,
					margin: 'auto',
					borderRadius: '8px',
					backgroundColor: 'white',
					justifySelf: 'start',
				}}
			>
				{numOfPeople?.map((option, i) => (
					<MenuItem key={i} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField>
		</ThemeProvider>
	);
}

export default SelectTextFields;