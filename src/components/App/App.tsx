import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
import SearchResults from '../SearchResults/SearchResults';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
	return (
		<div className="App">
			<Header />
			<SearchResults />
			<Recomended nearest={false} link="Все" title="Рекомендации" />
			<Recomended nearest link="На карте" title="Ближайшие" />
			<Footer />
		</div>
	);
}

export default App;
