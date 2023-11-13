import { Container, Typography, TextField, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const ResetPassword: React.FC = () => {
	const [isConfirm, setIsConfirm] = useState(true);
	const [isReset, setIsReset] = useState(false);

	return (
		<>
			<Header />
			<Container
				sx={{
					height: 'calc(100vh - 56px - 112px)',
				}}
			>
				<Typography
					variant="h1"
					component="h1"
					sx={{
						fontFamily: 'Ubuntu',
						fontSize: '26px',
						fontStyle: 'normal',
						fontWeight: '400',
						lineHeight: '32px',
						mt: 2,
					}}
				>
					Забыли пароль
				</Typography>
				<Typography
					variant="body2"
					component="p"
					sx={{
						fontFamily: 'Roboto',
						fontSize: '16px',
						fontStyle: 'normal',
						fontWeight: 400,
						lineHeight: 1.5,
						letterSpacing: '0.5px',
						mt: 2,
						mb: 2,
					}}
				>
					{isConfirm
						? 'Введите адрес электронной почты и мы вышлем вам инструкцию для смены пароля'
						: 'Придумайте ваш новый пароль. Текст с правилами пароля (длина, символы)'}
				</Typography>
				<Box component="form">
					{isConfirm ? (
						<TextField
							name="email"
							type="email"
							placeholder="Эл. почта"
							variant="outlined"
							required
							// fullWidth
							inputProps={{
								style: {
									fontFamily: 'Roboto',
									fontSize: '16px',
									lineHeight: 1.5,
									letterSpacing: '0.5px',
									fontStyle: 'normal',
									fontWeight: 400,
									padding: '8px 16px',
								},
							}}
							sx={{
								backgroundColor: '#FDFAF2',
								borderRadius: '8px',
								width: '100%',
								height: '40px',
								boxSizing: 'border-box',
								mb: 2,
							}}
						/>
					) : (
						<>
							<TextField
								name="password"
								type="password"
								placeholder="Пароль"
								variant="outlined"
								required
								// fullWidth
								inputProps={{
									style: {
										fontFamily: 'Roboto',
										fontSize: '16px',
										lineHeight: 1.5,
										letterSpacing: '0.5px',
										fontStyle: 'normal',
										fontWeight: 400,
										padding: '8px 16px',
									},
								}}
								sx={{
									backgroundColor: '#FDFAF2',
									borderRadius: '8px',
									width: '100%',
									height: '40px',
									boxSizing: 'border-box',
									mb: 2,
									border: 'none',
								}}
							/>
							<TextField
								name="double"
								type="password"
								placeholder="Пароль повторно"
								variant="outlined"
								required
								// fullWidth
								inputProps={{
									style: {
										fontFamily: 'Roboto',
										fontSize: '16px',
										lineHeight: 1.5,
										letterSpacing: '0.5px',
										fontStyle: 'normal',
										fontWeight: 400,
										padding: '8px 16px',
									},
								}}
								sx={{
									backgroundColor: '#FDFAF2',
									borderRadius: '8px',
									width: '100%',
									height: '40px',
									boxSizing: 'border-box',
									mb: 2,
								}}
							/>
						</>
					)}
					<Button
						variant="contained"
						type="submit"
						sx={{
							width: '100%',
							height: '40px',
							alignItems: 'center',
							borderRadius: '100px',
							backgroundColor: '#05887B',
							textTransform: 'none',
							padding: '10px 24px',
						}}
					>
						{isReset ? 'В аккаунт' : 'Отправить'}
					</Button>
				</Box>
			</Container>
			<Footer />
		</>
	);
};

export default ResetPassword;
