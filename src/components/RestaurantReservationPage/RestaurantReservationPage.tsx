import './RestaurantReservationPage.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RatingIcon from '../../images/star-icon.svg';
import ReviewsIcon from '../../images/message-icon.svg';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Establishment } from '../../types/getMyRestaurantTypes';
import { useEffect, useState } from 'react';
import { mainApi } from '../../utils/mainApi';
import { RestaurantData } from '../../types/addRestaurantTypes';
import { Box, Button } from '@mui/material';
import { maxWidthBoxConfig, minWidthBoxConfig } from '../../utils/constants';

// interface RestaurantReservationPageProps {
// 	id?: number;
// 	name: string;
// 	cities: string;
// 	address: string;
// 	poster: string;
// 	avarage_check: string;
// 	rating: number | undefined;
// 	review_count: number | undefined;
// 	establishment: Establishment;
// 	handleOpenDeleteModal?: () => void;
// }

function RestaurantReservationPage() {
	const [myEstablishments, setMyEstablishments] = useState<any>({});
	const [myReservations, setMyreservations] = useState<any>([]);
	const [updatedReservation, setUpdatedReservation] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		mainApi.getAllMyEstablishments().then((res) => {
			const restaurant = res.results.find((el: any) => el.id === Number(id));
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
	};

	return (
		<>
			<Header />
			<Box
				maxWidth={maxWidthBoxConfig}
				minWidth={minWidthBoxConfig}
				m="auto"
				className="restaurant__reserve"
			>
				<div className="restaurant__reserve-page">
					<div className="restaurant__reserve-box-info">
						<div>
							<p className="restaurant__reserve-title">
								{myEstablishments.name}
							</p>
						</div>
						{/* <Link
						to={`edit-restaurant/${id}`}
						state={myEstablishments.establishment}
						className="restaurant__editBtn"
					/> */}
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
							className="restaurant__delete-btn"
							// onClick={handleOpenDeleteModal}
						></button>
					</div>
					<p className="restaurant__place">{`${myEstablishments.cities}, ${myEstablishments.address}`}</p>
				</div>
				<p className="restaurant__rweservation-heading">Бронирования</p>
				<ul className="restaurant__reservations">
					{myReservations.map((item: any, index: number) => (
						<li className="restaurant__reservation" key={index}>
							<p className="restaurant__reservation-date">
								{item.date_reservation} • {item.start_time_reservation}
							</p>
							<p className="restaurant__reservation-guests">
								{item.number_guests} человека •{' '}
							</p>
							<p className="restaurant__reservation-name">{item.first_name}</p>
							<p className="restaurant__reservation-contact">
								{item.telephone}
							</p>
							<p className="restaurant__reservation-contact">{item.email}</p>
							<p className="restaurant__reservation-name">Комментарий</p>
							<p className="restaurant__reservation-contact">{item.comment}</p>
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
					))}
				</ul>
			</Box>
			<Footer />
		</>
	);
}

export default RestaurantReservationPage;
