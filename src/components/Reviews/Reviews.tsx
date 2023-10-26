import React, { FC, useEffect, useState } from 'react';
import selectedIcon from '../../images/selected-icon.svg';
import './Reviews.css';
import Review from '../Review/Review';
import { ReviewType } from '../../types/Reviews';
import { pluralizeReviews } from '../../utils/pluralizeReviews';

interface ReviewsProps {
	reviews: ReviewType[];
}

const Reviews: FC<ReviewsProps> = ({ reviews }) => {
	const [isDateFilter, setIsDateFilter] = useState(true);
	const [isRatingFilter, setRatingFilter] = useState(false);
	const [displayedReviews, setDisplayedReviews] = useState(3);
	const [filteredReviews, setFilteredReviews] = useState<ReviewType[]>([]);

	function formatReviewDate(dateString: string) {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	}

	const filterByDate = () => {
		const sortedReviews = [...reviews].sort((a, b) => {
			const dateA = new Date(b.created).getTime();
			const dateB = new Date(a.created).getTime();
			return dateA - dateB;
		});
		setFilteredReviews(sortedReviews);
		setIsDateFilter(true);
		setRatingFilter(false);
	};

	const filterByRating = () => {
		const sortedReviews = [...reviews].sort((a, b) => b.score - a.score);
		setFilteredReviews(sortedReviews);
		setIsDateFilter(false);
		setRatingFilter(true);
	};

	const handleLoadMoreReviews = () => {
		setDisplayedReviews((prev) => prev + 3);
	};

	const handleFilterbyDate = () => {
		filterByDate();
	};

	const handleFilterByRating = () => {
		filterByRating();
	};

	return (
		<section className="reviews">
			<div className="reviews__heading">
				<div className="reviews__amount">
					<p>{pluralizeReviews(reviews.length)}</p>
				</div>
				<button
					onClick={handleFilterbyDate}
					className={`reviews__filter-btn ${
						isDateFilter && 'reviews__filter-btn_selected'
					}`}
				>
					{isDateFilter && <img src={selectedIcon} alt="галочка" />}
					По дате
				</button>
				<button
					onClick={handleFilterByRating}
					className={`reviews__filter-btn ${
						isRatingFilter && 'reviews__filter-btn_selected'
					}`}
				>
					{isRatingFilter && <img src={selectedIcon} alt="галочка" />}
					По рейтингу
				</button>
			</div>

			{filteredReviews.length
				? filteredReviews
						.slice(0, displayedReviews)
						.map((review, index) => (
							<Review
								key={index}
								name={review.author.first_name + ' ' + review.author.last_name}
								date={formatReviewDate(review.created)}
								text={review.text}
								rating={review.score}
							/>
						))
				: reviews
						.slice(0, displayedReviews)
						.map((review, index) => (
							<Review
								key={index}
								name={review.author.first_name + ' ' + review.author.last_name}
								date={formatReviewDate(review.created)}
								text={review.text}
								rating={review.score}
							/>
						))}

			{displayedReviews < reviews.length && (
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
