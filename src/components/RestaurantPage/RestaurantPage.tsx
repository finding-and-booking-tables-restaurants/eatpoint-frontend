import './RestaurantPage.css';
import {
	featuresLang,
	zoneLang,
	Restaurant,
	getDayAbbreviation,
	fetchRestaurantData,
	initRestaurant,
} from '../../utils/constants';
import {
	Checkbox,
	Button,
	ButtonProps,
	Dialog,
	DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
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
import AddReview from '../AddReview/AddReview';
import { mainApi } from '../../utils/mainApi';
import { ReviewType } from '../../types/Reviews';
import { pluralizeReviews } from '../../utils/pluralizeReviews';
import { formatRating } from '../../utils/formatRating';
import { calculateBlackRubles } from '../../utils/calculateBlackRubles';

export default function RestaurantPage({ id }: { id: number }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
	const [currentRestaurant, setcurrentRestaurant] =
		useState<Restaurant>(initRestaurant);
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [currentRestaurantReviews, setcurrentRestaurantReviews] = useState<
		ReviewType[]
	>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const updatePageData = () => {
		mainApi
			.getEstablissmentData(id)
			.then((data) => {
				setcurrentRestaurant(data);
				console.log(currentRestaurant.images);
			})
			.catch((err) => console.log(err));
		mainApi
			.getEstablishmentsReviews(id)
			.then((data) => {
				setcurrentRestaurantReviews(data);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		updatePageData();
	}, []);

	useEffect(() => {
		updatePageData();
	}, [!isModalOpen]);

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	const AllPhotosButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: '#05887B',
		backgroundColor: '#fcf7e7',
		textTransform: 'none',
		width: '93px',
		cursor: 'pointer',
	}));

	const descriptionToShow = showFullDescription
		? currentRestaurant?.description || ''
		: (currentRestaurant?.description || '').slice(0, 253);

	const navigate = useNavigate();

	const handleBookBtnClick = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		navigate(`/booking/${id}`, { replace: true });
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const openAddReviewModal = () => {
		setIsAddReviewOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsAddReviewOpen(false);
	};
	const blackRublesCount = calculateBlackRubles(
		currentRestaurant.average_check
	);

	const rubles = Array.from({ length: 4 }).map((_, index) => (
		<span
			key={index}
			className={`restaurant-page__average-check
				} ${index < blackRublesCount ? 'restaurant-page__average-check_black' : ''}`}
		>
			₽
		</span>
	));

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
						{currentRestaurant.images.length > 0 && (
							<AllPhotosButton onClick={openModal} variant="text" size="small">
								Все фото
							</AllPhotosButton>
						)}
						<Dialog
							open={isModalOpen}
							onClose={closeModal}
							fullWidth
							maxWidth="lg"
							PaperProps={{
								style: {
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									backgroundColor: 'rgba(0, 0, 0, 0.5)',
									position: 'relative',
								},
							}}
						>
							<Button
								onClick={closeModal}
								style={{
									position: 'absolute',
									top: '10px',
									right: '10px',
									color: '#fff',
									zIndex: 100,
								}}
							>
								<CloseIcon />
							</Button>
							<DialogContent style={{ padding: 0, position: 'relative' }}>
								{currentRestaurant.images.map((image, index) => (
									<figure
										key={index}
										className="restaurant-page__modal-image-container"
										style={{
											display: index === currentImageIndex ? 'block' : 'none',
											position: 'relative',
											width: '100%',
											padding: 0,
										}}
									>
										<img
											src={image.image}
											alt={image.name}
											style={{ width: '100%', height: 'auto' }}
										/>
										<figcaption>{`Фото ${index + 1} из ${
											currentRestaurant.images.length
										}`}</figcaption>
										<div
											className="restaurant-page__modal-buttons-container"
											style={{
												textAlign: 'center',
												position: 'absolute',
												top: '50%',
												width: '100%',
											}}
										>
											{currentRestaurant.images.length > 1 && (
												<>
													<Button
														sx={{}}
														onClick={() =>
															setCurrentImageIndex((prev) =>
																prev > 0 ? prev - 1 : 0
															)
														}
													>
														←
													</Button>
													<Button
														style={{ position: 'absolute', right: 0 }}
														onClick={() =>
															setCurrentImageIndex((prev) =>
																prev < currentRestaurant.images.length - 1
																	? prev + 1
																	: prev
															)
														}
													>
														Вперед
													</Button>
												</>
											)}
										</div>
									</figure>
								))}
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="restaurant-page__info-container">
					<div>
						<h2 className="restaurant-page__name">{currentRestaurant?.name}</h2>
					</div>
					<div className="restaurant-page__info">
						<p className="restaurant-page__rating">
							<span className="restaurant-page__rating-star">&#9733;</span>{' '}
							{formatRating(currentRestaurant.rating)}
						</p>
						<div className="restaurant-page__reviews-container">
							<ChatBubbleOutlineOutlinedIcon fontSize="small" />
							<p className="restaurant-page__reviews">
								{pluralizeReviews(currentRestaurantReviews.length)}
							</p>
						</div>
						<div>{rubles}</div>
					</div>
					<div className="restaurant-page__address-container">
						<div>
							<p className="restaurant-page__address-text">Адрес</p>
							<p className="restaurant-page__address">
								{currentRestaurant?.cities}, {currentRestaurant?.address}
							</p>
							<p className="restaurant-page__phone">
								{currentRestaurant?.telephone}
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
							{currentRestaurant.description.length > 330 &&
							!showFullDescription
								? '...'
								: ''}
						</p>
						{!showFullDescription &&
							currentRestaurant.description.length >= 330 && (
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
					booking={false}
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
				<RatingAndReviews
					openModal={openAddReviewModal}
					reviews={currentRestaurantReviews}
					rating={formatRating(currentRestaurant.rating)}
				/>
			</main>
			<Footer />
			<AddReview
				isOpen={isAddReviewOpen}
				onClose={closeModal}
				restaurantId={currentRestaurant?.id}
				restaurantName={currentRestaurant?.name}
				restaurantAddress={currentRestaurant?.address}
			/>
		</>
	);
}
