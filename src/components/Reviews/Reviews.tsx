import React, { useState } from 'react';
import selectedIcon from '../../images/selected-icon.svg';
import './Reviews.css';
import Review from '../Review/Review';
import fakeReviews from '../../fakeData/fakeReviews';

const Reviews = () => {
	const [isDateFilter, setIsDateFilter] = useState(true);
	const [isRatingFilter, setRatingFilter] = useState(false);
	const [displayedReviews, setDisplayedReviews] = useState(3);
	const [filteredReviews, setFilteredReviews] = useState(fakeReviews);

	const filterByDate = () => {
		const sortedReviews = [...fakeReviews].sort((a, b) => {
			const dateA = new Date(b.date.split('.').reverse().join('-')).getTime();
			const dateB = new Date(a.date.split('.').reverse().join('-')).getTime();
			return dateA - dateB;
		});
		setFilteredReviews(sortedReviews);
		setIsDateFilter(true);
		setRatingFilter(false);
	};

	const filterByRating = () => {
		const sortedReviews = [...fakeReviews].sort((a, b) => b.rating - a.rating);
		setFilteredReviews(sortedReviews);
		setIsDateFilter(false);
		setRatingFilter(true);
	};

	const handleLoadMoreReviews = () => {
		setDisplayedReviews((prev) => prev + 3);
	};

	return (
		<section className="reviews">
			<div className="reviews__heading">
				<div className="reviews__amount">
					<p>{fakeReviews.length}</p>
					<p>отзывов</p>
				</div>
				<button
					onClick={filterByDate}
					className={`reviews__filter-btn ${
						isDateFilter && 'reviews__filter-btn_selected'
					}`}
				>
					{isDateFilter && <img src={selectedIcon} alt="галочка" />}
					По дате
				</button>
				<button
					onClick={filterByRating}
					className={`reviews__filter-btn ${
						isRatingFilter && 'reviews__filter-btn_selected'
					}`}
				>
					{isRatingFilter && <img src={selectedIcon} alt="галочка" />}
					По рейтингу
				</button>
			</div>

			{filteredReviews.slice(0, displayedReviews).map((review, index) => (
				<Review
					key={index}
					name={review.name}
					date={review.date}
					text={review.text}
					rating={review.rating}
				/>
			))}

			{displayedReviews < filteredReviews.length && (
				<button
					onClick={handleLoadMoreReviews}
					className="reviews__load-reviews-btn"
				>
					Загрузить ещё
				</button>
			)}
		</section>
	);
};

export default Reviews;
