import './RestaurantPage.css';
import {
	featuresLang,
	zoneLang,
	Restaurant,
	getDayAbbreviation,
	fetchRestaurantData,
	initRestaurant,
	timesForTimePicker,
} from '../../utils/constants';
import {
	Checkbox,
	Button,
	ButtonProps,
	Dialog,
	DialogContent,
	IconButton,
	Backdrop,
	Box,
	Typography,
	TextField,
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
import { useCallback, useContext, useEffect, useState } from 'react';
import RatingAndReviews from '../RatingAndReviews/RatingAndReviews';
import BookingForm from '../BookingForm/BookingForm';
import { useNavigate } from 'react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AddReview from '../AddReview/AddReview';
import { mainApi } from '../../utils/mainApi';
import { ReviewType } from '../../types/Reviews';
import { formatRating } from '../../utils/formatRating';
import { calculateBlackRubles } from '../../utils/calculateBlackRubles';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import LinkToYandexMap from '../LinkToYandexMap/LinkToYandexMap';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventCard from '../Events/EventCard';
import { Event } from '../../models/data/Event';
import { formatDate, formatTime } from '../../utils/formatDateString';
import transformDate from '../../utils/transformDate';

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
	const [availableDates, setAvailableDates] = useState([]);
	const [availableTimes, setAvailableTimes] = useState([]);
	const [currentDate, setCurrentDate] = useState('');
	const [establismentEvents, setEstablishmentEvents] = useState([]);
	const [countOfPeople, setCountOfPeople] = useState<string[]>([]);
	const [currentTime, setCurrentTime] = useState<string>('');

	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;
	const role = useContext(CurrentUserContext).currentRole;


	const updatePageData = useCallback(() => {
		mainApi
			.getEstablissmentData(id)
			.then((restaurantData) => {
				setcurrentRestaurant(restaurantData);
				mainApi
					.getAvailableBookingDates(id)
					.then((dates) => {
						if (!dates) return;
						setAvailableDates(dates.results);

						const availabletime = dates.results
							.filter((el: any) => {
								if (currentDate) {
									return el.date === currentDate;
								}

								return el.date === dates.results[0].date;
							})
							.map((el: any) => el.time);

						if (!currentTime) {
							setCurrentTime(availabletime[0]);
						} else {
							setCurrentTime(currentTime);
						}

						setAvailableTimes(availabletime);

						setCountOfPeople(
							availableDates
								.filter((el: any) => el.date === currentDate)
								.filter((el: any) => el.time === currentTime)
								.map((el: any) => el.table)
								.map((item) => {
									const match = item.match(/мест: (\d+)/);
									if (match) {
										const num_of_seats = parseInt(match[1], 10);

										return num_of_seats === 1
											? '1 человек'
											: `${num_of_seats} человека`;
									}
									return item;
								})
						);
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
		mainApi
			.getEstablismnetEvents(id)
			.then((events) => setEstablishmentEvents(events))
			.catch((err) => console.log(err));
		mainApi
			.getEstablishmentsReviews(id)
			.then((data) => {
				setcurrentRestaurantReviews(data);
			})
			.catch((err) => console.log(err));
	}, [availableDates, currentDate, currentTime]);

	useEffect(() => {
		if (!currentDate) return;

		mainApi
			.getAvailableBookingDates(id)
			.then((dates) => {
				if (!dates) return;

				setAvailableDates(dates.results);

				const availabletime = dates.results
					.filter((el: any) => {
						if (currentDate) {
							return el.date === currentDate;
						}

						return el.date === dates.results[0].date;
					})
					.map((el: any) => el.time);

				if (!currentTime) {
					setCurrentTime(availabletime[0]);
				} else {
					setCurrentTime(currentTime);
				}

				setAvailableTimes(availabletime);

				const peoples = availableDates
					.filter((el: any) => el.date === currentDate)
					.filter((el: any) => el.time === currentTime)
					.map((el: any) => el.table)
					.map((item) => {
						const match = item.match(/мест: (\d+)/);
						if (match) {
							const num_of_seats = parseInt(match[1], 10);

							return num_of_seats === 1
								? '1 человек'
								: `${num_of_seats} человека`;
						}
						return item;
					});

				setCountOfPeople(peoples);
			})
			.catch((err) => console.log(err));
	}, [currentDate, currentTime, id]);

	useEffect(() => {
		updatePageData();
	}, []);

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

	const maxStars = 5;
	const filledStars = Math.floor(formatRating(currentRestaurant.rating));
	const hasHalfStar =
		formatRating(currentRestaurant.rating) - filledStars >= 0.5;

	const starElements = Array.from({ length: maxStars }).map((_, i) => {
		if (i < filledStars) {
			return <StarIcon key={i} className="restaurant-page__rating-star" />;
		} else if (i === filledStars && hasHalfStar) {
			return <StarHalfIcon key={i} className="restaurant-page__rating-star" />;
		} else {
			return (
				<StarBorderIcon key={i} className="restaurant-page__rating-star" />
			);
		}
	});

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
						width: '70vw',
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
				<Box display="flex" flexDirection={{ xs: 'column', md: 'column' }}>
					<Box
						sx={{
							position: 'relative',
							width: { xs: '100%', sm: '100%' },
							height: { xs: '75vw', sm: '43vw', md: '23vw' },
						}}
					>
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
								<AllPhotosButton
									onClick={openModal}
									variant="text"
									size="small"
								>
									Все фото
								</AllPhotosButton>
							)}
						</div>
					</Box>
					<div className="restaurant-page__info-container">
						<div>
							<h2 className="restaurant-page__name">
								{currentRestaurant?.name}
							</h2>
						</div>
						<div className="restaurant-page__info">
							<div className="restaurant-page__stars-container">
								{starElements}
							</div>
							<p className="restaurant-page__rating">
								{formatRating(currentRestaurant.rating)}
							</p>
							<div className="restaurant-page__reviews-container">
								<ChatBubbleOutlineOutlinedIcon
									sx={{ color: '#49454F' }}
									fontSize="small"
								/>
								<p className="restaurant-page__reviews">
									{currentRestaurantReviews.length}
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
				</Box>
				<Box
					sx={{
						backgroundColor: '#991a55',
						maxWidth: { xs: '100%', sm: 'calc(92% - 32px)' },
						m: 'auto',
					}}
					p="16px 16px 16px 16px"
				>
					{availableDates.length > 0 && availableTimes.length ? (
						<>
							<Typography
								variant="h2"
								fontFamily="Ubuntu"
								fontSize="30px"
								fontWeight="400"
								lineHeight="36px"
								color="#fff"
								mb="16px"
								sx={{
									textAlign: 'center',
								}}
							>
								Забронировать стол
							</Typography>
							<BookingForm
								currentDate={setCurrentDate}
								availableDates={availableDates}
								availableTimes={availableTimes}
								onSubmit={handleBookBtnClick}
								numOfPeople={countOfPeople}
								setTime={setCurrentTime || (() => {})}
								children={
									<Button
										variant="contained"
										type="submit"
										sx={{
											backgroundColor: '#05887B',
											textTransform: 'none',
											borderRadius: '8px',
											minHeight: '40px',
											maxWidth: '328px',
											minWidth: '328px',
											alignSelf: 'center',
										}}
									>
										Забронировать
									</Button>
								}
							/>
						</>
					) : (
						availableDates.length === 0 && (
							<Typography
								sx={{ m: 'auto', maxWidth: 'fit-content', color: 'white' }}
							>
								{'Пока нет свободных мест :('}
							</Typography>
						)
					)}
				</Box>
				{!establismentEvents.length ? (
					''
				) : (
					<Box width="92%" m="0 auto">
						<Typography
							sx={{ fontSize: '26px', fontWeight: '600', m: '24px 0 16px 0' }}
						>
							Ближайшие мероприятия
						</Typography>
						{establismentEvents.map((event: Event, index: number) => (
							<EventCard
								key={index}
								eventPoster={event.image}
								eventName={event.name}
								eventOwner={currentRestaurant.name}
								eventAddress={currentRestaurant.address}
								eventType={'Вечеринка'}
								eventDate={formatDate(event.date_start)}
								eventTime={formatTime(event.date_start)}
								eventPrice={event.price}
								eventId={0}
							/>
						))}
					</Box>
				)}
				<Box
					sx={{
						maxWidth: '92%',
						m: '0 auto',
					}}
				>
					<h3 className="restaurant-page__about-title">
						Подробнее о ресторане
					</h3>
					<Box
						display="flex"
						flexDirection={{ xs: 'column', sm: 'row' }}
						justifyContent={'start'}
						alignItems="flex-start"
						gap={{ xs: '0', sm: '32px' }}
						borderBottom={{ xs: '', sm: '1px solid #CAC4D0' }}
						pb={{ xs: '0', sm: '10px' }}
					>
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
						<div className="restaurant-page__zone-container">
							<DeckOutlinedIcon />
							<div className="restaurant-page__zone-info">
								<h4 className="restaurant-page__zone-title">Зонирование</h4>
								<div className="restaurant-page__zones">
									{currentRestaurant?.zones
										.filter((zone) => zone.seats > 0)
										.map((zone) => (
											<p className="restaurant-page__zone-item" key={zone.id}>
												{zone.zone}
												{','}
											</p>
										))}
								</div>
							</div>
						</div>
						<div className="restaurant-page__about-line"></div>
					</Box>
				</Box>
				<Box maxWidth={'92%'} m="0 auto">
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
									borderRadius: '8px',
									textTransform: 'none',
									maxHeight: '40px',
									minWidth: '328px',
									order: { xs: 1, sm: 2 },
								}}
							>
								Оставить свой отзыв
							</Button>
						)}
					</RatingAndReviews>
				</Box>
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
