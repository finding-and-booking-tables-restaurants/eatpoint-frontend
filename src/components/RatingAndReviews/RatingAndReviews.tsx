import React, { ReactNode, useContext, useEffect } from 'react';
import './RatingAndReviews.css';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RatingChart from '../RatingChart/RatingChart';
import Reviews from '../Reviews/Reviews';
import { ReviewType } from '../../types/Reviews';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Box } from '@mui/material';

interface RatingAndReviewsProps {
	rating: number;
	reviews: ReviewType[];
	children?: ReactNode;
	headingText: string;
}

const RatingAndReviews: React.FC<RatingAndReviewsProps> = ({
	rating,
	reviews,
	children,
	headingText,
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
		<Box
			component={'section'}
			sx={{
				p: '24px 0',
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				alignItems: { xs: 'auto', sm: 'start' },
			}}
		>
			<h2 className="rating-and-reviews__heading">{headingText}</h2>
			<Box
				display={'flex'}
				flexDirection={{ xs: 'column', sm: 'row' }}
				gap={{ xs: '16px', sm: '32px' }}
				alignItems={'center'}
				justifyContent={'space-between'}
				width={'100%'}
			>
				{children}
				<div className="rating-and-reviews__container">
					<div className="rating-container">
						<p className="rating">{rating}</p>
						<div className="stars-container">{starElements}</div>
					</div>
					<RatingChart reviews={reviews} />
				</div>
			</Box>
			<Reviews reviews={reviews} />
		</Box>
	);
};

export default RatingAndReviews;
