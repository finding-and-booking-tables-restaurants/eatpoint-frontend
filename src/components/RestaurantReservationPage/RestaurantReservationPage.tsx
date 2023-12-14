import './RestaurantReservationPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RatingIcon from '../../images/star-icon.svg';
import ReviewsIcon from '../../images/message-icon.svg';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/mainApi';
import { Box, Button } from '@mui/material';
import { maxWidthBoxConfig, minWidthBoxConfig } from '../../utils/constants';
import CheckIcon from '@mui/icons-material/Check';
import { Establishment } from '../../types/getMyRestaurantTypes';

function RestaurantReservationPage() {
	const [myEstablishments, setMyEstablishments] = useState<any>({});
	const [myReservations, setMyreservations] = useState<Establishment[]>([]);
	const [reservations, setReservations] = useState<Establishment[]>([]);
	const [updatedReservation, setUpdatedReservation] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [activeButton, setActiveButton] = useState('unconfirmed');

	const { id } = useParams();
	const history = useNavigate();

	useEffect(() => {
		mainApi.getAllMyEstablishments().then((res) => {
			const restaurant = res.results.find(
				(el: Establishment) => el.id === Number(id)
			);
			setMyEstablishments(restaurant);
		});
		mainApi.getAllBusinessReservation().then((res) => {
			const sortedReservations = res.results.sort((a: any, b: any) => {
				if (a.status === false && b.status === true) {
					return -1;
				} else if (a.status === true && b.status === false) {
					return 1;
				} else {
					const dateA = new Date(a.date_reservation);
					const dateB = new Date(b.date_reservation);

					if (dateA > dateB) return 1;
					if (dateA < dateB) return -1;
					return 0;
				}
			});
			setMyreservations(sortedReservations);
			setReservations(
				sortedReservations.filter((item: any) => item.status === false)
			);
		});
	}, [id, updatedReservation]);

	const handleConfirmReservation = (id: string) => {
		setIsLoading(true);
		mainApi
			.confirmReservation(id)
			.then(() => {
				setUpdatedReservation(id);
				setIsLoading(false);
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
		setReservations(
			myReservations.filter((item: any) => item.status === false)
		);
	};

	const handleCancelReservation = (id: string) => {
		setIsLoading(true);
		mainApi
			.cancelReservation(id)
			.then(() => {
				setUpdatedReservation(id);
				setIsLoading(false);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
				setUpdatedReservation(id);
			});
		setReservations(myReservations.filter((item: any) => item.status === true));
	};
	console.log(myReservations);

	const showUnconfirmed = () => {
		setActiveButton('unconfirmed');
		setReservations(
			myReservations.filter((item: any) => item.status === false)
		);
	};

	const showConfirmed = () => {
		setActiveButton('confirmed');
		setReservations(myReservations.filter((item: any) => item.status === true));
	};

	const buttonUnconfirmed = [
		'restaurant__reservation-button restaurant__reservation-button-one',
		activeButton === 'unconfirmed' ? 'active-button' : '',
	].join(' ');
	const buttonConfirmed = [
		'restaurant__reservation-button restaurant__reservation-button-two',
		activeButton === 'confirmed' ? 'active-button' : '',
	].join(' ');

	const redirectToReviewPage = (id: string) => {
		history(`/restaurant-reviews/${id}`);
	};
	const redirectToEditRestaurantPage = (id: string) => {
		history(`/business-profile/edit-restaurant/${id}`);
	};

	return (
		<>
			<Header />
			<Box
				// maxWidth={maxWidthBoxConfig}
				// minWidth={minWidthBoxConfig}
				m="auto"
				minHeight={'calc(100vh - 156px)'}
				className="restaurant__reserve"
                mr={{xs: 2, sm: 5, md: 5, lg: 6}}
                ml={{xs: 2, sm: 5, md: 5, lg: 6}}
			>
				<div className="restaurant__reserve-page">
					<div className="restaurant__reserve-box-info">
						<div>
							<p className="restaurant__reserve-title">
								{myEstablishments.name}
							</p>
						</div>
					</div>
					<div className="restaurant__box-addition-info_reservation">
						<div className="restaurant__flex-box">
							<img src={RatingIcon} alt="Иконка рейтинга"></img>
							<span className="restaurant__rating-num">
								{myEstablishments.rating || 0}
							</span>
						</div>
						<div className="restaurant__flex-box">
							<img src={ReviewsIcon} alt="Иконка отзывов"></img>
							<span className="restaurant__reviews-num">
								{myEstablishments.review_count || 0}
							</span>
						</div>
						<p>{`${myEstablishments.average_check}`} ₽</p>

						<button
							className="restaurant__edit-btn"
							onClick={() => redirectToEditRestaurantPage(id!)}
						></button>
					</div>
					<p className="restaurant__place">{`${myEstablishments.cities}, ${myEstablishments.address}`}</p>
				</div>
				<Box display="inline-flex" gap="8px" mt="auto" pt="16px" width="100%">
					<Button
						onClick={() => redirectToReviewPage(id!)}
						variant="outlined"
						sx={{
							color: '#006C60',
							borderColor: '#006C60',
							textTransform: 'none',
							borderRadius: '8px',
							width: '50%',
						}}
					>
						Отзывы
					</Button>
					<Button
						onClick={() => redirectToReviewPage(id!)}
						variant="outlined"
						sx={{
							color: '#006C60',
							borderColor: '#006C60',
							textTransform: 'none',
							borderRadius: '8px',
							width: '50%',
						}}
					>
						События
					</Button>
				</Box>
				<p className="restaurant__reservation-heading">Бронирования</p>
				<div className="restaurant__reservation-buttons-reserve">
					<button
						id="unconfirmed"
						onClick={showUnconfirmed}
						className={buttonUnconfirmed}
					>
						{activeButton === 'unconfirmed' && (
							<CheckIcon
								sx={{
									marginRight: '8px',
									width: '18px',
									height: '18px',
								}}
							/>
						)}
						<p className="restaurant__reservation-button-text">
							Неподтвержденные
						</p>
					</button>
					<button
						id="confirmed"
						onClick={showConfirmed}
						className={buttonConfirmed}
					>
						{activeButton === 'confirmed' && (
							<CheckIcon
								sx={{
									marginRight: '8px',
									width: '18px',
									height: '18px',
								}}
							/>
						)}
						<p className="restaurant__reservation-button-text">
							Подтвержденные
						</p>
					</button>
				</div>
				<ul className="restaurant__reservations">
					{reservations.length
						? reservations.map((item: any, index: number) => (
								<li className="restaurant__reservation" key={index}>
									<p className="restaurant__reservation-date">
										{item.date_reservation} • {item.start_time_reservation}
									</p>
									<p className="restaurant__reservation-guests">
										{item.number_guests} человека •{' '}
									</p>
									<p className="restaurant__reservation-name">
										{item.first_name}
									</p>
									<p className="restaurant__reservation-contact">
										{item.telephone}
									</p>
									<p className="restaurant__reservation-contact">
										{item.email}
									</p>
									<p className="restaurant__reservation-name">Комментарий</p>
									<p className="restaurant__reservation-contact">
										{item.comment}
									</p>
									<Box display="inline-flex" gap="8px" mt="auto" pt="10px">
										<Button
											onClick={() => handleCancelReservation(item.id)}
											variant="outlined"
											sx={{
												color: '#006C60',
												borderColor: '#006C60',
												textTransform: 'none',
												borderRadius: '8px',
												minWidth: '139px',
											}}
											disabled={isLoading}
										>
											Отменить
										</Button>
										<Button
											onClick={() => {
												handleConfirmReservation(item.id);
											}}
											variant="contained"
											sx={{
												color: 'white',
												backgroundColor: '#006C60',
												textTransform: 'none',
												borderRadius: '8px',
												minWidth: '139px',
											}}
											disabled={item.status || isLoading}
										>
											{!item.status ? 'Подтвердить' : 'Подтверждено'}
										</Button>
									</Box>
								</li>
						  ))
						: 'У вас пока нет бронирований'}
					{}
				</ul>
			</Box>
			<Footer />
		</>
	);
}

export default RestaurantReservationPage;
