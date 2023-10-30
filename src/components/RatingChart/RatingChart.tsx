import React from 'react';
import './RatingChart.css';
import { ReviewType } from '../../types/Reviews';

interface RatingChartProps {
	reviews: ReviewType[];
}

const RatingChart: React.FC<RatingChartProps> = ({ reviews }) => {
	const totalReviews = reviews.length ? reviews.length : 10;

	const calculatePercentage = (value: number) => {
		return (value / totalReviews) * 100;
	};

	const countRatings = {
		oneStar: reviews.filter((review) => review.score === 1).length,
		twoStar: reviews.filter((review) => review.score === 2).length,
		threeStar: reviews.filter((review) => review.score === 3).length,
		fourStar: reviews.filter((review) => review.score === 4).length,
		fiveStar: reviews.filter((review) => review.score === 5).length,
	};

	return (
		<div className="rating-chart">
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(countRatings.fiveStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(countRatings.fourStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(countRatings.threeStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(countRatings.twoStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(countRatings.oneStar)}%`,
					}}
				/>
			</div>
		</div>
	);
};

export default RatingChart;
