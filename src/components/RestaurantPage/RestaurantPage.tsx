import './RestaurantPage.css';
import {
	featuresLang,
	zoneLang,
	Restaurant,
	getDayAbbreviation,
	fetchRestaurantData,
} from '../../utils/constants';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useEffect, useState } from 'react';
import RatingAndReviews from '../RatingAndReviews/RatingAndReviews';
import BookingForm from '../BookingForm/BookingForm';
import TodayIcon from '@mui/icons-material/Today';
import { useNavigate } from 'react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function RestaurantPage({ id }: { id: number }) {
	const [currentRestaurant, setcurrentRestaurant] = useState<Restaurant>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchRestaurantData(id);
				setcurrentRestaurant(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [id, setcurrentRestaurant]);

	const reviewsCount = 45;
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
		? currentRestaurant?.description || ''
		: (currentRestaurant?.description || '').slice(0, 253);

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

	const navigate = useNavigate();

	const handleBookBtnClick = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate(`/booking/${id}`, { replace: true });
	};

	return (
		<>
			<Header />
			<main className="restaurant-page">
				<div className="restaurant-page__photo-container">
					<img
						className="restaurant-page__photo"
						src={currentRestaurant?.poster}
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
						<h2 className="restaurant-page__name">{currentRestaurant?.name}</h2>
					</div>
					<div className="restaurant-page__info">
						<p className="restaurant-page__rating">
							<span className="restaurant-page__rating-star">&#9733;</span>{' '}
							{currentRestaurant?.rating}
						</p>
						<div className="restaurant-page__reviews-container">
							<ChatBubbleOutlineOutlinedIcon fontSize="small" />
							<p className="restaurant-page__reviews">
								{pluralizeReviews(reviewsCount)}
							</p>
						</div>
						<span className="restaurant-page__average-check">{'₽₽₽'}</span>
					</div>
					<div className="restaurant-page__address-container">
						<div>
							<p className="restaurant-page__address-text">Адрес</p>
							<p className="restaurant-page__address">
								{currentRestaurant?.cities}, {currentRestaurant?.address}
							</p>
							<p className="restaurant-page__phone">
								+{currentRestaurant?.telephone}
							</p>
						</div>
						<div className="restaurant-page__map-icon">
							<MapOutlinedIcon fontSize="medium" style={{ color: '#05887B' }} />
						</div>
					</div>
					<div className="restaurant-page__features-container">
						{currentRestaurant?.kitchens.map((kitchen) => (
							<p className="restaurant-page__feature" key={kitchen.id}>
								{kitchen.name}
							</p>
						))}
						{currentRestaurant?.types.map((type) => (
							<p className="restaurant-page__feature" key={type.id}>
								{type.name}
							</p>
						))}
						{currentRestaurant?.services.map((service) => (
							<p className="restaurant-page__feature" key={service.id}>
								{service.name}
							</p>
						))}
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
				<BookingForm
					onSubmit={handleBookBtnClick}
					children={
						<button className="search-form__btn">
							{<TodayIcon />} Забронировать{' '}
						</button>
					}
				/>
				{/* подробнее о ресторане */}
				<div className="restaurant-page__about-container">
					<h3 className="restaurant-page__about-title">
						Подробнее о ресторане
					</h3>
					<div className="restaurant-page__zone-container">
						<DeckOutlinedIcon />
						<div className="restaurant-page__zone-info">
							<h4 className="restaurant-page__zone-title">Зонирование</h4>
							<div className="restaurant-page__zones">
								{currentRestaurant?.zones
									.filter((zone) => zone.available_seats > 0)
									.map((zone) => (
										<p className="restaurant-page__zone-item" key={zone.id}>
											{zone.zone}
										</p>
									))}
							</div>
						</div>
					</div>
					<div className="restaurant-page__about-line"></div>
					<div className="restaurant-page__time-container">
						<AccessTimeOutlinedIcon fontSize="medium" />
						<div className="restaurant-page__time-info">
							<h4 className="restaurant-page__time-title">Рабочее время</h4>
							{currentRestaurant?.worked.map((day) => {
								const { day: dayOfWeek, start, end, day_off } = day;

								const dayAbbreviation = getDayAbbreviation(dayOfWeek);
								const displayText = day_off
									? `${dayAbbreviation} - выходной`
									: `${dayAbbreviation} с ${start} до ${end}`;

								return (
									<p className="restaurant-page__time" key={day.day}>
										{displayText}
									</p>
								);
							})}
						</div>
					</div>
					<div className="restaurant-page__about-line"></div>
				</div>
				<RatingAndReviews rating={4.5} />
			</main>
			<Footer />
		</>
	);
}
