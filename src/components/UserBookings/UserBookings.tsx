import React, { useEffect, useState } from 'react';
import usersApi from '../../utils/UsersApi';
import UserBooking from '../UserBooking/UserBooking';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './UserBookings.css';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserBookings = () => {
	const navigate = useNavigate();
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
			<Box
				minWidth={{ xs: '100%', sm: '550px', md: '725px', lg: '1068px' }}
				maxWidth={{ xs: '100%', sm: '550px', md: 'auto', lg: 'auto' }}
				m={'auto'}
			>
				<h2 className="user-bookings-title">Мои бронирования</h2>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
						alignItems: 'start',
						justifyContent: 'start',
						padding: '16px',
						backgroundColor: { xs: '#d5ede4', sm: 'transparent' },
						minHeight: 'calc(100vh - 250px)',
					}}
				>
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
					{!userBookings.length && (
						<Button
							onClick={() => navigate('/')}
							sx={{
								background: '#05887B',
								width: '328px',
								borderRadius: '100px',
								textTransform: 'none',
								padding: '10px 24px',
							}}
							variant="contained"
						>
							К поиску ресторанов
						</Button>
					)}

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
				</Box>
			</Box>
			<Footer />
		</>
	);
};

export default UserBookings;
