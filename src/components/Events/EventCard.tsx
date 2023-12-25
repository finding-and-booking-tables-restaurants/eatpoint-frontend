import { Box, Button, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface EventCardProps {
	eventPoster: string;
	eventName: string;
	eventOwner: string;
	eventAddress: string;
	eventType: string;
	eventDate: string;
	eventTime: string;
	eventPrice: number;
	eventId: number;
}

const EventCard: FC<EventCardProps> = ({
	eventAddress,
	eventDate,
	eventName,
	eventOwner,
	eventPoster,
	eventPrice,
	eventTime,
	eventType,
	eventId,
}) => {
	return (
		<Box
			sx={{
				borderRadius: '8px',
				backgroundColor: '#FFFDF5',
				boxShadow: '0px 4px 4px 0px rgba(73, 69, 79, 0.20)',
				maxWidth: '328px',
				maxHeight: '378px',
			}}
		>
			<img
				style={{
					height: '180px',
					width: '328px',
					objectFit: 'cover',
					borderTopLeftRadius: '8px',
					borderTopRightRadius: '8px',
				}}
				src={eventPoster}
				alt="постер события"
			/>
			<Box display="flex" p="16px 16px 32px 16px" flexDirection="column">
				<Typography fontSize="20px" fontWeight="500">
					{eventName}
				</Typography>
				<Typography fontSize="14px">
					{eventOwner}, {eventAddress}
				</Typography>
				<Typography fontSize="14px">{eventType}</Typography>
				<Box
					display="flex"
					flexDirection="row"
					justifyContent="space-between"
					m="8px 0 16px 0"
				>
					<Typography fontSize="14px">
						{eventDate}, {eventTime}
					</Typography>
					<Typography fontSize="14px" fontWeight={500}>
						{eventPrice} ₽
					</Typography>
				</Box>
				<Stack spacing={'8px'} direction={'row'}>
					<Button
						variant="outlined"
						sx={{
							color: '#05887B',
							borderColor: '#05887B',
							textTransform: 'none',
							width: '144px',
							borderRadius: '8px',
						}}
					>
						Узнать больше
					</Button>
					<Button
						variant="outlined"
						sx={{
							color: '#05887B',
							borderColor: '#05887B',
							textTransform: 'none',
							width: '144px',
							borderRadius: '8px',
						}}
					>
						Все события
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};

export default EventCard;
