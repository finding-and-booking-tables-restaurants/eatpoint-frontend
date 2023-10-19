import React from 'react';
import './RatingChart.css';

interface RatingChartData {
	oneStar: number;
	twoStar: number;
	threeStar: number;
	fourStar: number;
	fiveStar: number;
}

interface RatingChartProps {
	data: RatingChartData;
}

const RatingChart: React.FC<RatingChartProps> = ({ data }) => {
	const totalReviews =
		data.oneStar +
		data.twoStar +
		data.threeStar +
		data.fourStar +
		data.fiveStar;

	const calculatePercentage = (value: number) => {
		return (value / totalReviews) * 100;
	};

	return (
		<div className="rating-chart">
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(data.fiveStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(data.fourStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(data.threeStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(data.twoStar)}%`,
					}}
				/>
			</div>
			<div className="bar">
				<div
					className="fill"
					style={{
						backgroundColor: '#C41A68',
						width: `${calculatePercentage(data.oneStar)}%`,
					}}
				/>
			</div>
		</div>
	);
};

export default RatingChart;
