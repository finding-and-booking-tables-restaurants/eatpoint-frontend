/* eslint-disable react-hooks/rules-of-hooks */
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
import RestaurantItem from '../BusinessProfile/RestaurantItem/RestaurantItem';
import DeleteCardConfirm from '../DeleteCardConfirm/DeleteCardConfirm';

function RestaurantReservationPage() {
	const [myEstablishments, setMyEstablishments] = useState<any>({});
	const [myReservations, setMyreservations] = useState<Establishment[]>([]);
	const [reservations, setReservations] = useState<Establishment[]>([]);
	const [updatedReservation, setUpdatedReservation] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [activeButton, setActiveButton] = useState('unconfirmed');
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedEstablishment, setSelectedEstablishment] =
		useState<Establishment | null>(null);

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

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleOpenDeleteModal = (establishment: Establishment) => {
		setDeleteModalOpen(true);
		setSelectedEstablishment(establishment);
	};

	const handleCloseDeleteModal = () => {
		setSelectedEstablishment(null);
		setDeleteModalOpen(false);
	};

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

	function deleteEstablishment(establishment: Establishment | null): void {
		if (establishment && establishment.id) {
			mainApi
				.deleteMyEstablishment(establishment.id)
				.then((res) => {
					const updateEstablishments = myEstablishments.filter(
						(item: { id: number | undefined; }) => item.id !== establishment.id
					);
					setMyEstablishments(updateEstablishments);
					handleCloseDeleteModal();
				})
				.catch((error) => {
					console.log(error);
					console.log('Ушел в catch');
				});
		} else {
			console.log('Establishment or its ID is null or undefined.');
		}
	}

	return (
		<>
			<Header />
			<Box
				m="auto"
				minHeight={'calc(100vh - 156px)'}
				className="restaurant__reserve"
			>
				<div className="restaurant__reserve-box-info">
					<div>
						<p className="restaurant__reserve-title">{myEstablishments.name}</p>
					</div>
				</div>
				<div className="restaurant__reserve-group">
					{windowWidth < 900 && (
						<div className="restaurant__reserve-page">
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
					)}

					{windowWidth > 900 && (
						<div className='restaurant__item'>
						<RestaurantItem
							id={myEstablishments.id}
							// name={myEstablishments.name}
							cities={myEstablishments.cities}
							address={myEstablishments.address}
							poster={myEstablishments.poster}
							avarage_check={myEstablishments.average_check}
							rating={myEstablishments.rating}
							review_count={myEstablishments.review_count}
							establishment={myEstablishments}
							handleOpenDeleteModal={handleOpenDeleteModal}
						/>
						</div>
					)}
					<Box
						display="flex"
						flexWrap="wrap"
						justifyContent="space-between"
						gap={{ xs: '8px', sm: '8px', md: '2px', lg: '24px' }}
						mt={{ xs: 'auto', sm: 'auto', md: 0, lg: 0 }}
						pt={{ xs: '16px', sm: '16px', md: 0, lg: 0 }}
						width={{ xs: '100%', sm: '100%', md: '31.7%', lg: '328px' }}
					>
						<Button
							onClick={() => redirectToReviewPage(id!)}
							variant="outlined"
							sx={{
								color: '#006C60',
								borderColor: '#006C60',
								textTransform: 'none',
								borderRadius: '8px',
								width: { xs: '48.7%', sm: '48%', md: '100%', lg: '100%' },
								height: { md: '48px', lg: '56px' },
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
								width: { xs: '48.7%', sm: '48%', md: '100%', lg: '100%' },
								height: { md: '48px', lg: '56px' },
							}}
						>
							События
						</Button>
					</Box>
				</div>
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
				</ul>
			</Box>
			<DeleteCardConfirm
				isDeleteModalOpen={isDeleteModalOpen}
				handleCloseDeleteModal={handleCloseDeleteModal}
				deleteEstablishment={() => deleteEstablishment(selectedEstablishment)}
				selectedEstablishment={selectedEstablishment}
			/>
			<Footer />
		</>
	);
}

export default RestaurantReservationPage;
