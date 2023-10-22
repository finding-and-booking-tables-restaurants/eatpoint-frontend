import React, { useEffect, useState } from 'react';
import usersApi from '../../utils/UsersApi';
import UserBooking from '../UserBooking/UserBooking';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './UserBookings.css';

const UserBookings = () => {
	const [userBookings, setUserBookings] = useState<any[]>([]);
	const [isBokingsChanged, setIsBookingsChanged] = useState(false);

	const handleDeleteBooking = (id: number) => {
		setIsBookingsChanged(true);
		usersApi
			.deleteBooking(String(id))
			.catch((err) => console.log(err))
			.finally(() => {
				setIsBookingsChanged(false);
			});
	};

	useEffect(() => {
		usersApi
			.getUserBookings()
			.then((data) => {
				setUserBookings(data.results);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		usersApi
			.getUserBookings()
			.then((data) => {
				setUserBookings(data.results);
			})
			.catch((err) => console.log(err));
	}, [isBokingsChanged]);

	return (
		<>
			<Header />
			<div className="user-bookings">
				<h2 className="user-bookings-title">Мои бронирования</h2>
				<div className="user-bookings-container">
					<p
						className={`user-bookings-closest ${
							!userBookings.length && 'user-bookings-none'
						}`}
					>
						{`${
							userBookings.length
								? 'Ближайшие бронирования'
								: 'У вас пока нет бронирований'
						}`}
					</p>

					{UserBooking.length &&
						userBookings.map((booking, index) => (
							<UserBooking
								key={index}
								poster={booking.establishment.poster}
								name={booking.establishment.name}
								date={booking.date_reservation}
								time={booking.start_time_reservation}
								people={booking.number_guests}
								zone={booking.zone}
								adress={booking.establishment.address}
								id={booking.id}
								handleDeleteBooking={handleDeleteBooking}
							/>
						))}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default UserBookings;
