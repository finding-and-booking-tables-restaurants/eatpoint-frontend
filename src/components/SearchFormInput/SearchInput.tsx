import './SearchInput.css';
import { MouseEvent, ChangeEvent } from 'react';
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
			<input
				className="search-input__input"
				placeholder="По названию, типу заведения"
				maxLength={25}
				value={query}
				onChange={handleInputChange}
				required
			/>
			{isSearching && (
				<button
					className="search-input__filter-btn"
					type="button"
					onClick={(evt: MouseEvent<HTMLButtonElement>) =>
						handleFilterClick(evt)
					}
				/>
			)}
		</div>
	);
}

export default SearchInput;
