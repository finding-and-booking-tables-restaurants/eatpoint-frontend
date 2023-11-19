import { InputAdornment, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
	query: string;
	setQuery: (query: string) => void;
	isSearching: boolean;
}

function SearchInput({ query, setQuery, isSearching }: SearchInputProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<TextField
			// label="Поиск"
			placeholder="Адрес, кухня, название"
			type="search"
			sx={{
				maxWidth: {
					xs: '100%',
					sm: `${isSearching ? '688px' : '450px'}`,
					md: '665px',
					lg: `${isSearching ? '1050px' : '665px'}`,
				},
				minWidth: {
					xs: '100%',
					sm: `${isSearching ? '550px' : '450px'}`,
					md: '665px',
					lg: `${isSearching ? '1050px' : '665px'}`,
				},
				backgroundColor: 'white',
				borderRadius: '8px',
				'& .MuiInputBase-root': {
					borderRadius: '8px',
				},
			}}
			autoComplete="off"
			value={query}
			onChange={handleInputChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	);
}

export default SearchInput;
