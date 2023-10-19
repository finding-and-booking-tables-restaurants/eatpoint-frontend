import { ReactNode } from 'react';
import './SearchForm.css';
function SearchForm({
	children,
	onSubmit,
}: {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<form onSubmit={onSubmit} className="search-form">
			{children}
		</form>
	);
}

export default SearchForm;
