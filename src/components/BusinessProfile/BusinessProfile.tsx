import './BusinessProfile.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RestaurantItem from './RestaurantItem/RestaurantItem';

function BusinessProfile() {
	return (
		<>
			<Header />
			<section className="business-profile">
				<div className="business-profile__box-profile">
					<div className="business-profile__box-info">
						<p className="business-profile__user-name">Валерий Валеронский</p>
						<p className="business-profile__user-id">ID 12345678</p>
						<div className="business-profile__box-info_contacts">
							<p className="business-profile__user-email">valera@email.com</p>
							<p className="business-profile__user-phone">+79171476666</p>
						</div>
					</div>
					<button className="business-profile__user-editBtn"></button>
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
