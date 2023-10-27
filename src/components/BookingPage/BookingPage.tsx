import React, { FC, useContext, useEffect, useState } from 'react';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import '../RestaurantPage/RestaurantPage.css';
import BookingForm from '../BookingForm/BookingForm';
import './BookingPage.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TodayIcon from '@mui/icons-material/Today';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	API_URL,
	Restaurant,
	UserData,
	fetchRestaurantData,
	formValues,
	inputs,
} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import SuccessBooking from '../SuccessBooking/SuccessBooking';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';

interface BookingPageProps {
	id: number;
	userData?: UserData;
}

const BookingPage: FC<BookingPageProps> = ({ id, userData }) => {
	const navigate = useNavigate();
	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;

	const [isSuccessBooking, setIsSuccessBooking] = useState(false);
	const [currentRestaurant, setcurrentRestaurant] = useState<Restaurant>();
	const [bookingId, setBookingId] = useState('');
	const [dataToSend, setDataToSend] = useState({
		comment: '',
		date_reservation: '',
		email: '',
		first_name: '',
		number_guests: '',
		reminder_half_on_hour: '',
		reminder_one_day: '',
		reminder_three_hours: '',
		start_time_reservation: '',
		telephone: '',
		zone: '',
	});

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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const formDataObject: { [key: string]: any } = {};
		formData.forEach((value, key) => {
			formDataObject[key] = value;
		});

		const mergedFormData = { ...formDataObject, ...formValues };
		mergedFormData.zone = Number(mergedFormData.zone);
		mergedFormData.number_guests = Number(mergedFormData.number_guests);
		setDataToSend(mergedFormData);

		return fetch(`${API_URL}/api/v1/establishments/${id}/reservations/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + localStorage.getItem('access-token'),
			},
			body: JSON.stringify(mergedFormData),
		})
			.then((res) => {
				if (res.ok) {
					console.log('success');
					setIsSuccessBooking(true);
					return res.json();
				}
			})
			.then((data) => setBookingId(data.id))
			.catch((err) => console.log(err));
	};
	const handleBackBtnClick = () => {
		navigate(`/establishment/${id}`, { replace: true });
	};

	return (
		<div className="booking-page">
			{isSuccessBooking ? (
				<SuccessBooking
					bookingId={bookingId}
					unBook={() => {
						setIsSuccessBooking(false);
					}}
					restName={currentRestaurant?.name}
					adress={currentRestaurant?.address}
					date={dataToSend.date_reservation}
					time={dataToSend.start_time_reservation}
					numOfPeople={Number(dataToSend.number_guests)}
					id={currentRestaurant?.id}
				/>
			) : (
				<>
					<div className="booking-page__heading">
						<button
							className="booking-page__back-btn"
							onClick={handleBackBtnClick}
						>
							{<ArrowBackIcon />}
						</button>
						<h1 className="booking-page__title">Бронирование</h1>
					</div>
					<div className="restaurant-page__address-container restaurant-page__address-container-booking">
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
					<BookingForm booking onSubmit={handleSubmit}>
						<TextField
							id="outlined-select-currency"
							select
							name="zone"
							label="Зона"
							required
							sx={{
								backgroundColor: '#FCF8EA',
								maxWidth: 328,
							}}
						>
							{currentRestaurant?.zones.map((option) => (
								<MenuItem
									key={option.id}
									value={option.id}
									sx={{
										background: '#FCF8EA',
									}}
								>
									{option.zone}
								</MenuItem>
							))}
						</TextField>
						{inputs.map((option, index) => (
							<TextField
								required={option.required}
								type={option.type}
								inputProps={{ max: option.maxLength }}
								name={option.id}
								key={index}
								label={option.label}
								defaultValue={userData ? userData[option.id] : ''}
								sx={{
									backgroundColor: '#FCF8EA',
									maxWidth: 328,
									display: `${isLoggedIn && option.id === 'email' && 'none'}`,
								}}
							/>
						))}
						<p className="booking-page__comment">Введите ваши пожелания</p>
						<div className="checkbox-container">
							<Checkbox
								required
								sx={{
									'& .MuiSvgIcon-root': { fontSize: 24, color: '#05887B' },
								}}
							/>
							<p className="checkbox-text">
								Бронируя столик, вы соглашаетесь с условиями пользовательского
								соглашения
							</p>
						</div>
						<button type="submit" className="search-form__btn">
							{<TodayIcon />} Забронировать
						</button>
					</BookingForm>
				</>
			)}
		</div>
	);
};

export default BookingPage;
