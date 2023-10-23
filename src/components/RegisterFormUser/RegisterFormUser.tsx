import {
	Container,
	Typography,
	Stack,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	IRegisterFormData,
	IRegisterFormUserProps,
} from '../../types/commonTypes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './RegisterFormUser.css';
import SuccessRegister from '../SuccessRegister/SuccessRegister';

const RegisterFormUser: React.FC<IRegisterFormUserProps> = ({
	onRegistration,
	requestErrorMessage,
	isSuccessRegister,
}) => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [telephone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isAgreement, setIsAgreement] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const userData: IRegisterFormData = {
			firstName,
			lastName,
			telephone,
			email,
			password,
			confirmPassword,
			is_agreement: isAgreement,
			role: 'client',
			confirm_code_send_method: 'nothing',
		};

		onRegistration(userData);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		const requiredFields = [
			firstName,
			lastName,
			telephone,
			email,
			password,
			confirmPassword,
			isAgreement,
		];
		const isFormFilled = requiredFields.every(
			(field) => field !== '' && field !== false
		);
		setIsFormValid(isFormFilled);
	}, [
		firstName,
		lastName,
		telephone,
		email,
		password,
		confirmPassword,
		isAgreement,
	]);

	return (
		<>
			<Header />
			<Container fixed maxWidth="sm" sx={{ mb: 5 }}>
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
						marginTop: 3,
						mb: 1,
					}}
				>
					Регистрация
				</Typography>
				{isSuccessRegister ? (
					<SuccessRegister userEmail={email} />
				) : (
					<Box
						component="form"
						onSubmit={handleRegistration}
						sx={{
							'& > :not(style)': { m: 1, width: '100%', ml: 0, mb: 0 },
						}}
					>
						<TextField
							margin="dense"
							name="name"
							variant="outlined"
							placeholder="Имя, Фамилия"
							type="text"
							id="name"
							required
							fullWidth
							onChange={(e) => {
								const fullName = e.target.value;
								const [firstName, ...lastNameArr] = fullName.split(' ');
								const lastName = lastNameArr.join(' ');
								setFirstName(firstName);
								setLastName(lastName);
							}}
							sx={{
								backgroundColor: '#FDFAF2',
							}}
						/>
						<TextField
							variant="outlined"
							name="telephone"
							placeholder="Моб. телефон"
							type="text"
							id="phone"
							onChange={(e) => setPhone(e.target.value)}
							required
							fullWidth
							sx={{
								backgroundColor: '#FDFAF2',
							}}
						/>
						<TextField
							margin="dense"
							variant="outlined"
							placeholder="Эл. почта"
							name="email"
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							required
							fullWidth
							sx={{ backgroundColor: '#FDFAF2' }}
						/>
						<TextField
							margin="dense"
							variant="outlined"
							placeholder="Пароль"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							required
							fullWidth
							sx={{ backgroundColor: '#FDFAF2' }}
						/>
						<TextField
							margin="dense"
							variant="outlined"
							placeholder="Пароль повторно"
							type="password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							fullWidth
							style={{ backgroundColor: '#FDFAF2' }}
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={isAgreement}
									onChange={(e) => setIsAgreement(e.target.checked)}
								/>
							}
							sx={{
								alignItems: 'center',
							}}
							label={
								<Typography
									sx={{
										maxWidth: '264px',
										fontSize: '12px',
										fontWeight: '400',
										lineHeight: '16px',
										mt: '2px',
										ml: '13px',
									}}
								>
									Соглашаюсь на обработку персональных данных
								</Typography>
							}
						/>
						<Stack direction="row" spacing={2} sx={{ mt: 2, mb: 3 }}>
							<Button
								onClick={handleGoBack}
								variant="outlined"
								sx={{
									borderRadius: '100px',
									borderColor: '#006C60',
									height: '40px',
									width: '156px',
								}}
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
									Зарегистрироваться
								</Typography>
							</Button>
						</Stack>
					</Box>
				)}
			</Container>
			<Footer />
		</>
	);
};

export default RegisterFormUser;
