import './RestaurantItem.css';
import RestaurantImage from '../../../images/business-profile__restaurant-image.png';
import RatingIcon from '../../../images/star-icon.svg';
import ReviewsIcon from '../../../images/message-icon.svg';

interface RestaurantItemProps {
	id?: number;
	name: string;
	cities: string;
	address: string;
	poster: string;
	avarage_check: string;
}

function RestaurantItem({
	id,
	name,
	cities,
	address,
	poster,
	avarage_check,
}: RestaurantItemProps) {
	return (
		<li className="restaurant">
			<div className="restaurant__box-card">
				<div className="restaurant__box-info">
					<img src={poster} className="restaurant__image" />
					<div>
						<p className="restaurant__title">{name}</p>
						<p className="restaurant__place">{`${cities}, ${address}`}</p>
					</div>
					<button className="restaurant__editBtn"></button>
				</div>
				<div className="restaurant__box-addition-info">
					<div className="restaurant__flex-box">
						<img src={RatingIcon}></img>
						<span className="restaurant__rating-num">4.5</span>
					</div>
					<div className="restaurant__flex-box">
						<img src={ReviewsIcon}></img>
						<span className="restaurant__reviews-num">76</span>
					</div>
					<p>{`${avarage_check}`} ₽</p>
				</div>
				<div className="restaurant__box-optionBtn">
					<button className="restaurant__optionBtn restaurant__optionBtn_reservation">
						Нет новых
					</button>
					<button className="restaurant__optionBtn restaurant__optionBtn_reviews">
						Отзывы
					</button>
				</div>
				<div className="restaurant__box-optionBtn">
					<button className="restaurant__optionBtn restaurant__optionBtn_allReservation">
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
