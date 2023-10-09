import React from 'react';
import './RatingAndReviews.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RatingChart from '../RatingChart/RatingChart';
import Reviews from '../Reviews/Reviews';

interface RatingAndReviewsProps {
	rating: number;
}

const fakeReviewsData = {
	oneStar: 12,
	twoStar: 25,
	threeStar: 40,
	fourStar: 80,
	fiveStar: 120,
};

const RatingAndReviews: React.FC<RatingAndReviewsProps> = ({ rating }) => {
	const maxStars = 5;
	const filledStars = Math.floor(rating);
	const hasHalfStar = rating - filledStars >= 0.5;

	const starElements = [];

	for (let i = 0; i < maxStars; i++) {
		if (i < filledStars) {
			starElements.push(<StarIcon key={i} className="rating__star" />);
		} else if (i === filledStars && hasHalfStar) {
			starElements.push(<StarHalfIcon key={i} className="rating__star" />);
		} else {
			starElements.push(<StarBorderIcon key={i} className="rating__star" />);
		}
	}

	return (
		<section className="rating-and-reviews">
			<h2 className="rating-and-reviews__heading">Рейтинг и отзывы</h2>
			<button className="rating-and-reviews__review-btn">
				Оставить свой отзыв
			</button>
			<div className="rating-and-reviews__container">
				<div className="rating-container">
					<p className="rating">{rating}</p>
					<div className="stars-container">{starElements}</div>
				</div>
				<RatingChart data={fakeReviewsData} />
			</div>
			<Reviews />
		</section>
	);
};

export default RatingAndReviews;
