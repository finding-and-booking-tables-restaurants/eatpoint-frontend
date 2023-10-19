import React, { FC, useEffect, useState } from 'react';
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
	Restaurant,
	fetchRestaurantData,
	formValues,
	inputs,
} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import SuccessBooking from '../SuccessBooking/SuccessBooking';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface BookingPageProps {
	id: number;
}

const BookingPage: FC<BookingPageProps> = ({ id }) => {
	const navigate = useNavigate();

	const [isSuccessBooking, setIsSuccessBooking] = useState(false);
	const [currentRestaurant, setcurrentRestaurant] = useState<Restaurant>();
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

		return fetch(
			`http://80.87.109.70/api/v1/establishments/${id}/reservations/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(mergedFormData),
			}
		)
			.then((res) => {
				if (res.ok) {
					console.log('success');
					setIsSuccessBooking(true);
				}
			})
			.catch((err) => console.log(err));
	};
	const handleBackBtnClick = () => {
		navigate(`/establishment/${id}`, { replace: true });
	};

	return (
		<div className="booking-page">
			{isSuccessBooking ? (
				<SuccessBooking
					unBook={() => {
						setIsSuccessBooking(false);
					}}
					restName={currentRestaurant?.name}
					adress={currentRestaurant?.address}
					date={dataToSend.date_reservation}
					time={dataToSend.start_time_reservation}
					numOfPeople={dataToSend.number_guests}
					id={currentRestaurant?.id}
				/>
			) : (
				<>
					<Header />
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
								+{currentRestaurant?.telephone}
							</p>
						</div>
						<div className="restaurant-page__map-icon">
							<MapOutlinedIcon fontSize="medium" style={{ color: '#05887B' }} />
						</div>
					</div>
					<BookingForm onSubmit={handleSubmit}>
						<TextField
							id="outlined-select-currency"
							select
							name="zone"
							label="Зона"
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
								name={option.id}
								key={index}
								id="outlined-select-currency"
								label={option.label}
								sx={{
									backgroundColor: '#FCF8EA',
									maxWidth: 328,
								}}
							/>
						))}
						<p className="booking-page__comment">
							Сообщите нам о ваших пожеланиях
						</p>
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
					<Footer />
				</>
			)}
		</div>
	);
};

export default BookingPage;