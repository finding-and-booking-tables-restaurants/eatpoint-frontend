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
	const [bookingIsDeleting, setBookingIsDeleting] = useState(0);

	const handleDeleteBooking = (id: number) => {
		setBookingIsDeleting(id);
		setTimeout(() => {
			setIsBookingsChanged(true);
			usersApi
				.deleteBooking(String(id))
				.catch((err) => console.log(err))
				.finally(() => {
					setIsBookingsChanged(false);
					setTimeout(() => {
						setBookingIsDeleting(0);
					}, 500);
				});
		}, 2000);
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
				maxWidth={{ xs: '100%', sm: '720px', md: 'auto', lg: 'auto' }}
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
						backgroundColor: { xs: '#d5ede4', md: 'transparent' },
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
					<Box
						display="flex"
						flexDirection="row"
						flexWrap="wrap"
						justifyContent={'center'}
						gap={{ xs: '32px', md: '24px' }}
					>
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
									bookingId={booking.id}
									establishmentId={booking.establishment.id}
									handleDeleteBooking={handleDeleteBooking}
									status={booking.status}
									bookingIsDeleting={bookingIsDeleting}
								/>
							))}
					</Box>
				</Box>
			</Box>
			<Footer />
		</>
	);
};

export default UserBookings;
