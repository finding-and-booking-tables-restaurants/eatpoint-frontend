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
import RestData from '../../models/data/RestData';

const Recomended: React.FC<RecomendedProps> = ({ title, link, nearest }) => {
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
			<Swiper
				modules={[Navigation, A11y]}
				spaceBetween={16}
				slidesPerView={1.5}
				centeredSlides={true}
				loop={true}
				slideToClickedSlide={true}
			>
				{fakeRestaurants.map((restaurant: RestData, index: number) => (
					<SwiperSlide key={index}>
						<RestCard
							key={index}
							img={restaurant.img}
							name={restaurant.name}
							address={restaurant.address}
							rating={restaurant.rating}
							reviews={restaurant.reviews}
							search={false}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Recomended;