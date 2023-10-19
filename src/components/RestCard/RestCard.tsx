import React from 'react';
import RestCardProps from '../../models/propsInterfaces/RestCardProps';
import './RestCard.css';
import starIcon from '../../images/star-icon.svg';
import plusIcon from '../../images/plus-icon.svg';
import calenderIcon from '../../images/calender-icon.svg';
import messageIcon from '../../images/message-icon.svg';
import { useNavigate } from 'react-router';

const RestCard: React.FC<RestCardProps> = ({
	img,
	name,
	address,
	rating,
	reviews,
	search,
	id,
}) => {
	const navigate = useNavigate();

	const handleLikeBtnClick = () => {};

	const handeReviewsClick = () => {};

	const handleBookBtnClick = () => {
		navigate(`/booking/${id}`, { replace: true });
	};

	const bookButton: JSX.Element = (
		<button
			onClick={handleBookBtnClick}
			className={`card__button ${
				search ? 'card__button_type_search' : 'card__button_type_recomended'
			}`}
		>
			<img src={search ? calenderIcon : plusIcon} alt="плюсик" />
			<p>Бронировать</p>
		</button>
	);

	const handleCardClick = () => {
		navigate(`/establishment/${id}`);
	};

	return (
		<div
			className={`card ${
				search ? 'card_type_search' : 'card_type_recomendation'
			} `}
		>
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
						<img src={starIcon} alt="иконка рейтинга" />
						<p className="card__rating">{rating}</p>
					</div>
					<div onClick={handeReviewsClick} className="card__reviews-contaner">
						<img src={search ? messageIcon : plusIcon} alt="плюсик" />
						<p className="card__reviews">{reviews}</p>
					</div>
					{search && bookButton}
					<p
						className={`${
							search ? 'card__average-bill_search' : 'card__average-bill'
						}`}
					>
						₽₽₽
					</p>
				</div>
				{!search && bookButton}
			</div>
		</div>
	);
};

export default RestCard;
