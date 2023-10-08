import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const currencies = [
	{
		value: '2',
		label: '2 человек',
	},
	{
		value: '3',
		label: '3 человек',
	},
	{
		value: '4',
		label: '4 человек',
	},
	{
		value: '5',
		label: '5 человек',
	},
	{
		value: '6',
		label: '6 человек',
	},
	{
		value: '7',
		label: '7 человек',
	},
];

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
				label="Количество человек"
				defaultValue="2"
				sx={{
					backgroundColor: '#FCF8EA',
					maxWidth: 328,
				}}
			>
				{currencies.map((option) => (
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
