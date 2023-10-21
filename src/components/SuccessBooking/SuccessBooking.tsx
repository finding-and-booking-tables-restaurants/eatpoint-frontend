import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import './SuccessBooking.css';
import Stack from '@mui/material/Stack';
import '../BookingPage/BookingPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import usersApi from '../../utils/UsersApi';

interface SuccessBookingProps {
	restName?: string;
	adress?: string;
	date?: string;
	time?: string;
	numOfPeople?: string;
	id?: number;
	unBook: (value: boolean) => void;
	bookingId: string;
}

const SuccessBooking: FC<SuccessBookingProps> = ({
	restName,
	adress,
	date,
	time,
	numOfPeople,
	id,
	unBook,
	bookingId,
}) => {
	const [isBooked, setIsBooked] = useState(true);
	const navigate = useNavigate();

	const handleUnBook = () => {
		usersApi
			.deleteBooking(bookingId)
			.then((res) => {
				if (res.ok) {
					setIsBooked(false);
				}
				throw new Error(`Request failed with status ${res.status}`);
			})
			.catch((err) => console.log(err));
	};

	const handleBackBtnClick = () => {
		unBook(true);
	};

	const handleToMainClick = () => {
		navigate('/');
	};

	const handleToBookingsClick = () => {
		navigate('/user-bookings');
	};

	return (
		<div className="success-booking">
			<div className="booking-page__heading">
				<button className="booking-page__back-btn" onClick={handleBackBtnClick}>
					{<ArrowBackIcon />}
				</button>
				<h1 className="booking-page__title">Бронирование</h1>
			</div>
			<p className="success-booking__title">Столик забронирован</p>
			<p className="success-booking__notification">
				Вам придет подтверждение о бронировании от ресторана на телефон и на
				электронную почту.
			</p>
			<div className="success-booking__rest-info">
				<p className="success-booking__name">Ресторан {restName}</p>
				<p className="success-booking__adress">{adress}</p>
			</div>
			<p className="success-booking__time-info">
				{date} в {time}, {numOfPeople} персоны
			</p>
			{isBooked ? (
				<Button
					sx={{
						borderRadius: 100,
						mt: '17px',
						width: '156px',
						borderColor: '#05887B',
						color: '#05887B',
						textTransform: 'none',
						height: '40px',
					}}
					onClick={handleUnBook}
					variant="outlined"
				>
					Отменить бронь
				</Button>
			) : (
				<p className="success-booking__unbooked-text">Бронирование отменено</p>
			)}
			<Stack
				sx={{
					width: '100%',
					height: '40px',
					mt: '170px',
					pt: '16px',
					borderTop: '1px solid #cac4d0',
				}}
				spacing={'16px'}
				direction="row"
			>
				<Button
					onClick={handleToMainClick}
					sx={{
						borderRadius: 100,
						mt: '17px',
						width: `${isBooked ? '156px' : '100%'}`,
						borderColor: '#05887B',
						color: '#05887B',
						textTransform: 'none',
					}}
					variant="outlined"
				>
					На главную
				</Button>
				<Button
					onClick={handleToBookingsClick}
					sx={{
						display: `${!isBooked && 'none'}`,
						borderRadius: 100,
						mt: '17px',
						width: '156px',
						backgroundColor: '#05887B',
						color: '#FFFFFF',
						textTransform: 'none',
					}}
					variant="contained"
				>
					Перейти к брони
				</Button>
			</Stack>
		</div>
	);
};

export default SuccessBooking;
