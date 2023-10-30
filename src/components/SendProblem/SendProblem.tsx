import './SendProblem.css';
import { useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function SendProblem() {
	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;
	const userData = useContext(CurrentUserContext).currentUser;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		//  Переиспользована ф-ция из RestarauntPage(нужно её вынести в utils)
		event.preventDefault(); //
		const formData = new FormData(event.currentTarget);

		const formDataObject: { [key: string]: any } = {};
		formData.forEach((value, key) => {
			formDataObject[key] = value;
			if (!formDataObject.email && userData.email)
				formDataObject.email = userData.email;
			console.log(formDataObject);
		});
	};

	return (
		<>
			<Header />
			<main className="problem-page">
				<h1 className="problem-page__title">Сообщить о проблеме</h1>
				<p
					className={`problem-page__text  ${
						isLoggedIn && 'problem-page__text_type_logged'
					}`}
				>
					{isLoggedIn
						? `Ответ на ваше обращение будет отправлен на электронную почту при регистрации - ${
								userData && userData.email
						  }.`
						: 'Ответ на ваше обращение будет отправлен на указанную электронную почту.'}
				</p>
				<form className="problem-page__form" onSubmit={handleSubmit}>
					{!isLoggedIn && (
						<input
							name="email"
							className="problem-page__input"
							placeholder="Эл. почта"
						/>
					)}
					<textarea
						name="text-problem"
						className="problem-page__textarea"
					></textarea>
				</form>
			</main>
			<Footer />
		</>
	);
}
