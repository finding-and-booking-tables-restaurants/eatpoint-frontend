import React from 'react';
import RestCardProps from '../../models/propsInterfaces/RestCardProps';
import './RestCard.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import messageIcon from '../../images/message-icon.svg';
import { useNavigate } from 'react-router';
import { calculateBlackRubles } from '../../utils/calculateBlackRubles';
import { Box, Button } from '@mui/material';

const RestCard: React.FC<RestCardProps> = ({
	img,
	name,
	address,
	rating,
	reviews,
	search,
	id,
	average_check,
}) => {
	const navigate = useNavigate();

	const handleLikeBtnClick = () => {};

	const handleBookBtnClick = () => {
		navigate(`/booking/${id}`, { replace: true });
	};

	const handleCardClick = () => {
		navigate(`/establishment/${id}`);
	};

	const blackRublesCount = calculateBlackRubles(average_check);

	const rubles = Array.from({ length: 4 }).map((_, index) => (
		<span
			key={index}
			className={`card__average-bill
				} ${index < blackRublesCount ? 'card__average-bill_black' : ''}`}
		>
			₽
		</span>
	));

	const RatingStars = ({ rating }: { rating: number }) => {
		const stars = [];
		const filledStars = Math.floor(rating);
		const halfStar = rating % 1 !== 0;

		const starSx = { maxHeight: '19px', maxWidth: '19px', color: '#49454F' };

		for (let i = 0; i < filledStars; i++) {
			stars.push(<StarIcon sx={starSx} key={i} />);
		}

		if (halfStar) {
			stars.push(<StarHalfIcon sx={starSx} key="half" />);
		}

		for (let i = stars.length; i < 5; i++) {
			stars.push(<StarBorderIcon sx={starSx} key={i} />);
		}

		return (
			<Box display="flex" flexDirection="row">
				{stars}
			</Box>
		);
	};

	return (
		<div className="card">
			<button onClick={handleLikeBtnClick} className="card__like-btn" />
			<img
				onClick={handleCardClick}
				className="card__img card__img_type_recomended"
				src={img}
				alt="фото ресторана"
			/>
			<div className="card__info-container">
				<div onClick={handleCardClick} className="card__text-container">
					<p className="card__title">{name}</p>
					<p className="card__adress">{address}</p>
				</div>
				<div className="card__additional-info">
					<div className="card__rating-container">
						<RatingStars rating={rating} />
						<p className="card__rating">{rating}</p>
					</div>
					<div onClick={handleCardClick} className="card__reviews-contaner">
						<img src={messageIcon} alt="плюсик" />
						<p className="card__reviews">{reviews}</p>
					</div>
					<Box>{rubles}</Box>
				</div>
				<Button
					sx={{
						textTransform: 'none',
						color: '#05887B',
						borderBlockColor: '#05887B',
						borderRadius: '8px',
						padding: '10px 24px',
					}}
					onClick={handleBookBtnClick}
					variant="outlined"
				>
					Забронировать
				</Button>
			</div>
		</div>
	);
};

export default RestCard;
