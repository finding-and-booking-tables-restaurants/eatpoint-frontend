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
	const [userVisitedBookings, setUserVisitedBookings] = useState<any[]>([]);
	const [isBokingsChanged, setIsBookingsChanged] = useState(false);
	const [bookingIsDeleting, setBookingIsDeleting] = useState(0);

	console.log(userBookings);

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

	const handleCancelBooking = (id: number) => {
		setBookingIsDeleting(id);
		setTimeout(() => {
			setIsBookingsChanged(true);
			usersApi
				.cancelBooking(String(id))
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
				setUserBookings(
					data.results.filter(
						(el: { is_visited: boolean }) => el.is_visited === false
					)
				);
				setUserVisitedBookings(
					data.results.filter(
						(el: { is_visited: boolean }) => el.is_visited === true
					)
				);
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
						minHeight: 'calc(100vh - 256px)',
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
							// onClick={() => navigate('/')}
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
									date={booking.slots[0]?.date}
									time={booking.slots[0]?.time}
									people={booking.slots[0]?.seats}
									zone={booking.slots[0]?.zone}
									adress={booking.establishment.address}
									bookingId={booking.id}
									establishmentId={booking.establishment.id}
									handleCancelBooking={handleCancelBooking}
									handleDeleteBooking={handleDeleteBooking}
									status={booking.is_accepted}
									bookingIsDeleting={bookingIsDeleting}
									cancelled={booking.is_deleted}
								/>
							))}
					</Box>
				</Box>

				<Box
					sx={{
						background: '#fff',
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
						padding: '16px',
					}}
				>
					{userVisitedBookings.length > 0 && (
						<p className="user-bookings-closest">Уже посетили</p>
					)}
					<Box
						display="flex"
						flexDirection="row"
						flexWrap="wrap"
						justifyContent={'center'}
						gap={{ xs: '32px', md: '24px' }}
					>
						{userVisitedBookings.length > 0 &&
							userVisitedBookings.map((booking, index) => (
								<UserBooking
									key={index}
									poster={booking.establishment.poster}
									name={booking.establishment.name}
									date={booking.slots[0]?.date}
									time={booking.slots[0]?.time}
									people={booking.slots[0]?.seats}
									zone={booking.slots[0]?.zone}
									adress={booking.establishment.address}
									bookingId={booking.id}
									establishmentId={booking.establishment.id}
									// handleLeaveReview={handleLeaveReview}
									status={booking.is_accepted}
									bookingIsDeleting={bookingIsDeleting}
									isVisited={true}
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
