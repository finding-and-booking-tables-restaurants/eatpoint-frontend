import React, { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RatingAndReviews from '../RatingAndReviews/RatingAndReviews';
import {
	Restaurant,
	initRestaurant,
	maxWidthBoxConfig,
	minWidthBoxConfig,
} from '../../utils/constants';
import { mainApi } from '../../utils/mainApi';
import { ReviewType } from '../../types/Reviews';
import { Box } from '@mui/material';

interface RestaurantReviewsProps {
	id: number;
}

const RestaurantReviews: FC<RestaurantReviewsProps> = ({ id }) => {
	const [currentRestarant, setCurrentRestaurant] =
		useState<Restaurant>(initRestaurant);
	const [currentRestarantReviews, setCurrentRestaurantReviews] = useState<
		ReviewType[]
	>([]);

	useEffect(() => {
		mainApi
			.getEstablissmentData(id)
			.then((restaurant) => setCurrentRestaurant(restaurant));
		mainApi
			.getEstablishmentsReviews(id)
			.then((reviews) => setCurrentRestaurantReviews(reviews));
	}, []);

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
		>
			<Header />
			<Box
				minWidth={maxWidthBoxConfig}
				maxWidth={minWidthBoxConfig}
				m={'auto auto'}
			>
				<RatingAndReviews
					headingText={`Отзывы на ${currentRestarant.name}`}
					rating={currentRestarant.rating || 0}
					reviews={currentRestarantReviews}
				/>
			</Box>
			<Footer />
		</div>
	);
};

export default RestaurantReviews;
