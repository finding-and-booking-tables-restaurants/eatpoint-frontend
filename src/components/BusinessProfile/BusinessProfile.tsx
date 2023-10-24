import './BusinessProfile.css';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RestaurantItem from './RestaurantItem/RestaurantItem';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function BusinessProfile() {
	const userData = useContext(CurrentUserContext).currentUser;
	const navigate = useNavigate();

	const handleEditProfile = () => {
		navigate('/user-profile');
	};

	return (
		<>
			<Header />
			<section className="business-profile">
				<div className="business-profile__box-profile">
					<div className="business-profile__box-info">
						<p className="business-profile__user-name">
							{userData.first_name + ' ' + userData.last_name}
						</p>
						<p className="business-profile__user-id">ID 12345678</p>
						<div className="business-profile__box-info_contacts">
							<p className="business-profile__user-email">{userData.email}</p>
							<p className="business-profile__user-phone">
								{userData.telephone}
							</p>
						</div>
					</div>
					<button
						onClick={handleEditProfile}
						className="business-profile__user-editBtn"
					></button>
				</div>

				<Link
					to="/add-restaurant"
					className="business-profile__add-restaurantBtn"
				>
					Добавить ресторан
				</Link>
				<h2 className="business-profile__list-title">Мои рестораны</h2>
				<ul className="business-profile__list">
					<RestaurantItem />
				</ul>
			</section>

			<Footer />
		</>
	);
}

export default BusinessProfile;
