import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Recomended from '../Recomended/Recomended';

function App() {
	return (
		<div className="App">
			<Header />
			<Recomended nearest={false} link="Все" title="Рекомендации" />
			<Recomended nearest link="На карте" title="Ближайшие" />
			<Footer />
		</div>
	);
}

export default App;
