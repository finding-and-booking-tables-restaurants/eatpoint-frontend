import {
	Container,
	Typography,
	Box,
	TextField,
	Stack,
	Button,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginFormData, ILoginFormProps } from '../../types/commonTypes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LoginForm: React.FC<ILoginFormProps> = ({
	onLogin,
	requestErrorMessage,
}) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data: ILoginFormData = {
			email,
			password,
		};

		onLogin(data, rememberMe);
	};

	const handleGoBackBtn = () => {
		navigate(-1);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	useEffect(() => {
		const isFormFilled = [email, password].every(Boolean);
		setIsFormValid(isFormFilled);
	}, [email, password]);

	return (
		<>
			<Header />
			<Container sx={{ mb: 6, minHeight: 'calc(100vh - 219px)' }}>
				<Typography
					variant="h1"
					component="h1"
					sx={{
						fontFamily: 'Ubuntu',
						fontSize: '26px',
						fontWeight: '400',
						lineHeight: '32px',
						letterSpacing: 'normal',
						ml: 0,
						marginTop: 2.4,
						mb: 1,
					}}
				>
					Вход пользователя
				</Typography>
				<Box
					component="form"
					onSubmit={handleLogin}
					sx={{
						'& > :not(style)': {
							m: 1,
							// height: '48px',
							width: '100%',
							ml: 0,
							mb: 1,
						},
					}}
				>
					<TextField
						margin="dense"
						variant="outlined"
						placeholder="Эл. почта"
						name="email"
						type="text"
						onChange={handleEmailChange}
						required
						fullWidth
						inputProps={{
							style: {
								height: '16px',
								borderRadius: '4px',
							},
						}}
						sx={{
							backgroundColor: '#FDFAF2',
						}}
					/>
					<TextField
						margin="dense"
						variant="outlined"
						placeholder="Пароль"
						type="password"
						onChange={handlePasswordChange}
						required
						fullWidth
						inputProps={{
							style: {
								height: '16px',
							},
						}}
						sx={{
							backgroundColor: '#FDFAF2',
						}}
					/>
					<span
						style={{
							display: 'block',
							minHeight: '15px',
							color: 'red',
							fontSize: '10px',
							margin: '5px',
						}}
					>
						{requestErrorMessage}
					</span>
					<FormControlLabel
						control={
							<Checkbox
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
						}
						sx={{
							alignItems: 'center',
						}}
						label={
							<Typography
								sx={{
									maxWidth: '264px',
									fontSize: '16px',
									fontWeight: '400',
									lineHeight: '24px',
									mt: '2px',
									ml: '13px',
								}}
							>
								Запомнить меня
							</Typography>
						}
					/>
					<Stack direction="row" spacing={2} sx={{ mt: 2, mb: 3 }}>
						<Button
							variant="outlined"
							sx={{
								borderRadius: '100px',
								borderColor: '#006C60',
								height: '40px',
								width: '156px',
							}}
							onClick={handleGoBackBtn}
						>
							<Typography
								sx={{
									color: '#05887B',
									fontSize: '14px',
									fontWeight: '500',
									lineHeight: '20px',
									textTransform: 'capitalize',
								}}
							>
								Назад
							</Typography>
						</Button>
						<Button
							type="submit"
							variant="contained"
							disabled={!isFormValid}
							sx={{
								backgroundColor: '#05887B',
								borderRadius: '100px',
								height: '40px',
								width: '156px',
							}}
						>
							<Typography
								sx={{
									fontSize: '14px',
									fontWeight: '500',
									lineHeight: '20px',
									textTransform: 'capitalize',
									letterSpacing: '-0.6px',
								}}
							>
								Войти
							</Typography>
						</Button>
					</Stack>
				</Box>
				<Button
					variant="text"
					sx={{
						ml: 1,
						color: '#05887B',
						fontSize: '16px',
						fontWeight: '400',
						lineHeight: '24px',
						letterSpacing: '0.5px',
						textTransform: 'capitalize',
					}}
				>
					Забыли пароль
				</Button>
			</Container>
			<Footer />
		</>
	);
};

export default LoginForm;
