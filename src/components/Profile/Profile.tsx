import './Profile.css';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Profile() {
	const name = 'Иван Петров';
	const email = 'ivan.petrov@gmail.com';
	const phone = '9211231313';

	const [isVisible, setIsVisible] = useState(false);

	function handleChangePassword() {
		setIsVisible(!isVisible);
	}

	function handleChange() {
		if (!isVisible) {
			setIsVisible(!isVisible);
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
					value={name}
					variant="outlined"
					type="text"
					sx={{
						backgroundColor: '#FDFAF2',
						outline: 'none',
					}}
				/>
				<TextField
					id="outlined-basic"
					variant="outlined"
					value={phone}
					type="phone"
					style={{ backgroundColor: '#FDFAF2' }}
				/>
				<TextField
					id="outlined-basic"
					value={email}
					type="email"
					variant="outlined"
					style={{ backgroundColor: '#FDFAF2' }}
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
			>
				Сохранить изменения
			</Button>
		</Container>
	);
}
