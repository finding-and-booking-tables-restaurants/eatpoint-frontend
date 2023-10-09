import React from 'react';
import './Review.css';

interface ReviewProps {
	name: string;
	date: string;
	text: string;
	rating: number;
}

const Review: React.FC<ReviewProps> = ({ name, date, text, rating }) => {
	return (
		<div className="review">
			<p className="review__name">{name}</p>
			<p className="review__date">{date}</p>
			<p className="review__text">{text}</p>
			<p className="review__rating">{rating}</p>
		</div>
	);
};

export default Review;
