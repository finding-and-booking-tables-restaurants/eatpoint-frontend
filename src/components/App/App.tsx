import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
import SearchResults from '../SearchResults/SearchResults';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
	DUPLICATE_EMAIL_PHONE_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
	AUTH_ERROR_MESSAGE,
	INVALID_AUTH_DATA_ERROR_MESSAGE,
	UPDATE_USER_INFO_MESSAGE,
	UPDATE_USER_INFO_ERROR_MESSAGE,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	API_URL,
	UserData,
} from '../../utils/constants';
import { Restaurant } from '../../utils/constants';
import RegisterFormUser from '../RegisterFormUser/RegisterFormUser';
import LoginForm from '../LoginForm/LoginForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import BusinessProfile from '../BusinessProfile/BusinessProfile';
import Profile from '../Profile/Profile';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import UserBookings from '../UserBookings/UserBookings';
import BusinessLanding from '../BusinessLanding/BusinessLanding';
import ProtectedClientRouteElement from '../ProptectedClientRoute/ProtectedClientRoute';
import SendProblem from '../SendProblem/SendProblem';
import Help from '../Help/Help';
import ResetPassword from '../ResetPassword/ResetPassword';
import ProptectedBusinessRouteElement from '../ProptectedBusinessRoute/ProptectedBusinessRoute';
import { mainApi } from '../../utils/mainApi';
import RestaurantReviews from '../RestaurantReviews/RestaurantReviews';
import EditRestaurant from '../EditRestaurant/EditRestaurant';
import RestaurantReservationPage from '../RestaurantReservationPage/RestaurantReservationPage';
import Preloader from '../Preloader/Preloader';

function App() {
	const [currentUser, setCurrentUser] = useState<UserData>();
	const [currentRole, setCurrentRole] = useState('');
	const [authErrorMessage, setAuthErrorMessage] = useState('');
	const [regErrorMessage, setRegErrorMessage] = useState('');
	const [isSuccessRegister, setIsSuccessRegister] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [allEstablishments, setAllEstablishments] = useState<Restaurant[]>([]);
	const [updateUserInfo, setUpdateUserInfo] = useState({
		message: '',
		isSuccess: true,
	});
	const [searchEstablishments, setSearchEstablishments] = useState<
		Restaurant[]
	>([]);
	const [query, setQuery] = useState('');

	const [isDataLoading, setIsDataLoading] = useState(true);

	const navigate = useNavigate();
	const location = useLocation();

	const [isSearching, setIsSearching] = useState(false);

	const queryParams = new URLSearchParams(location.search);
	const queryHeader = queryParams.get('q');

	useEffect(() => {
		const accessToken = localStorage.getItem('access-token');
		const refreshToken = localStorage.getItem('refresh-token');
		if (!accessToken) {
			setIsDataLoading(false);
		}
		if (accessToken) {
			usersApi
				.getUserInfo()
				.then((data) => {
					setIsLoggedIn(true);
					setCurrentUser(data);
					setCurrentRole(data.role);
				})
				.catch(() => {
					if (refreshToken) {
						return usersApi
							.refreshToken(refreshToken)
							.then((res) => {
								if (!res) return null;
								localStorage.setItem('access-token', res.access);
								return usersApi.getUserInfo().then((data) => {
									setIsLoggedIn(true);
									setCurrentUser(data);
									setCurrentRole(data.role);
								});
							})
							.catch((err) => {
								console.log(err);
								return null;
							});
					}
					return null;
				})
				.finally(() => {
					setIsDataLoading(false);
				});
		}

		if (queryHeader) {
			handleSearchEstablishments();
			queryParams.delete('q');
			navigate('/', { replace: true });
		}

		mainApi
			.getEstablishments(50)
			.then((data) => {
				if (!data) return;
				setAllEstablishments(data.results.reverse());
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [location.pathname, navigate, queryHeader]);

	const resetMessages = () => {
		setUpdateUserInfo({ message: '', isSuccess: true });
	};

	// Логин
	const handleLogin = (data: ILoginFormData, rememberMe: boolean) => {
		usersApi
			.authorize(data)
			.then((res) => {
				if (res.access) {
					localStorage.setItem('access-token', res.access);
					if (rememberMe) {
						localStorage.setItem('refresh-token', res.refresh);
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
				setRegErrorMessage('');
				setIsSuccessRegister(true);
			})
			.catch((err) => {
				setIsSuccessRegister(false);
				if (err === ERROR_400) {
					setRegErrorMessage(EMAIL_ALREADY_REGISTERED_MESSAGE);
				} else if (err === ERROR_409) {
					setRegErrorMessage(INCORRECT_ADD_USER_DATA);
				} else {
					setRegErrorMessage(REG_ERROR_MESSAGE);
				}
			})
			.finally(() => {
				setTimeout(() => {
					setRegErrorMessage('');
					setIsSuccessRegister(false);
				}, 3000);
			});
	};

	// Обновление профиля
	const handleUpdateUserInfo = (userInfo: IUserFormData) => {
		usersApi
			.updateUserInfo(userInfo)
			.then((user) => {
				setCurrentUser(user);
				setUpdateUserInfo({
					message: UPDATE_USER_INFO_MESSAGE,
					isSuccess: true,
				});
			})
			.catch((error) => {
				if (error === ERROR_409) {
					setUpdateUserInfo({
						message: DUPLICATE_EMAIL_PHONE_MESSAGE,
						isSuccess: false,
					});
				} else {
					setUpdateUserInfo({
						message: UPDATE_USER_INFO_ERROR_MESSAGE,
						isSuccess: false,
					});
				}
				console.log(`${ERROR}: ${error}`);
			});
	};

	function handleSearchEstablishments() {
		const city = localStorage.getItem('city');
		if (!query && !queryHeader) return;
		if (!city) return;

		setIsSearching(true);
		mainApi
			.getEstablishmentsBySearchQuery(query || queryHeader!, 50, city)
			.then((data) => {
				setSearchEstablishments(data.results);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}

	const handleLogOut = () => {
		localStorage.clear();
		setIsLoggedIn(false);
		setCurrentRole('');
		setCurrentUser({});
		setIsSearching(false);
		navigate('/');
	};

	return (
		<div className="App">
			<CurrentUserContext.Provider
				value={{ currentUser, isLoggedIn, currentRole, handleLogOut }}
			>
				<Routes>
					{isDataLoading ? (
						<Route path="*" element={<Preloader />} />
					) : (
						<Route path="*" element={<NotFoundPage />} />
					)}
					<Route
						path="/"
						element={
							<>
								<Header />
								<SearchResults
									searchEstablishments={searchEstablishments}
									setAllEstablishments={setSearchEstablishments}
									onSubmit={handleSearchEstablishments}
									query={query || queryHeader!}
									setQuery={setQuery}
									isSearching={isSearching}
								/>
								{!isSearching && (
									<>
										<Recomended
											establishments={allEstablishments}
											nearest={false}
											link=""
											title="Рекомендации"
										/>
									</>
								)}
								<Footer />
							</>
						}
					/>
					{allEstablishments.length ? (
						allEstablishments.map((item: Restaurant) => (
							<Route
								key={item.id}
								path={`/establishment/${item.id}`}
								element={<RestaurantPage id={item.id} />}
							/>
						))
					) : (
						<Route path="/establishment/:id" element={<Preloader />} />
					)}
					{allEstablishments.length ? (
						allEstablishments.map((item: Restaurant) => (
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
						))
					) : (
						<Route path="/booking/:id" element={<Preloader />} />
					)}

					<Route
						path="/user-signup"
						element={
							<RegisterFormUser
								role="client"
								requestErrorMessage={regErrorMessage}
								onRegistration={handleRegistration}
								isSuccessRegister={isSuccessRegister}
							/>
						}
					/>
					<Route
						path="/business-signup"
						element={
							<RegisterFormUser
								role="restorateur"
								requestErrorMessage={regErrorMessage}
								onRegistration={handleRegistration}
								isSuccessRegister={isSuccessRegister}
							/>
						}
					/>
					{isDataLoading ? (
						<Route path="/user-profile" element={<Preloader />} />
					) : (
						<Route
							path="/user-profile"
							element={
								<ProtectedClientRouteElement
									isLoggedIn={isLoggedIn}
									element={
										<Profile
											onUpdateUserInfo={handleUpdateUserInfo}
											requestStatus={updateUserInfo}
											resetRequestMessage={resetMessages}
										/>
									}
								/>
							}
						/>
					)}

					{isDataLoading ? (
						<Route path="/restaurant-reviews/:id" element={<Preloader />} />
					) : (
						allEstablishments.map((item: Restaurant) => (
							<Route
								key={item.id}
								path={`/restaurant-reviews/${item.id}`}
								element={
									<ProptectedBusinessRouteElement
										role={currentRole}
										isLoggedIn={isLoggedIn}
										element={<RestaurantReviews id={item.id} />}
									/>
								}
							/>
						))
					)}
					{isDataLoading ? (
						<Route path="/user-bookings" element={<Preloader />} />
					) : (
						<Route
							path="/user-bookings"
							element={
								<ProtectedClientRouteElement
									isLoggedIn={isLoggedIn}
									element={<UserBookings />}
								/>
							}
						/>
					)}
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
					{isDataLoading ? (
						<Route path="/business-profile" element={<Preloader />} />
					) : (
						<Route
							path="/business-profile"
							element={
								<ProptectedBusinessRouteElement
									role={currentRole}
									isLoggedIn={isLoggedIn}
									element={<BusinessProfile />}
								/>
							}
						/>
					)}
					{isDataLoading ? (
						<Route
							path="/business-profile/add-restaurant"
							element={<Preloader />}
						/>
					) : (
						<Route
							path="/business-profile/add-restaurant"
							element={
								<ProptectedBusinessRouteElement
									role={currentRole}
									isLoggedIn={isLoggedIn}
									element={<AddRestaurant />}
								/>
							}
						/>
					)}
					{isDataLoading ? (
						<Route
							path="/business-profile/edit-restaurant/:id"
							element={<Preloader />}
						/>
					) : (
						allEstablishments.map((item: Restaurant) => (
							<Route
								key={item.id}
								path={`/business-profile/edit-restaurant/${item.id}`}
								element={
									<ProptectedBusinessRouteElement
										role={currentRole}
										isLoggedIn={isLoggedIn}
										element={<EditRestaurant id={item.id} />}
									/>
								}
							/>
						))
					)}
					{isDataLoading ? (
						<Route
							path="/business-profile/reservation-restaurant/:id"
							element={<Preloader />}
						/>
					) : (
						<Route
							path="/business-profile/reservation-restaurant/:id"
							element={
								<ProptectedBusinessRouteElement
									role={currentRole}
									isLoggedIn={isLoggedIn}
									element={<RestaurantReservationPage />}
								/>
							}
						/>
					)}
					<Route path="/support" element={<SendProblem />} />
					<Route path="/help" element={<Help />} />
					<Route path="/resetpass" element={<ResetPassword />} />
				</Routes>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
