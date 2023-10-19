import { TextField, Button, Typography, Box, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Profile: React.FC = () => {
	const name = 'Иван Петров';
	const email = 'ivan.petrov@gmail.com';
	const phone = '9211231313';
	const oldPassword = '';
	const newPassword = '';

	const [isVisible, setIsVisible] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState({
		name: 'Иван Петров',
		phone: '9211231313',
		email: 'ivan.petrov@gmail.com',
		oldPassword: '',
		newPassword: '',
	});

	const handleChangePassword = (): void => setIsVisible(!isVisible);

	const handleFieldChange = (fieldName: string, value: string): void => {
		setFormData({
			...formData,
			[fieldName]: value,
		});
	};

	const isDataChanged =
		formData.name !== name ||
		formData.phone !== phone ||
		formData.email !== email ||
		formData.oldPassword !== oldPassword ||
		formData.newPassword !== newPassword;

	function handleChange() {
		if (isVisible) {
			setIsVisible(!isVisible);

			setTimeout(() => {
				setIsSuccess(true);

				setTimeout(() => {
					setIsSuccess(false);
				}, 2000);
			}, 2000);
		}
	}

	useEffect(() => {
		handleChangePassword();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container fixed maxWidth="sm">
			<Typography
				variant="h1"
				component="h1"
				sx={{
					fontFamily: 'Ubuntu',
					fontSize: '30px',
					fontWeight: '400',
					lineHeight: '36px',
					mt: 4,
					ml: 0,
					marginTop: 3,
					mb: 1,
				}}
			>
				Профиль
			</Typography>
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '100%', ml: 0, mb: 0 },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="outlined-basic"
					variant="outlined"
					value={formData.name}
					type="phone"
					style={{ backgroundColor: '#FDFAF2' }}
					onChange={(e) => handleFieldChange('name', e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					variant="outlined"
					value={formData.phone}
					type="phone"
					style={{ backgroundColor: '#FDFAF2' }}
					onChange={(e) => handleFieldChange('phone', e.target.value)}
				/>
				<TextField
					id="outlined-basic"
					type="email"
					variant="outlined"
					value={formData.email}
					style={{ backgroundColor: '#FDFAF2' }}
					onChange={(e) => handleFieldChange('email', e.target.value)}
				/>
				<Button
					onClick={handleChangePassword}
					style={{ display: isVisible ? 'block' : 'none', color: '#05887B' }}
				>
					Сменить пароль
				</Button>
			</Box>
			{!isVisible && (
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1, width: '100%', ml: 0, mb: 0 },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						type="password"
						variant="outlined"
						sx={{
							backgroundColor: '#FDFAF2',
						}}
						placeholder="Текущий пароль"
					/>
					<TextField
						id="outlined-basic"
						type="password"
						variant="outlined"
						sx={{
							backgroundColor: '#FDFAF2',
						}}
						placeholder="Новый пароль"
					/>
					<TextField
						id="outlined-basic"
						type="password"
						variant="outlined"
						sx={{
							backgroundColor: '#FDFAF2',
						}}
						placeholder="Новый пароль повторно"
					/>
				</Box>
			)}
			{isSuccess ? (
				<Typography
					fontFamily="Ubuntu"
					fontSize="20px"
					fontWeight="500"
					lineHeight="26px"
					letterSpacing="0.2px"
					color="#006C60"
					textAlign="center"
					mb="26px"
				>
					Изменения успешно сохранены
				</Typography>
			) : (
				<Button
					variant="contained"
					sx={{
						backgroundColor: '#C41A68',
						borderRadius: '100px',
						width: '100%',
						mt: 1,
						mb: 3,
						'&:active': {
							backgroundColor: '#C41A68',
						},
					}}
					onClick={handleChange}
					disabled={!isDataChanged}
				>
					Сохранить изменения
				</Button>
			)}
		</Container>
	);
};

export default Profile;
