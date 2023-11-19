import { Box, Button } from '@mui/material';
import React from 'react';

import '../RestCard/RestCard.css';
import './PreloadCard.css';

const PreloadCard = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				borderRadius: '8px',
				boxShadow: '0px 4px 4px 0px rgba(73, 69, 79, 0.2)',
				position: 'relative',
				width: '328px',
				height: '365px',
			}}
			className="shimmer-effect"
		>
			<button className="card__like-btn" />
			<Box
				height="180px"
				sx={{
					borderTopLeftRadius: '8px',
					borderTopRightRadius: '8px',
				}}
			/>
			<Box
				height="180px"
				p="16px"
				display="flex"
				flexDirection={'column'}
				justifyContent={'flex-end'}
			>
				<Button
					sx={{
						textTransform: 'none',
						color: '#05887B',
						borderBlockColor: '#05887B',
						borderRadius: '8px',
						padding: '10px 24px',
					}}
					variant="outlined"
				>
					Забронировать
				</Button>
			</Box>
		</Box>
	);
};

export default PreloadCard;
