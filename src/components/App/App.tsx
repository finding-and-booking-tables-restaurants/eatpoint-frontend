import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SearchResults from '../SearchResults/SearchResults';
import PageNotFound from '../NotFoundPage/NotFoundPage';
import AddRestaurant from '../AddRestaurant/AddRestaurant';

function App() {
	return (
		<div className="App">
			<AddRestaurant />
			{/* <SearchResults /> */}
			{/* <Routes>
				<Route path="/" element={<Main />} />
				<Route path="/search" element={<SearchResults />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes> */}
		</div>
	);
}

export default App;
