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
	IconButton,
	Backdrop,
} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeckOutlinedIcon from '@mui/icons-material/DeckOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useContext, useEffect, useState } from 'react';
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
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LinkToYandexMap from '../LinkToYandexMap/LinkToYandexMap';

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

	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;
	const role = useContext(CurrentUserContext).currentRole;

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
			<Dialog
				open={isModalOpen}
				onClose={closeModal}
				sx={{
					'.css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop': {
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
					},
					'.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
						boxShadow: 'none',
					},
				}}
				PaperProps={{
					style: {
						backgroundColor: 'transparent',
						position: 'relative',
						color: '#fff',
						margin: '15px',
					},
				}}
			>
				<Button
					onClick={closeModal}
					style={{
						position: 'fixed',
						top: '19px',
						right: 0,
						color: '#fff',
						zIndex: 100,
						height: '24px',
						width: '24px',
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
							<figcaption className="restaurant-page__figcaption">{`Фото ${
								index + 1
							} из ${currentRestaurant.images.length}`}</figcaption>
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
										<IconButton
											sx={{
												color: '#fff',
												backgroundColor: '#05887B',
												borderRadius: '50%',
												padding: '8px',
												position: 'fixed',
												top: '50%',
												transform: 'translateY(-50%)',
												left: 0,
												margin: '8px',
											}}
											onClick={() =>
												setCurrentImageIndex((prev) =>
													prev > 0 ? prev - 1 : 0
												)
											}
										>
											<ArrowBackIcon />
										</IconButton>
										<IconButton
											style={{
												color: '#fff',
												backgroundColor: '#05887B',
												borderRadius: '50%',
												padding: '8px',
												position: 'fixed',
												top: '50%',
												transform: 'translateY(-50%)',
												right: 0,
												margin: '8px',
											}}
											onClick={() =>
												setCurrentImageIndex((prev) =>
													prev < currentRestaurant.images.length - 1
														? prev + 1
														: prev
												)
											}
										>
											<ArrowForwardIcon />
										</IconButton>
									</>
								)}
							</div>
						</figure>
					))}
				</DialogContent>
			</Dialog>
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

						<LinkToYandexMap
							city={currentRestaurant?.cities}
							address={currentRestaurant?.address}
						/>
					</div>
					<div className="restaurant-page__features-container">
						{currentRestaurant?.kitchens.map((kitchen, index) => (
							<p className="restaurant-page__feature" key={index}>
								{kitchen}
							</p>
						))}
						{currentRestaurant?.types.map((type, index) => (
							<p className="restaurant-page__feature" key={index}>
								{type}
							</p>
						))}
						{currentRestaurant?.services.map((service, index) => (
							<p className="restaurant-page__feature" key={index}>
								{service}
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
					restPage
					onSubmit={handleBookBtnClick}
					children={
						<Button
							variant="contained"
							type="submit"
							sx={{
								backgroundColor: '#05887B',
								textTransform: 'none',
								borderRadius: '8px',
								minHeight: '40px',
							}}
						>
							Забронировать
						</Button>
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
					headingText="Рейтинг и отзывы"
					reviews={currentRestaurantReviews}
					rating={formatRating(currentRestaurant.rating)}
				>
					{!isLoggedIn || role !== 'client' ? (
						''
					) : (
						<Button
							onClick={openAddReviewModal}
							startIcon={<ModeEditOutlineOutlinedIcon />}
							variant="outlined"
							sx={{
								color: '#006C60',
								border: '1px solid #006C60',
								borderRadius: '100px',
								textTransform: 'none',
							}}
						>
							Оставить свой отзыв
						</Button>
					)}
				</RatingAndReviews>
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
