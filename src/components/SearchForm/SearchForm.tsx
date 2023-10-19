import { ReactNode } from 'react';
import './SearchForm.css';
function SearchForm({
	children,
	onSubmit,
}: {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();

		onSubmit(evt);
	}
	return (
		<form onSubmit={handleSubmit} className="search-form">
			{children}
		</form>
	);
}

export default SearchForm;
