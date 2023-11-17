import { FC, useContext, useEffect, useState } from 'react';
import '../RestaurantPage/RestaurantPage.css';
import BookingForm from '../BookingForm/BookingForm';
import './BookingPage.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinkToYandexMap from '../LinkToYandexMap/LinkToYandexMap';
import {
	Restaurant,
	UserData,
	fetchRestaurantData,
	BookingformValues,
	inputs,
	initRestaurant,
	INVALID_DATE_OR_TIME_RESERVATION_MESSAGE,
	SERVER_ERROR_MESSAGE,
	ERROR_400,
	ERROR_403,
	NOT_CONFIRMED_NUMBER_MESSAGE,
} from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import SuccessBooking from '../SuccessBooking/SuccessBooking';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/mainApi';
import { ThemeProvider } from '@emotion/react';
import { selectTheme } from '../NumberOfPerson/NumberOfPerson';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';

interface BookingPageProps {
	id: number;
	userData?: UserData;
}

interface BookingFormValues {
	[key: string]: string;
}

const BookingPage: FC<BookingPageProps> = ({ id, userData }) => {
	const navigate = useNavigate();
	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<BookingFormValues>({
		mode: 'onChange',
	});

	const [isSuccessBooking, setIsSuccessBooking] = useState(false);
	const [errMessage, setErrMessage] = useState('');
	const [currentRestaurant, setcurrentRestaurant] =
		useState<Restaurant>(initRestaurant);
	const [isAgreement, setIsAgreement] = useState(false);
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

	const handleBooking = (data: BookingFormValues) => {
		if (!data) return;

		const mergedFormData = { ...data, ...BookingformValues };
		const additionalData = {
			number_guests: localStorage.getItem('selected-number-of-people'),
			date_reservation: localStorage.getItem('selected-date-formated'),
			start_time_reservation: localStorage.getItem('selected-time'),
		};

		const finalFormData = { ...mergedFormData, ...additionalData };
		setDataToSend(finalFormData);

		mainApi
			.bookEstablishment(id, finalFormData, isLoggedIn)
			.then((data) => {
				setIsSuccessBooking(true);
				setBookingId(data.id);
			})
			.catch((err) => {
				if (err === ERROR_400) {
					setErrMessage(INVALID_DATE_OR_TIME_RESERVATION_MESSAGE);
				} else if (err === ERROR_403) {
					setErrMessage(NOT_CONFIRMED_NUMBER_MESSAGE);
				} else {
					setErrMessage(SERVER_ERROR_MESSAGE);
				}
			})
			.finally(() => {
				setTimeout(() => setErrMessage(''), 4000);
			});
	};
	const handleBackBtnClick = () => {
		navigate(`/establishment/${id}`, { replace: true });
	};

	// .booking-page {
	// margin: auto;
	// max-width: 92%;
	// display: flex;
	// flex-direction: column;
	// align-content: center;
	// flex-wrap: wrap;

	return (
		<ThemeProvider theme={selectTheme}>
			<Box
				sx={{
					m: 'auto',
					maxWidth: { xs: '92%', sm: '700px' },
				}}
			>
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
								<LinkToYandexMap
									city={currentRestaurant.cities}
									address={currentRestaurant.address}
								/>
							</div>
						</>
						<BookingForm onSubmit={handleSubmit(handleBooking)}>
							<Box
								display="flex"
								flexWrap={'wrap'}
								rowGap={{ xs: '16px', sm: '32px' }}
								columnGap={{ xs: '16px', sm: '40px' }}
							>
								<TextField
									{...register('zone', {
										required: 'Поле обязательно для заполнения',
									})}
									id="outlined-select-currency"
									select
									name="zone"
									label="Зона"
									required
									sx={{
										minWidth: 328,
									}}
								>
									{currentRestaurant?.zones.map((option) => (
										<MenuItem key={option.id} value={option.id}>
											{option.zone}
										</MenuItem>
									))}
								</TextField>
								{inputs.map((option, index) => (
									<TextField
										{...register(`${option.id}`, option.validationConfig)}
										helperText={errors[option.id]?.message || ''}
										error={!!errors[option.id]}
										key={index}
										label={option.label}
										defaultValue={userData ? userData[option.id] : ''}
										sx={{
											minWidth: 328,
											display: `${
												isLoggedIn && option.id === 'email' && 'none'
											}`,
											'& .Mui-error': {
												color: '#EC006C',
											},
											'& .MuiOutlinedInput-root': {
												'&.Mui-error .MuiOutlinedInput-notchedOutline': {
													borderColor: '#EC006C',
												},
											},
										}}
									/>
								))}
								<p
									style={{ flexBasis: '100%' }}
									className="booking-page__comment"
								>
									Введите ваши пожелания
								</p>
								<span
									style={{
										color: '#EC006C',
										fontSize: '0.75rem',
										textAlign: 'center',
									}}
								>
									{errMessage}
								</span>
							</Box>
							<div className="checkbox-container">
								<Checkbox
									onChange={(e) => setIsAgreement(e.target.checked)}
									sx={{
										'& .MuiSvgIcon-root': { fontSize: 24, color: '#05887B' },
									}}
								/>
								<p className="checkbox-text">
									Бронируя столик, вы соглашаетесь с условиями пользовательского
									соглашения
								</p>
							</div>
							<Button
								sx={{
									backgroundColor: '#05887B',
									textTransform: 'none',
									borderRadius: '8px',
									padding: '10px 24px 10px 16px',
									mb: '24px',
								}}
								disabled={!isValid || !isAgreement}
								type="submit"
								variant="contained"
							>
								Забронировать
							</Button>
						</BookingForm>
					</>
				)}
			</Box>
		</ThemeProvider>
	);
};

export default BookingPage;
