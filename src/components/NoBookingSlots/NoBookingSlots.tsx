import { Box, Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoBookingSlots = () => {
	const navigate = useNavigate();

	return (
		<Box minHeight="calc(100vh - 312px)">
			<Box display="inline-flex" gap="8px">
				<Typography>Мест нет</Typography>
				<ClearIcon sx={{ color: '#C41A68' }} />
			</Box>
			<Typography fontSize="14px" sx={{ m: '14px 0 35.5vh 0' }}>
				К сожалению, на данный момент все столики забронированы в этом
				заведении, просим вас попробовать забронировать столик позднее
			</Typography>
			<Button
				variant="outlined"
				onClick={() => navigate('/')}
				sx={{
					borderColor: '#006C60',
					color: '#006C60',
					textTransform: 'none',
					minWidth: '328px',
					mb: '36px',
					borderRadius: '8px',
				}}
			>
				Назад
			</Button>
		</Box>
	);
};

export default NoBookingSlots;
