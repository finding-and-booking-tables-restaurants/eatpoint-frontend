import React, { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RatingAndReviews from '../RatingAndReviews/RatingAndReviews';
import { Restaurant, initRestaurant } from '../../utils/constants';
import { mainApi } from '../../utils/mainApi';
import { ReviewType } from '../../types/Reviews';

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
			<RatingAndReviews
				headingText={`Отзывы на ${currentRestarant.name}`}
				rating={currentRestarant.rating || 0}
				reviews={currentRestarantReviews}
			/>
			<Footer />
		</div>
	);
};

export default RestaurantReviews;
