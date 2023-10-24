import { TextField, Button, Typography, Box, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Profile: React.FC = () => {
	const userData = useContext(CurrentUserContext).currentUser;

	const [isVisible, setIsVisible] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [formData, setFormData] = useState(userData);

	const handleChangePassword = (): void => setIsVisible(!isVisible);

	function handleChange() {
		setTimeout(() => {
			setIsSuccess(true);

			setTimeout(() => {
				setIsSuccess(false);
				setIsVisible(true);
			}, 2000);
		}, 2000);
	}

	useEffect(() => {
		handleChangePassword();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
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
				>
					<TextField
						variant="outlined"
						defaultValue={userData.first_name + ' ' + userData.last_name}
						name="first_name, last_name"
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<TextField
						variant="outlined"
						defaultValue={userData.telephone}
						name="telephone"
						required
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<TextField
						type="email"
						name="email"
						variant="outlined"
						required
						defaultValue={userData.email}
						style={{ backgroundColor: '#FDFAF2' }}
					/>
					<Button
						onClick={handleChangePassword}
						variant="outlined"
						style={{
							textTransform: 'none',
							width: '156px',
							display: isVisible ? 'block' : 'none',
							color: '#05887B',
							borderRadius: '100px',
							marginBottom: `${isVisible && '115px'}`,
						}}
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
							type="password"
							variant="outlined"
							disabled={true}
							sx={{
								backgroundColor: '#FDFAF2',
							}}
							placeholder="Текущий пароль"
						/>
						<TextField
							type="password"
							variant="outlined"
							disabled={true}
							sx={{
								backgroundColor: '#FDFAF2',
							}}
							placeholder="Новый пароль"
						/>
						<TextField
							type="password"
							variant="outlined"
							disabled={true}
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
						{`Изменения успешно сохранены (болванка)`}
					</Typography>
				) : (
					<Button
						variant="contained"
						sx={{
							textTransform: 'none',
							backgroundColor: '#05887B',
							borderRadius: '100px',
							width: '100%',
							mt: 1,
							mb: 3,
							padding: '10px 24px 10px 16px',
						}}
						onClick={handleChange}
						disabled={false}
					>
						Сохранить изменения
					</Button>
				)}
			</Container>
			<Footer />
		</>
	);
};

export default Profile;
