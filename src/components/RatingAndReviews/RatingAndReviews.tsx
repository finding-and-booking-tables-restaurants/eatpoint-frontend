import React, { useEffect } from 'react';
import './RatingAndReviews.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RatingChart from '../RatingChart/RatingChart';
import Reviews from '../Reviews/Reviews';
import { ReviewType } from '../../types/Reviews';
import Button from '@mui/material/Button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface RatingAndReviewsProps {
	rating: number;
	reviews: ReviewType[];
}

const RatingAndReviews: React.FC<RatingAndReviewsProps> = ({
	rating,
	reviews,
}) => {
	const maxStars = 5;
	const filledStars = Math.floor(rating);
	const hasHalfStar = rating - filledStars >= 0.5;

	const starElements = Array.from({ length: maxStars }).map((_, i) => {
		if (i < filledStars) {
			return <StarIcon key={i} className="rating__star" />;
		} else if (i === filledStars && hasHalfStar) {
			return <StarHalfIcon key={i} className="rating__star" />;
		} else {
			return <StarBorderIcon key={i} className="rating__star" />;
		}
	});

	return (
		<section className="rating-and-reviews">
			<h2 className="rating-and-reviews__heading">Рейтинг и отзывы</h2>
			{/* <button className="rating-and-reviews__review-btn">
				Оставить свой отзыв
			</button> */}
			<Button
				startIcon={<ModeEditOutlineOutlinedIcon />}
				variant="outlined"
				sx={{
					color: '#006C60',
					border: '1px solid #006C60',
					borderRadius: '100px',
					textTransform: 'none',
				}}
			>
				Оставить свой отзыв
			</Button>
			<div className="rating-and-reviews__container">
				<div className="rating-container">
					<p className="rating">{rating}</p>
					<div className="stars-container">{starElements}</div>
				</div>
				<RatingChart reviews={reviews} />
			</div>
			<Reviews reviews={reviews} />
		</section>
	);
};

export default RatingAndReviews;
