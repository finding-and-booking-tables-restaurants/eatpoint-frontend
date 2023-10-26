import { ReactNode } from 'react';
import './SearchForm.css';
function SearchForm({
	children,
	onSubmit,
	booking,
}: {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	booking?: boolean;
}) {
	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();

		onSubmit(evt);
	}
	return (
		<form
			onSubmit={handleSubmit}
			className={`search-form ${booking && 'search-form_booking'}`}
		>
			{children}
		</form>
	);
}

export default SearchForm;
