import { ReactNode } from 'react';
import './SearchForm.css';
function SearchForm({
	children,
	onSubmit,
	booking,
	isSearching,
	restPage,
}: {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	booking?: boolean;
	restPage?: boolean;
	isSearching?: boolean;
}) {
	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();

		onSubmit(evt);
	}
	return (
		<form
			onSubmit={handleSubmit}
			style={{ padding: `${isSearching && 0}` }}
			className={`search-form ${booking && 'search-form_booking'} ${
				restPage && 'search-form_rest-page'
			}`}
		>
			{children}
		</form>
	);
}

export default SearchForm;
