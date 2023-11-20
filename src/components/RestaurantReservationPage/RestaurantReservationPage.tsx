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

	const { id } = useParams();

	useEffect(() => {
		mainApi.getAllMyEstablishments().then((res) => {
			console.log(res.results);
			const restaurant = res.results.find((el: any) => el.id === Number(id));
			console.log(restaurant);
			setMyEstablishments(restaurant);
		});
		mainApi.getAllBusinessReservation().then((res) => {
			setMyreservations(res.results);
		});
	}, [id]);

	console.log(myEstablishments);
    console.log(myReservations);

	return (
		<>
			<Header />
            <div className='restaurant__reserve'>
			<div className="restaurant__reserve-page">
				<div className="restaurant__reserve-box-info">
					<div>
						<p className="restaurant__reserve-title">{myEstablishments.name}</p>
					</div>
					{/* <Link
						to={`edit-restaurant/${id}`}
						state={myEstablishments.establishment}
						className="restaurant__editBtn"
					/> */}
				</div>
				<div className="restaurant__box-addition-info">
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
			<p className='restaurant__rweservation-heading'>Бронирования</p>
			<ul className="restaurant__reservations">
				{myReservations.map((item: any, index: number) => (
					<li className='restaurant__reservation' key={index}>
						<p className='restaurant__reservation-date'>
							{item.date_reservation} • {item.start_time_reservation}
						</p>
						<p className='restaurant__reservation-guests'>{item.number_guests} человека • </p>
                        <p className='restaurant__reservation-name'>{item.first_name}</p>
						<p className='restaurant__reservation-contact'>{item.telephone}</p>
						<p className='restaurant__reservation-contact'>{item.email}</p>
						<p className='restaurant__reservation-name'>Коимментарий</p>
						<p className='restaurant__reservation-contact'>{item.comment}</p>
					</li>
				))}
			</ul>
            </div>
			<Footer />
		</>
	);
}

export default RestaurantReservationPage;
