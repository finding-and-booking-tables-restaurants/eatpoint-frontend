import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
// import SearchResults from '../SearchResults/SearchResults';
import { useEffect, useState } from 'react';
import { Restaurant } from '../../models/data/RestData';
import { Routes, Route } from 'react-router-dom';
import RestaurantPage from '../RestaurantPage/RestaurantPage';
import BookingPage from '../BookingPage/BookingPage';
// import RegisterFormUser from '../RegisterFormUser/RegisterFormUser';
// import LoginForm from '../LoginForm/LoginForm';
import { ILoginFormData, IRegisterFormData } from '../../types/commonTypes';
import usersApi from '../../utils/UsersApi';
import {
	ERROR_400,
	ERROR_401,
	ERROR_409,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
	AUTH_ERROR_MESSAGE,
	INVALID_AUTH_DATA_ERROR_MESSAGE,
} from '../../utils/constants';

function App() {
	const [allEstablishments, setAllEstablishments] = useState([]);
	const [authErrorMessage, setAuthErrorMessage] = useState('');
	const [regErrorMessage, setRegErrorMessage] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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

	// Логин
	const handleLogin = (data: ILoginFormData) => {
		usersApi
			.authorize(data)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('jwt', res.token);
				}
				setIsLoggedIn(true);
			})
			.catch((err) => {
				if (err === ERROR_401) {
					setAuthErrorMessage(INVALID_AUTH_DATA_ERROR_MESSAGE);
				} else {
					setAuthErrorMessage(AUTH_ERROR_MESSAGE);
				}
			});
	};

	// Регистрация
	const handleRegistration: (data: IRegisterFormData) => void = ({
		telephone,
		email,
		firstName,
		lastName,
		role,
		password,
		confirmPassword,
		is_agreement,
		confirm_code_send_method,
	}) => {
		usersApi
			.registerUser({
				telephone,
				email,
				firstName,
				lastName,
				password,
				confirmPassword,
				role,
				is_agreement,
				confirm_code_send_method,
			})
			.then(() => {})
			.catch((err) => {
				console.log('register-error:', err);
				if (err === ERROR_409) {
					setRegErrorMessage(EMAIL_ALREADY_REGISTERED_MESSAGE);
				} else if (err === ERROR_400) {
					setRegErrorMessage(INCORRECT_ADD_USER_DATA);
				} else {
					setRegErrorMessage(REG_ERROR_MESSAGE);
				}
			});
	};

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
