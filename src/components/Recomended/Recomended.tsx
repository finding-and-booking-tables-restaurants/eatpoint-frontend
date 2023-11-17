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
import { Box } from '@mui/material';
import PreloadCard from '../PreloadCard/PreloadCard';

const Recomended: React.FC<RecomendedProps> = ({
	title,
	link,
	nearest,
	establishments,
}) => {
	return (
		<Box
			maxWidth={{ xs: '360px', sm: '725px', md: '1068px' }}
			component="section"
			className={`recomended ${
				nearest ? 'recomended_type_nearest' : 'recomended_type_default'
			}`}
		>
			<Box m="26px auto 16px 20px">
				<h2 className="recomended__title">{title}</h2>
				{/* <Link className="recomended__button" to="/all-places">
						{nearest && <img src={map} alt="карта" />}
						<p>{link}</p>
					</Link> */}
			</Box>
			<Box
				m="auto auto 20px auto"
				sx={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					alignItems: 'start',
					justifyContent: 'center',
					gap: { xs: '16px', sm: '32px', md: '24px' },
				}}
			>
				{establishments.length
					? establishments
							.slice(0, 9)
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
							))
					: Array.from({ length: 9 }, (_, index) => (
							<PreloadCard key={index} />
					  ))}
			</Box>
		</Box>
	);
};

export default Recomended;
