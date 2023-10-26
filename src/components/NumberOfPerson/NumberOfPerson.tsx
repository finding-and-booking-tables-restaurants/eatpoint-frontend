import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { numOfPeople } from '../../utils/constants';

const newTheme = (theme: any) =>
	createTheme({
		...theme,
		components: {
			MuiList: {
				styleOverrides: {
					root: {
						padding: 0,
					},
				},
			},
		},
	});

export default function SelectTextFields() {
	return (
		<ThemeProvider theme={newTheme}>
			<TextField
				id="outlined-select-currency"
				select
				defaultValue="2"
				sx={{
					backgroundColor: '#FCF8EA',
					width: 328,
					margin: 'auto',
					borderRadius: '8px',
				}}
			>
				{numOfPeople.map((option) => (
					<MenuItem
						key={option.value}
						value={option.value}
						sx={{
							backgroundColor: '#FCF8EA',
						}}
					>
						{option.label}
					</MenuItem>
				))}
			</TextField>
		</ThemeProvider>
	);
}
