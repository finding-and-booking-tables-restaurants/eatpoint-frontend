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
import { maxWidthBoxConfig, minWidthBoxConfig } from '../../utils/constants';

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
	const nonUniqueData =
		requestErrorMessage === 'Эта почта или номер телефона уже используются';

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
			confirm_code_send_method: 'email',
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

	const inputStyles = { maxWidth: { xs: '100%', md: '428px', lg: '522px' } };

	return (
		<>
			<Header />
			<Box
				minWidth={maxWidthBoxConfig}
				maxWidth={minWidthBoxConfig}
				m="auto"
				sx={{ mb: 5, minHeight: 'calc(100vh - 217px)' }}
			>
				<Typography
					variant="h1"
					component="h1"
					sx={{
						fontFamily: 'Roboto',
						fontSize: '26px',
						fontWeight: '600',
						lineHeight: '36px',
						mt: 4,
						ml: 0,
						marginTop: 2.5,
						mb: 1.3,
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
						display={'flex'}
						flexWrap={'wrap'}
						columnGap={'24px'}
						sx={{
							'& > :not(style)': { m: 0, width: '100%', ml: 0, mb: 2 },
						}}
					>
						<TextField
							sx={inputStyles}
							{...register('firstName', {
								required: 'Введите имя',
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
									message: 'Имя введено не корректно',
								},
							})}
							label="Имя"
							name="firstName"
							id="name"
							type="text"
							placeholder="Введите имя"
							variant="outlined"
							fullWidth
							onBlur={handleBlur}
							error={!!errors.firstName}
							helperText={errors.firstName?.message || ''}
						/>

						<TextField
							{...register('lastName', {
								required: 'Введите фамилию',
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
									message: 'Фамилия введена не корректно',
								},
							})}
							sx={inputStyles}
							label="Фамилия"
							placeholder="Введите фамилию"
							name="lastName"
							variant="outlined"
							onBlur={handleBlur}
							error={!!errors.lastName}
							helperText={errors.lastName?.message || ''}
							fullWidth
						/>
						<TextField
							{...register('telephone', {
								required: 'Введите телефон',
								pattern: {
									value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
									message: 'Введите корректный номер моб. телефона',
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
							sx={inputStyles}
							label="Моб. телефон в виде +7(...)... .. .."
							placeholder="Введите номер телефона"
							variant="outlined"
							name="telephone"
							type="tel"
							error={!!errors.telephone || nonUniqueData}
							helperText={errors.telephone?.message || ''}
							fullWidth
						/>
						<TextField
							{...register('email', {
								required: 'Введите эл. почту',
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
							label="Эл. почта"
							placeholder="Введите email"
							type="email"
							name="email"
							variant="outlined"
							onBlur={handleBlur}
							error={!!errors.email || nonUniqueData}
							helperText={errors.email?.message || ''}
							sx={inputStyles}
							fullWidth
						/>
						<TextField
							{...register('password', {
								required: 'Введите пароль',
								minLength: {
									value: 8,
									message: 'Введите не менее 8 символов',
								},
								maxLength: {
									value: 30,
									message: 'Введите не более 30 символов',
								},
								pattern: {
									value:
										/^(?=.*[a-zA-Z\d!@#$%^&*()_+{}[\]:;<>,.?~\\-]).{8,30}$/,
									message:
										'Пароль должен содержать хотя бы одну заглавную букву, строчную букву и цифру',
								},
							})}
							label="Пароль"
							type="password"
							name="password"
							margin="dense"
							variant="outlined"
							placeholder="Пароль"
							error={!!errors.password}
							helperText={errors.password?.message || ''}
							sx={inputStyles}
							fullWidth
						/>
						<TextField
							{...register('confirmPassword', {
								required: 'Введите пароль',
								validate: (value) =>
									value === password || 'Пароли не совпадают',
							})}
							label="Пароль повторно"
							margin="dense"
							variant="outlined"
							placeholder="Пароль повторно"
							type="password"
							name="confirmPassword"
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword?.message || ''}
							sx={inputStyles}
							fullWidth
						/>
						{requestErrorMessage && (
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
						)}

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
										fontSize: '12px',
										fontWeight: '400',
										lineHeight: '16px',
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
									borderRadius: '6px',
									borderColor: '#006C60',
									height: '40px',
									minWidth: 'calc(50% - 8px)',
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
									borderRadius: '6px',
									minWidth: 'calc(50% - 8px)',
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
			</Box>
			<Footer />
		</>
	);
};

export default RegisterFormUser;
