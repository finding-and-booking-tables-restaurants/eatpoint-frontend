import './SearchInput.css';
import { MouseEvent, ChangeEvent } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import Button from '@mui/material/Button';
interface SearchInputProps {
	handleFilterClick: (evt: MouseEvent<HTMLButtonElement>) => void;
	query: string;
	setQuery: (query: string) => void;
	isSearching: boolean;
}

function SearchInput({
	handleFilterClick,
	query,
	setQuery,
	isSearching,
}: SearchInputProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	return (
		<div className="search-input">
			<div className="search-input__box-field">
				<label className="search-input__label" htmlFor="searchInput">
					Поиск
				</label>
				<input
					className="search-input__input"
					id="searchInput"
					type="search"
					placeholder="Адрес, кухня, название"
					maxLength={25}
					autoComplete="off"
					value={query}
					onChange={handleInputChange}
					required
				/>
			</div>
			{/* {!isSearching ? (
				<Button
					sx={{
						padding: '0',
						minWidth: '0',
						color: '#49454F',
						position: 'absolute',
						width: '24px',
						height: '24px',
						right: '10px',
						top: '13px',
					}}
					type="submit"
				>
					<SearchIcon />
				</Button>
			) : (
				<button
					className="search-input__filter-btn"
					type="button"
					onClick={(evt: MouseEvent<HTMLButtonElement>) =>
						handleFilterClick(evt)
					}
				/>
			)} */}
		</div>
	);
}

export default SearchInput;
