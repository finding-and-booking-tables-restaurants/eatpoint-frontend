import './RestaurantItem.css';
import RatingIcon from '../../../images/star-icon.svg';
import ReviewsIcon from '../../../images/message-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Establishment } from '../../../types/getMyRestaurantTypes';

interface RestaurantItemProps {
	id?: number;
	name: string;
	cities: string;
	address: string;
	poster: string;
	avarage_check: string;
	rating: number | undefined;
	review_count: number | undefined;
	establishment: Establishment;
	handleOpenDeleteModal?: (establishment: Establishment) => void;
}

function RestaurantItem({
	id,
	name,
	cities,
	address,
	poster,
	avarage_check,
	rating,
	review_count,
	establishment,
	handleOpenDeleteModal,
}: RestaurantItemProps) {
	const navigate = useNavigate();

	return (
		<li className="restaurant">
			<div className="restaurant__box-card">
				<div className="restaurant__box-info">
					<img
						src={poster}
						alt="Аватар заведения"
						className="restaurant__image"
					/>
					<div>
						<p className="restaurant__title">{name}</p>
						<p className="restaurant__place">{`${cities}, ${address}`}</p>
					</div>
					<Link
						to={`edit-restaurant/${id}`}
						state={establishment}
						className="restaurant__editBtn"
					/>
				</div>
				<div className="restaurant__box-addition-info">
					<div className="restaurant__flex-box">
						<img src={RatingIcon} alt="Иконка рейтинга"></img>
						<span className="restaurant__rating-num">{rating || 0}</span>
					</div>
					<div className="restaurant__flex-box">
						<img src={ReviewsIcon} alt="Иконка отзывов"></img>
						<span className="restaurant__reviews-num">{review_count || 0}</span>
					</div>
					<p>{`${avarage_check}`} ₽</p>
					<button
						className="restaurant__delete-btn"
						onClick={() =>
							handleOpenDeleteModal && handleOpenDeleteModal(establishment)
						}
					></button>
				</div>
				<div className="restaurant__box-optionBtn">
					<button className="restaurant__optionBtn restaurant__optionBtn_reservation">
						Нет новых
					</button>
					<button
						onClick={() => navigate(`/restaurant-reviews/${id}`)}
						className="restaurant__optionBtn restaurant__optionBtn_reviews"
					>
						Отзывы
					</button>
				</div>
				<div className="restaurant__box-optionBtn">
					<button
					onClick={() => navigate(`/business-profile/reservation-restaurant/${id}`)}
					className="restaurant__optionBtn restaurant__optionBtn_allReservation">
						Все брони
					</button>
					<button className="restaurant__optionBtn restaurant__optionBtn_analytics">
						Аналитика
					</button>
				</div>
			</div>
		</li>
	);
}

export default RestaurantItem;
