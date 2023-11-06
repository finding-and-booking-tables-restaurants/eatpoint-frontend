import {
	Container,
	Typography,
	Stack,
	TextField,
	Button,
	Checkbox,
	FormControlLabel,
	Box,
	checkboxClasses,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
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
	role,
}) => {
	const navigate = useNavigate();
	const [isAgreement, setIsAgreement] = useState(false);
	const [emailValue, setEmailValue] = useState('');

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<IRegisterFormData>({
		mode: 'onChange',
	});

	const password = watch('password', '');

	const handleRegistration: SubmitHandler<IRegisterFormData> = async (
		formData,
		e
	) => {
		e?.preventDefault();
		const userData = {
			...formData,
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			email: formData.email.trim(),
			password: formData.password.trim(),
			is_agreement: isAgreement,
			role: role,
			confirm_code_send_method: 'nothing',
		};
		setEmailValue(formData.email.trim());
		onRegistration(userData);
	};

	const handleBlur = () => {
		const emailValue = watch('email').trim();
		const firstNameValue = watch('firstName').trim();
		const lastNameValue = watch('lastName').trim();
		setValue('email', emailValue, { shouldDirty: true });
		setValue('firstName', firstNameValue, { shouldDirty: true });
		setValue('lastName', lastNameValue, { shouldDirty: true });
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<>
			<Header />
			<Container
				fixed
				maxWidth="sm"
				sx={{ mb: 5, minHeight: 'calc(100vh - 217px)' }}
			>
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
					<SuccessRegister userEmail={emailValue} />
				) : (
					<Box
						component="form"
						onSubmit={handleSubmit(handleRegistration)}
						sx={{
							'& > :not(style)': { m: 1, width: '100%', ml: 0, mb: 0 },
						}}
					>
						<TextField
							{...register('firstName', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Введите не менее 2 символов',
								},
								maxLength: {
									value: 30,
									message: 'Введите менее 30 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
									message: 'Введите корректное имя',
								},
							})}
							name="firstName"
							id="name"
							type="text"
							placeholder="Введите имя"
							variant="outlined"
							margin="dense"
							fullWidth
							onBlur={handleBlur}
							error={!!errors.firstName}
							helperText={errors.firstName?.message || ''}
							sx={{
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
						/>

						<TextField
							{...register('lastName', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Введите не менее 2 символов',
								},
								maxLength: {
									value: 30,
									message: 'Введите не более 30 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
									message: 'Введите корректную фамилию',
								},
							})}
							placeholder="Введите фамилию"
							name="lastName"
							variant="outlined"
							onBlur={handleBlur}
							error={!!errors.lastName}
							helperText={errors.lastName?.message || ''}
							sx={{
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
							fullWidth
						/>
						<TextField
							{...register('telephone', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
									message: 'Введите корректный номер телефона',
								},
								minLength: {
									value: 10,
									message: 'Минимальная длина - 10 символов',
								},
								maxLength: {
									value: 12,
									message: 'Максимальная длина - 12 символов',
								},
							})}
							placeholder="Введите номер телефона"
							variant="outlined"
							name="telephone"
							type="tel"
							error={!!errors.telephone}
							helperText={errors.telephone?.message || ''}
							sx={{
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
							fullWidth
						/>
						<TextField
							{...register('email', {
								required: 'Поле обязательно для заполнения',
								pattern: {
									value:
										/^(?!.*(__|-{2}))[A-Z0-9._%+-]+\S@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Электронная почта введена не корректно',
								},
								minLength: {
									value: 5,
									message: 'Введите не менее 5 символов',
								},
								maxLength: {
									value: 50,
									message: 'Введите менее 50 символов',
								},
							})}
							placeholder="Введите email"
							type="email"
							name="email"
							variant="outlined"
							onBlur={handleBlur}
							error={!!errors.email}
							helperText={errors.email?.message || ''}
							sx={{
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
							fullWidth
						/>
						<TextField
							{...register('password', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 8,
									message: 'Минимальная длина - 8 символов',
								},
								maxLength: {
									value: 30,
									message: 'Максимальная длина - 30 символов',
								},
								pattern: {
									value:
										/^(?=.*[a-zA-Z\d!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,30}$/,
									message:
										'Пароль должен содержать хотя бы одну заглавную букву, строчную букву и цифру',
								},
							})}
							type="password"
							name="password"
							margin="dense"
							variant="outlined"
							placeholder="Пароль"
							error={!!errors.password}
							helperText={errors.password?.message || ''}
							required
							fullWidth
							sx={{
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
						/>
						<TextField
							{...register('confirmPassword', {
								required: 'Поле обязательно для заполнения',
								validate: (value) =>
									value === password || 'Пароли должны совпадать',
							})}
							margin="dense"
							variant="outlined"
							placeholder="Пароль повторно"
							type="password"
							name="confirmPassword"
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword?.message || ''}
							required
							fullWidth
							sx={{
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
						/>
						<span
							style={{
								display: 'block',
								minHeight: '15px',
								color: 'red',
								fontSize: '11px',
								margin: '5px',
							}}
						>
							{requestErrorMessage}
						</span>
						<FormControlLabel
							control={
								<Checkbox
									sx={{
										[`&, &.${checkboxClasses.checked}`]: {
											color: '#05887B',
										},
									}}
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
								disabled={!isDirty || !isValid || !isAgreement}
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
