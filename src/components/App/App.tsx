import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
import SearchResults from '../SearchResults/SearchResults';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import RestaurantPage from '../RestaurantPage/RestaurantPage';
import BookingPage from '../BookingPage/BookingPage';
import {
	ILoginFormData,
	IRegisterFormData,
	IUserFormData,
} from '../../types/commonTypes';
import usersApi from '../../utils/UsersApi';
import {
	ERROR,
	ERROR_400,
	ERROR_401,
	ERROR_409,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
	AUTH_ERROR_MESSAGE,
	INVALID_AUTH_DATA_ERROR_MESSAGE,
	API_URL,
	UserData,
} from '../../utils/constants';
import { Restaurant } from '../../utils/constants';
import RegisterFormUser from '../RegisterFormUser/RegisterFormUser';
import LoginForm from '../LoginForm/LoginForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import BusinessProfile from '../BusinessProfile/BusinessProfile';
import TEST from '../TEST/TEST';
import Profile from '../Profile/Profile';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import UserBookings from '../UserBookings/UserBookings';
import BusinessLanding from '../BusinessLanding/BusinessLanding';

function App() {
	const [currentUser, setCurrentUser] = useState<UserData>();
	const [currentRole, setCurrentRole] = useState('');
	const [authErrorMessage, setAuthErrorMessage] = useState('');
	const [regErrorMessage, setRegErrorMessage] = useState('');
	const [isSuccessUpdateUser, setIsSuccessUpdateUser] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSuccessRegister, setIsSuccessRegister] = useState(false);
	const [allEstablishments, setAllEstablishments] = useState<Restaurant[]>([]);
	const [searchEstablishments, setSearchEstablishments] = useState<
		Restaurant[]
	>([]);
	const [query, setQuery] = useState('');

	const navigate = useNavigate();

	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('access-token');
		if (token) {
			usersApi
				.getUserInfo()
				.then(() => {
					setIsLoggedIn(true);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			usersApi
				.getUserInfo()
				.then((data) => {
					setCurrentUser(data);
					setCurrentRole(data.role);
				})
				.catch((err) => console.log(err));
		}
	}, [isLoggedIn]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/v1/establishments/?page_size=50`
				);
				const data = await response.json();
				setAllEstablishments(data.results.reverse());
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	// Логин
	const handleLogin = (data: ILoginFormData, rememberMe: boolean) => {
		usersApi
			.authorize(data)
			.then((res) => {
				if (res.access) {
					if (rememberMe) {
						localStorage.setItem('access-token', res.access);
						localStorage.setItem('refresh-token', res.refresh);
						console.log('Токен сохранен');
					}
				}
				setIsLoggedIn(true);
				setAuthErrorMessage('');
				navigate('/', { replace: true });
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
			.then(() => {
				setIsSuccessRegister(true);
				setRegErrorMessage('');
			})
			.catch((err) => {
				if (err === ERROR_409) {
					setRegErrorMessage(EMAIL_ALREADY_REGISTERED_MESSAGE);
				} else if (err === ERROR_400) {
					setRegErrorMessage(INCORRECT_ADD_USER_DATA);
				} else {
					setRegErrorMessage(REG_ERROR_MESSAGE);
				}
			});
	};

	// Обновление профиля
	const handleUpdateUserInfo = (userInfo: IUserFormData) => {
		usersApi
			.updateUserInfo(userInfo)
			.then((user) => {
				setCurrentUser(user);
				setIsSuccessUpdateUser(true);
			})
			.catch((error) => {
				if (error === ERROR_409) {
					setIsSuccessUpdateUser(false);
				} else {
					setIsSuccessUpdateUser(false);
				}
				console.log(`${ERROR}: ${error}`);
			});
	};

	function handleSearchEstablishments() {
		setIsSearching(true);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${API_URL}/api/v1/establishments/?page_size=50&search=${query}`
				);
				const data = await response.json();

				setSearchEstablishments(data.results);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}

	const handleRestart = (value: boolean) => {
		setIsSearching(!value);
	};

	useEffect(() => {
		const token = localStorage.getItem('jwt');
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogOut = () => {
		localStorage.clear();
		setIsLoggedIn(false);
		setCurrentRole('');
		setCurrentUser({});
		navigate('/');
	};

	return (
		<div className="App">
			<CurrentUserContext.Provider
				value={{ currentUser, isLoggedIn, currentRole, handleLogOut }}
			>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Header handleRestart={handleRestart} />
								<SearchResults
									searchEstablishments={searchEstablishments}
									setAllEstablishments={setSearchEstablishments}
									onSubmit={handleSearchEstablishments}
									query={query}
									setQuery={setQuery}
									isSearching={isSearching}
								/>
								{!isSearching && (
									<>
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
									</>
								)}
								<Footer />
							</>
						}
					/>
					{allEstablishments.map((item: Restaurant) => (
						<Route
							key={item.id}
							path={`/establishment/${item.id}`}
							element={<RestaurantPage id={item.id} />}
						/>
					))}
					{allEstablishments.map((item: Restaurant) => (
						<Route
							key={item.id}
							path={`/booking/${item.id}`}
							element={
								<>
									<Header />
									<BookingPage userData={currentUser} id={item.id} />
									<Footer />
								</>
							}
						/>
					))}

					<Route
						path="/user-signup"
						element={
							<RegisterFormUser
								role="client"
								requestErrorMessage={regErrorMessage}
								isSuccessRegister={isSuccessRegister}
								onRegistration={handleRegistration}
							/>
						}
					/>
					<Route
						path="/business-signup"
						element={
							<RegisterFormUser
								role="restorateur"
								requestErrorMessage={regErrorMessage}
								isSuccessRegister={isSuccessRegister}
								onRegistration={handleRegistration}
							/>
						}
					/>
					<Route
						path="/user-profile"
						element={
							isLoggedIn ? (
								<Profile
									onUpdateUserInfo={handleUpdateUserInfo}
									isSuccessUpdateUser={isSuccessUpdateUser}
									setIsSuccessUpdateUser={setIsSuccessUpdateUser}
								/>
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route
						path="/user-bookings"
						element={isLoggedIn ? <UserBookings /> : <Navigate to="/" />}
					/>
					<Route
						path="/signin"
						element={
							<LoginForm
								requestErrorMessage={authErrorMessage}
								onLogin={handleLogin}
							/>
						}
					/>
					<Route path="/business" element={<BusinessLanding />} />
					<Route path="/business-profile" element={<BusinessProfile />} />
					<Route path="/add-restaurant" element={<AddRestaurant />}></Route>
					<Route path="/test" element={<TEST></TEST>}></Route>
					<Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
				</Routes>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
