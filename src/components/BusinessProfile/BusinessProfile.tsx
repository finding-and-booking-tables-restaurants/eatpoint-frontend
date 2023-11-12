import './BusinessProfile.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RestaurantItem from './RestaurantItem/RestaurantItem';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/mainApi';
import { Establishment } from '../../types/getMyRestaurantTypes';

function BusinessProfile() {
	const userData = useContext(CurrentUserContext).currentUser;
	const navigate = useNavigate();

	const [myEstablishments, setMyEstablishments] = useState<Establishment[]>([]);

	const handleEditProfile = () => {
		navigate('/user-profile');
	};

	useEffect(() => {
		mainApi.getAllMyEstablishments().then((res) => {
			setMyEstablishments(res.results);
		});
	}, []);

	return (
		<>
			<Header />
			<section className="business-profile">
				<div className="business-profile__box-profile">
					<div className="business-profile__box-info">
						<p className="business-profile__user-name">
							{userData?.first_name + ' ' + userData?.last_name}
						</p>
						<p className="business-profile__user-phone">
							{userData?.telephone}
						</p>
						<div className="business-profile__box-info_contacts">
							<p className="business-profile__user-email">{userData?.email}</p>
						</div>
					</div>
					<button
						onClick={handleEditProfile}
						className="business-profile__user-editBtn"
					></button>
				</div>

				<Link
					to="add-restaurant"
					className="business-profile__add-restaurantBtn"
				>
					Добавить ресторан
				</Link>
				<h2 className="business-profile__list-title">Мои рестораны</h2>
				<ul className="business-profile__list">
					{myEstablishments.map((establishment, index) => (
						<RestaurantItem
							key={establishment.id}
							id={establishment.id}
							name={establishment.name}
							cities={establishment.cities}
							address={establishment.address}
							poster={establishment.poster}
							avarage_check={establishment.average_check}
							rating={establishment.rating}
							review_count={establishment.review_count}
							establishment={establishment}
						/>
					))}
				</ul>
			</section>
			<Footer />
		</>
	);
}

export default BusinessProfile;
