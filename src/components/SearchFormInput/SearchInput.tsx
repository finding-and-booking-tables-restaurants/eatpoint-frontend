import { InputAdornment, TextField } from '@mui/material';
import { MouseEvent, ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
	query: string;
	setQuery: (query: string) => void;
}

function SearchInput({ query, setQuery }: SearchInputProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	return (
		<TextField
			label="Поиск"
			placeholder="Адрес, кухня, название"
			type="search"
			sx={{ width: '100%' }}
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
