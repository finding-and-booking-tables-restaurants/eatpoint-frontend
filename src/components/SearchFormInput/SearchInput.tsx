import './SearchInput.css';

function SearchInput() {
	return (
		<div className="search-input">
			<input
				className="search-input__input"
				placeholder="Адрес, кухня, название"
			/>
			<button className="search-input__btn" />
		</div>
	);
}

export default SearchInput;
