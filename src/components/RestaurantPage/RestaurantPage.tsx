import './RestaurantPage.css';
import { restaurants, featuresLang, zoneLang } from '../../utils/constants';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useState } from 'react';

export default function RestaurantPage() {
	const restaurant = restaurants[0];
	const reviewsCount = restaurant.reviews.length;
	const [showFullDescription, setShowFullDescription] = useState(false);

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	const AllPhotosButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: '#05887B',
		backgroundColor: '#fcf7e7',
		textTransform: 'none',
		width: '93px',
	}));

	const descriptionToShow = showFullDescription
		? restaurant.description
		: restaurant.description.slice(0, 253);

	function pluralizeReviews(count: number) {
		if (count === 0) {
			return 'Нет отзывов';
		} else if (count % 10 === 1 && count % 100 !== 11) {
			return `${count} отзыв`;
		} else if (
			count % 10 >= 2 &&
			count % 10 <= 4 &&
			(count % 100 < 10 || count % 100 >= 20)
		) {
			return `${count} отзыва`;
		} else {
			return `${count} отзывов`;
		}
	}

	return (
		<main className="restaurant-page">
			<div className="restaurant-page__photo-container">
				<img
					className="restaurant-page__photo"
					src={restaurant.photos[0]}
					alt="Ресторан"
				/>
				<div className="restaurant-page__favorite">
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite />}
						style={{ width: 41, height: 41 }}
					/>
				</div>
				<div className="restaurant-page__more-photo-btn">
					<AllPhotosButton variant="text" size="small">
						Все фото
					</AllPhotosButton>
				</div>
			</div>
			<div className="restaurant-page__info-container">
				<div>
					<h2 className="restaurant-page__name">{restaurant.name}</h2>
				</div>
				<div className="restaurant-page__info">
					<p className="restaurant-page__rating">
						<span className="restaurant-page__rating-star">&#9733;</span>{' '}
						{restaurant.rating}
					</p>
					<div className="restaurant-page__reviews-container">
						<ChatBubbleOutlineOutlinedIcon fontSize="small" />
						<p className="restaurant-page__reviews">
							{pluralizeReviews(reviewsCount)}
						</p>
					</div>
					<span className="restaurant-page__average-check">
						{restaurant.check ? `${restaurant.check} ₽` : '₽₽₽'}
					</span>
				</div>
				<div className="restaurant-page__address-container">
					<div>
						<p className="restaurant-page__address-text">Адрес</p>
						<p className="restaurant-page__address">
							{restaurant.city}, {restaurant.address}
						</p>
						<p className="restaurant-page__phone">+{restaurant.phone}</p>
					</div>
					<div className="restaurant-page__map-icon">
						<MapOutlinedIcon fontSize="medium" style={{ color: '#05887B' }} />
					</div>
				</div>
				<div className="restaurant-page__features-container">
					<p className="restaurant-page__feature">{restaurant.cuisine}</p>
					{Object.entries(restaurant.features).map(
						([feature, hasFeature]) =>
							hasFeature && (
								<p className="restaurant-page__feature" key={feature}>
									{featuresLang[feature]}
								</p>
							)
					)}
				</div>
				<div className="restaurant-page__description">
					<p className="restaurant-page__description-text">
						{descriptionToShow}
						{descriptionToShow.length <= 330 ? '...' : ''}
					</p>
					{!showFullDescription && (
						<button
							className="restaurant-page__description-more-btn"
							onClick={toggleDescription}
						>
							Читать далее
						</button>
					)}
				</div>
			</div>

			{/* подробнее о ресторане */}
			<div className="restaurant-page__about-container">
				<h3 className="restaurant-page__about-title">Подробнее о ресторане</h3>
				<div className="restaurant-page__zone-container">
					<DeckOutlinedIcon />
					<div className="restaurant-page__zone-info">
						<h4 className="restaurant-page__zone-title">Зонирование</h4>
						<div className="restaurant-page__zones">
							<p className="restaurant-page__zone-item">
								{Object.entries(restaurant.zone)
									.filter(([zone, hasZone]) => hasZone)
									.map(([zone]) => zoneLang[zone])
									.join(', ')
									.replace(
										/^(.)(.*)/,
										(_, firstLetter, rest) =>
											firstLetter.toUpperCase() + rest.toLowerCase()
									)}
							</p>
						</div>
					</div>
				</div>
				<div className="restaurant-page__about-line"></div>
				<div className="restaurant-page__time-container">
					<AccessTimeOutlinedIcon fontSize="medium" />
					<div className="restaurant-page__time-info">
						<h4 className="restaurant-page__time-title">Рабочее время</h4>
						<p className="restaurant-page__time">
							Пн-Чт с {restaurant.openingHoursWeekday.opens} до{' '}
							{restaurant.openingHoursWeekday.closes},
						</p>
						<p className="restaurant-page__time">
							Пт-Вс с {restaurant.openingHoursWeekends.opens} до{' '}
							{restaurant.openingHoursWeekends.closes}
						</p>
					</div>
				</div>
				<div className="restaurant-page__about-line"></div>
			</div>
		</main>
	);
}
