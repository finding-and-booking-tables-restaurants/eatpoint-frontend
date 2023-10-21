import React, { FC } from 'react';
import './UserBooking.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import placeIcon from '../../images/place-icon-black.svg';
import notifIcon from '../../images/notification-icon.svg';

interface UserBookingProps {
	poster: string;
	name: string;
	date: string;
	time: string;
	people: number;
	zone: string;
	adress: string;
	id: number;
	handleDeleteBooking: (id: number) => void;
}

const UserBooking: FC<UserBookingProps> = ({
	poster,
	name,
	date,
	time,
	people,
	zone,
	adress,
	id,
	handleDeleteBooking,
}) => {
	return (
		<div className="user-booking">
			<div className="user-booking__heading">
				<img
					className="user-booking__rest-poster"
					src={poster}
					alt="постер ресторана"
				/>
				<div className="user-booking__date-container">
					<p className="user-booking__rest-name">{name}</p>
					<p className="user-booking__booking-date">{date}</p>
				</div>
				<button className="user-booking__share-btn" />
			</div>
			<div className="user-booking__info">
				<div className="user-booking__info-container">
					<p className="user-booking__time">{date + ', ' + time}</p>
					<p className="user-booking__people">
						{people + ' человек(а), ' + zone}
					</p>
				</div>
				<div className="user-booking__adress-container">
					<img src={placeIcon} alt="" className="user-booking__adress-icon" />
					<div className="user-booking__adress-text-container">
						<p className="user-booking__adress-heading">Адрес</p>
						<p className="user-booking__adress-text">{adress}</p>
					</div>
				</div>
				<div className="user-booking__message-container">
					<img src={notifIcon} className="user-booking__message-icon" />
					<p className="user-booking__message-text">
						Ожидайте подтверждение от ресторана
					</p>
				</div>
				<Button
					onClick={() => {
						handleDeleteBooking(id);
					}}
					sx={{
						borderColor: '#05887B',
						color: '#05887B',
						textTransform: 'none',
						borderRadius: '100px',
						padding: '10px 24px 10px 16px',
					}}
					variant="outlined"
					startIcon={<CloseIcon />}
				>
					Отменить бронирование
				</Button>
			</div>
		</div>
	);
};

export default UserBooking;
