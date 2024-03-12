import React, { FC, useState } from 'react';
import './UserBooking.css';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import placeIcon from '../../images/place-icon-black.svg';
import notifIcon from '../../images/notification-icon.svg';
import { pluralizePeople } from '../../utils/pluralizePeople';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import AddReview from '../AddReview/AddReview';
import NoMealsRoundedIcon from '@mui/icons-material/NoMealsRounded';

interface UserBookingProps {
	poster: string;
	name: string;
	date: string;
	time: string;
	people: number;
	zone: string;
	adress: string;
	bookingId: number;
	establishmentId: number;
	handleDeleteBooking?: (id: number) => void;
	handleCancelBooking?: (id: number) => void;
	status: boolean;
	bookingIsDeleting: number;
	isVisited?: boolean;
	cancelled?: boolean;
	// handleLeaveReview?: (id: number) => void;
}

const UserBooking: FC<UserBookingProps> = ({
	poster,
	name,
	date,
	time,
	people,
	zone,
	adress,
	bookingId,
	establishmentId,
	handleDeleteBooking,
	handleCancelBooking,
	status,
	bookingIsDeleting,
	isVisited,
	cancelled,
}) => {
	const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/establishment/${establishmentId}`);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const handleLeaveReview = () => {
		setIsAddReviewOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsAddReviewOpen(false);
	};

	return (
		<div className="user-booking">
			<div className="user-booking__heading" onClick={handleCardClick}>
				<img
					className="user-booking__rest-poster"
					src={poster}
					alt="постер ресторана"
				/>
				<div className="user-booking__date-container">
					<p className="user-booking__rest-name">{name}</p>
				</div>
				<button className="user-booking__share-btn" />
			</div>
			<div className="user-booking__info">
				<div className="user-booking__info-container" onClick={handleCardClick}>
					<p className="user-booking__time">{date + ' в ' + time}</p>
					<p className="user-booking__people">
						{pluralizePeople(people) + ', ' + zone}
					</p>
				</div>
				<div
					className="user-booking__adress-container"
					onClick={handleCardClick}
				>
					<img src={placeIcon} alt="" className="user-booking__adress-icon" />
					<div className="user-booking__adress-text-container">
						<p className="user-booking__adress-heading">Адрес</p>
						<p className="user-booking__adress-text">{adress}</p>
					</div>
				</div>

				{!isVisited && (
					<div
						className="user-booking__message-container"
						onClick={handleCardClick}
					>
						{/* <img src={notifIcon} className="user-booking__message-icon" /> */}
						<p className="user-booking__message-text">
							{status && !cancelled && 'Бронирование подтверждено'}

							{!status && 'Ожидайте подтверждение от ресторана'}
							{cancelled && 'Бронирование отменено'}
						</p>
						{status && !cancelled ? <DoneIcon color="success" /> : ''}
						{cancelled && <NoMealsRoundedIcon style={{ color: 'C41A68' }} />}
					</div>
				)}
				{!isVisited && !cancelled && (
					<Button
						onClick={() => {
							if (!status) {
								handleDeleteBooking!(bookingId);
							} else {
								handleCancelBooking!(bookingId);
							}
						}}
						sx={{
							borderColor: '#05887B',
							color: '#05887B',
							textTransform: 'none',
							borderRadius: '8px',
							padding: '10px 24px 10px 16px',
						}}
						variant="outlined"
						// startIcon={<CloseIcon />}
						disabled={bookingIsDeleting === bookingId}
					>
						{bookingIsDeleting === bookingId
							? 'Бронирование отменено'
							: 'Отменить бронирование'}
					</Button>
				)}
				{isVisited && (
					<Button
						onClick={() => {
							handleLeaveReview!();
						}}
						sx={{
							minWidth: '296px',
							borderColor: '#05887B',
							color: '#05887B',
							textTransform: 'none',
							borderRadius: '8px',
							padding: '10px 24px 10px 16px',
						}}
						variant="outlined"
						disabled={bookingIsDeleting === bookingId}
					>
						Оставить отзыв
					</Button>
				)}
			</div>
			<AddReview
				isOpen={isAddReviewOpen}
				onClose={closeModal}
				restaurantId={establishmentId}
				restaurantName={name}
				restaurantAddress={adress}
			/>
		</div>
	);
};

export default UserBooking;
