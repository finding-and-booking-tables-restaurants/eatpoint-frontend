import React, { useState } from 'react';
import './AddReview.css';
import AddReviewForm from './AddReviewForm/AddReviewForm';
import { Button, Rating, TextField } from '@mui/material';
import usersApi from '../../utils/UsersApi';

interface AddReviewProps {
	isOpen: boolean;
	onClose: () => void;
	restaurantId: number | undefined;
	restaurantName: string | undefined;
	restaurantAddress: string | undefined;
}

const AddReview: React.FC<AddReviewProps> = ({
	isOpen,
	onClose,
	restaurantId,
	restaurantName,
	restaurantAddress,
}) => {
	const [ratingValue, setRatingValue] = useState(0);
	const [review, setReview] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isReviewSended, setIsReviewSended] = useState(false);

	const buttonStyles = {
		borderRadius: '100px',
		border: '1px solid #006C60',
		fontSize: '14px',
		lineHeight: '20px',
		fontWeight: '500',
		padding: '10px 24px',
		height: '40px',
		width: '160px',
		textTransform: 'none',
	};

	const handleCloseModal = () => {
		onClose();
		setReview('');
		setRatingValue(0);
		setIsReviewSended(false);
	};

	const handleSubmitReview = () => {
		setIsLoading(true);
		if (restaurantId) {
			usersApi
				.sendReview(restaurantId, review, ratingValue)
				.then(() => setIsReviewSended(true))
				.catch((err) => console.log(err))
				.finally(() => setIsLoading(false));
		}
	};

	return (
		<div className={`add-review ${isOpen ? 'add-review_open' : ''}`}>
			<div className="add-review__header">
				<button className="add-review__back" onClick={handleCloseModal} />
				<h2 className="add-review__title">Написать отзыв</h2>
			</div>
			<div className="add-review__establishment-info">
				<p className="add-review__establishment">{restaurantName}</p>
				<p className="add-review__establishment-geo">{restaurantAddress}</p>
			</div>
			<AddReviewForm onSubmit={handleSubmitReview}>
				<Rating
					name="score"
					value={ratingValue}
					onChange={(event, newValue) => {
						if (newValue !== null) {
							setRatingValue(newValue);
						}
					}}
					disabled={isReviewSended}
					size="large"
					sx={{ fontSize: 48, color: '#C41A68', margin: '0 auto' }}
				/>
				{!isReviewSended ? (
					<>
						<p className="add-review-form__text">
							Оставьте ваш отзыв о заведении. Ресторатор сможет ответить вам.
						</p>
						<TextField
							name="review-text"
							id="outlined-textarea"
							placeholder="Введите свой отзыв"
							multiline
							rows={7}
							value={review}
							onChange={(event) => setReview(event.target.value)}
							InputProps={{
								style: {
									marginTop: '16px',
									width: '100%',
									fontSize: '14px',
									color: '#49454F',
									lineHeight: '20px',
									backgroundColor: '#FDFAF2',
									border: 'none',
								},
							}}
						/>
					</>
				) : (
					<>
						<div className="add-review__sended-container">
							<p className="add-review__sended-title">Текст отзыва</p>
							<p className="add-review__sended-review">{review}</p>
						</div>
						<p className="add-review__success">Отзыв сохранен.</p>
					</>
				)}
			</AddReviewForm>
			<div className="add-review__btns">
				{!isReviewSended ? (
					<>
						<Button
							onClick={handleCloseModal}
							variant="outlined"
							sx={{
								color: '#05887B',
								'&:focus': {
									borderColor: '#05887B',
								},
								...buttonStyles,
							}}
						>
							Отменить
						</Button>
						<Button
							type="submit"
							form="sendReview"
							variant="contained"
							disabled={ratingValue === 0 || review.length < 1 || isLoading}
							sx={{
								background: '#05887B',
								'&:focus': {
									backgroundColor: '#05887B',
								},
								...buttonStyles,
							}}
						>
							Опубликовать
						</Button>
					</>
				) : (
					<Button
						onClick={handleCloseModal}
						variant="contained"
						sx={{
							background: '#05887B',

							'&:focus': {
								borderColor: '#05887B',
							},
							...buttonStyles,
							width: '100%',
							margin: '0 15px',
						}}
					>
						Закрыть
					</Button>
				)}
			</div>
		</div>
	);
};

export default AddReview;
