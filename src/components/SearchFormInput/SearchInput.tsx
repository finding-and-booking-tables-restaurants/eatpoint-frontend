import './SearchInput.css';
import { MouseEvent } from 'react';
interface SearchInputProps {
	handleFilterClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function SearchInput({ handleFilterClick }: SearchInputProps) {
	return (
		<div className="search-input">
			<input
				className="search-input__input"
				placeholder="По названию, типу заведения"
				maxLength={25}
			/>
			{/* <button className="search-input__find-btn" /> */}
			<button
				className="search-input__filter-btn"
				onClick={(evt: MouseEvent<HTMLButtonElement>) => handleFilterClick(evt)}
			/>
		</div>
	);
}

export default SearchInput;
