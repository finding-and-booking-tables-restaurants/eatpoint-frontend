import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import RestCard from '../RestCard/RestCard';
import fakeRestaurants from '../../fakeData/fakeRestData';
import map from '../../images/map-icon.svg';

import './Recomended.css';
import { Link } from 'react-router-dom';
import RecomendedProps from '../../models/propsInterfaces/RecomendedProps';
import { Restaurant } from '../../utils/constants';
import { formatRating } from '../../utils/formatRating';

const Recomended: React.FC<RecomendedProps> = ({
	title,
	link,
	nearest,
	establishments,
}) => {
	return (
		<section
			className={`recomended ${
				nearest ? 'recomended_type_nearest' : 'recomended_type_default'
			}`}
		>
			<div className="recomended__heading">
				<h2 className="recomended__title">{title}</h2>
				<Link className="recomended__button" to="/all-places">
					{nearest && <img src={map} alt="карта" />}
					<p>{link}</p>
				</Link>
			</div>
			<div className="recomended__cards-container">
				{establishments
					.slice(0, 10)
					.map((restaurant: Restaurant, index: number) => (
						<RestCard
							key={index}
							img={restaurant.poster}
							name={restaurant.name}
							address={restaurant.address}
							rating={formatRating(restaurant.rating)}
							reviews={restaurant.review_count}
							search={true}
							id={restaurant.id}
							average_check={restaurant.average_check}
						/>
					))}
			</div>
		</section>
	);
};

export default Recomended;
