import React from 'react';
import './Review.css';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

interface ReviewProps {
	name: string;
	date: string;
	text: string;
	rating: number;
}

const Review: React.FC<ReviewProps> = ({ name, date, text, rating }) => {
	const location = useLocation();

	return (
		<div className="review">
			<p className="review__name">{name}</p>
			<p className="review__date">{date}</p>
			<p className="review__text">{text}</p>
			<p className="review__rating">{rating}</p>
			{location.pathname.includes('restaurant-reviews') && (
				<Button
					// onClick={openAddReviewModal}
					startIcon={<ModeEditOutlineOutlinedIcon />}
					variant="outlined"
					sx={{
						mt: '11px',
						mb: '4px',
						color: '#006C60',
						border: '1px solid #006C60',
						borderRadius: '100px',
						textTransform: 'none',
					}}
				>
					Ответить на отзыв
				</Button>
			)}
		</div>
	);
};

export default Review;
