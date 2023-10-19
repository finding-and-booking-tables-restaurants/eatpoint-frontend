import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Recomended from '../Recomended/Recomended';
import SearchResults from '../SearchResults/SearchResults';
// import RegisterFormUser from '../RegisterFormUser/RegisterFormUser';
import usersApi from '../../utils/UsersApi';
import { IRegisterFormData } from '../../types/commonTypes';
import {
	ERROR_400,
	ERROR_409,
	EMAIL_ALREADY_REGISTERED_MESSAGE,
	INCORRECT_ADD_USER_DATA,
	REG_ERROR_MESSAGE,
} from '../../utils/constants';

const App: React.FC = () => {
	const [regErrorMessage, setRegErrorMessage] = useState('');

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
			<Header />
			{/* <RegisterFormUser
				onRegistration={handleRegistration}
				requestErrorMessage={regErrorMessage}
			/> */}
			<SearchResults />
			<Recomended nearest={false} link="Все" title="Рекомендации" />
			<Recomended nearest link="На карте" title="Ближайшие" />
			<Footer />
		</div>
	);
};

export default App;
