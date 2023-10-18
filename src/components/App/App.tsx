import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
// import SearchResults from '../SearchResults/SearchResults';
import { useEffect, useState } from 'react';
import { Restaurant } from '../../models/data/RestData';
import { Routes, Route } from 'react-router-dom';
import RestaurantPage from '../RestaurantPage/RestaurantPage';
import BookingPage from '../BookingPage/BookingPage';

function App() {
	const [allEstablishments, setAllEstablishments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'http://80.87.109.70/api/v1/establishments'
				);
				const data = await response.json();

				const updatedData = data.results.map((item: Restaurant) => {
					const updatedPoster = item.poster.replace(
						'backend:8000',
						'80.87.109.70'
					);
					return {
						...item,
						poster: updatedPoster,
					};
				});
				setAllEstablishments(updatedData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	console.log(allEstablishments);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Header />
							<Recomended
								establishments={allEstablishments}
								nearest={false}
								link="Все"
								title="Рекомендации"
							/>
							<Recomended
								establishments={allEstablishments}
								nearest
								link="На карте"
								title="Ближайшие"
							/>
							<Footer />
						</>
					}
				/>
				{allEstablishments.map((item: Restaurant) => (
					<Route
						key={item.id}
						path={`/establishment/${item.id}`}
						element={
							<>
								<Header />
								<RestaurantPage id={item.id} />
								<Footer />
							</>
						}
					/>
				))}
				{allEstablishments.map((item: Restaurant) => (
					<Route
						key={item.id}
						path={`/booking/${item.id}`}
						element={
							<>
								<BookingPage id={item.id} />
							</>
						}
					/>
				))}
			</Routes>
		</div>
	);
}

export default App;
