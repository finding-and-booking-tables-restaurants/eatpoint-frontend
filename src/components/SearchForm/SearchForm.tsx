import { ReactNode } from 'react';
import './SearchForm.css';
function SearchForm({ children }: { children: ReactNode }) {
	return <form className="search-form">{children}</form>;
}

export default SearchForm;
