import { ReactNode } from 'react';
import './SearchForm.css';
import { Box } from '@mui/material';
function SearchForm({
	children,
	onSubmit,
	isSearching,
}: {
	children?: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	isSearching?: boolean;
}) {
	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();

		onSubmit(evt);
	}
	return (
		<Box
			sx={{
				flexDirection: { xs: 'colum', sm: `${isSearching ? 'column' : 'row'}` },
				backgroundColor: { xs: 'white', sm: 'transparent' },
				justifyContent: 'center',
			}}
			component={'form'}
			onSubmit={handleSubmit}
			style={{ padding: `${isSearching && 0}` }}
			className="search-form"
		>
			{children}
		</Box>
	);
}

export default SearchForm;
