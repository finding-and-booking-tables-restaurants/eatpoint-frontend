import './SearchInput.css';
import { MouseEvent, ChangeEvent } from 'react';
interface SearchInputProps {
	handleFilterClick: (evt: MouseEvent<HTMLButtonElement>) => void;
	query: string;
	setQuery: (query: string) => void;
}

function SearchInput({ handleFilterClick, query, setQuery }: SearchInputProps) {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	return (
		<div className="search-input">
			<input
				className="search-input__input"
				placeholder="По названию, типу заведения"
				maxLength={25}
				value={query}
				onChange={handleInputChange}
			/>

			<button
				className="search-input__filter-btn"
				onClick={(evt: MouseEvent<HTMLButtonElement>) => handleFilterClick(evt)}
			/>
		</div>
	);
}

export default SearchInput;
