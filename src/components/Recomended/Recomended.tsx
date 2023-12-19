import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import RestCard from '../RestCard/RestCard';
import fakeRestaurants from '../../fakeData/fakeRestData';
import map from '../../images/map-icon.svg';
import { useLocation } from 'react-router-dom';

import './Recomended.css';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../utils/constants';
import RecomendedProps from '../../models/propsInterfaces/RecomendedProps';
import { formatRating } from '../../utils/formatRating';
import { Box } from '@mui/material';
import { getLocation } from '../../utils/getCityByLocation';
import PreloadCard from '../PreloadCard/PreloadCard';
import { mainApi } from '../../utils/mainApi';

const Recomended: React.FC<RecomendedProps> = ({
	title,
	link,
	nearest,
	establishments,
}) => {
	const [data, setData] = useState<Restaurant[]>([]);
	const userCity = localStorage.getItem('city') || 'Москва';

	useEffect(() => {
		async function fetchData() {
			try {
				const coordinates = await getLocation();

				const { latitude, longitude } = coordinates;
				const location = `${latitude},${longitude}`;

				const response = await fetch(
					`https://eatpoint.site/api/v1/establishments/?location=${location}`
				);

				const result = await response.json();

				if (result.results && result.results.length > 0) {
					setData(result.results);
				} else {
					throw new Error('По предоставленным координатам нет заведений');
				}
			} catch (error) {
				console.error(
					'Произошла ошибка в fetchData:',
					(error as Error).message
				);

				const query = '';
				const pageSize = 9;

				const establishmentsResponse =
					await mainApi.getEstablishmentsBySearchQuery(
						query,
						pageSize,
						userCity
					);

				setData(establishmentsResponse.results);
			}
		}

		fetchData();
	}, []);

	const sortedEstablishments = establishments
		.slice()
		.sort((a: Restaurant, b: Restaurant) => b.rating - a.rating);

	const completeDataArray = (
		data: Restaurant[],
		sortedEstablishments: Restaurant[]
	): Restaurant[] => {
		const remainingCount = 9 - data.length;

		if (remainingCount > 0) {
			const additionalRestaraunts = sortedEstablishments.slice(
				0,
				remainingCount
			);
			return [...data, ...additionalRestaraunts];
		}

		return data;
	};

	const updateDataArray = completeDataArray(data, sortedEstablishments);

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
				{updateDataArray.length
					? updateDataArray.map((restaurant: Restaurant, index: number) => (
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
