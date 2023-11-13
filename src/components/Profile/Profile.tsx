import { TextField, Button, Typography, Box, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserFormData, IUserFormProps } from '../../types/commonTypes';

const Profile: React.FC<IUserFormProps> = ({
	onUpdateUserInfo,
	requestStatus: { message, isSuccess },
	resetRequestMessage,
}) => {
	const userData = useContext(CurrentUserContext).currentUser;
	const role = useContext(CurrentUserContext).currentRole;
	const [defaultValues] = useState({
		firstName: userData?.first_name,
		lastName: userData?.last_name,
		telephone: userData?.telephone,
		email: userData?.email,
	});
	const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isValid },
	} = useForm<IUserFormData>({
		mode: 'onChange',
		defaultValues: defaultValues,
	});

	const handleChangePassword = (): void => {
		setIsPasswordChangeVisible(!isPasswordChangeVisible);
	};

	const onSubmit: SubmitHandler<IUserFormData> = async (formData, e) => {
		e?.preventDefault();

		const formDataWithRole = {
			...formData,
			firstName: formData.firstName.trim(),
			lastName: formData.lastName.trim(),
			email: formData.email.trim(),
			role: role,
		};

		onUpdateUserInfo(formDataWithRole);
		setIsPasswordChangeVisible(true);
	};

	const handleBlur = () => {
		const emailValue = watch('email').trim();
		const firstNameValue = watch('firstName').trim();
		const lastNameValue = watch('lastName').trim();
		setValue('email', emailValue, { shouldDirty: true });
		setValue('firstName', firstNameValue, { shouldDirty: true });
		setValue('lastName', lastNameValue, { shouldDirty: true });
	};

	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				resetRequestMessage();
			}, 3000);

			reset({
				firstName: userData?.first_name,
				lastName: userData?.last_name,
				telephone: userData?.telephone,
				email: userData?.email,
			});

			return () => clearTimeout(timer);
		}
	}, [
		message,
		reset,
		resetRequestMessage,
		userData?.email,
		userData?.first_name,
		userData?.last_name,
		userData?.telephone,
	]);

	useEffect(() => {
		handleChangePassword();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<Container fixed maxWidth="sm" sx={{ minHeight: 'calc(100vh - 172px)' }}>
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
						mb: 1.5,
					}}
				>
					Профиль
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit(onSubmit)}
					sx={{
						'& > :not(style)': { width: '100%' },
					}}
				>
					<div>
						<TextField
							{...register('firstName', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Минимальная длина - 2 символа',
								},
								maxLength: {
									value: 30,
									message: 'Максимальная длина - 30 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
									message: 'Введите корректное имя',
								},
							})}
							label="Имя"
							placeholder="Введите имя"
							variant="outlined"
							error={!!errors.firstName}
							helperText={errors.firstName?.message || ''}
							sx={{
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							fullWidth
							onBlur={handleBlur}
						/>
						<TextField
							{...register('lastName', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Минимальная длина - 2 символа',
								},
								maxLength: {
									value: 30,
									message: 'Максимальная длина - 30 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042fёЁ\s]*$/,
									message: 'Введите корректную фамилию',
								},
							})}
							label="Фамилия"
							placeholder="Введите фамилию"
							variant="outlined"
							error={!!errors.lastName}
							helperText={errors.lastName?.message || ''}
							sx={{
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							fullWidth
							onBlur={handleBlur}
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
							label="Моб. телефон в виде +7(...)... .. .."
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
							label="Эл. почта"
							placeholder="Введите email"
							type="email"
							name="email"
							variant="outlined"
							error={!!errors.email}
							helperText={errors.email?.message || ''}
							onBlur={handleBlur}
							sx={{
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							fullWidth
						/>
						{/* <Button
							onClick={handleChangePassword}
							variant="outlined"
							style={{
								textTransform: 'none',
								width: '156px',
								height: '40px',
								display: isPasswordChangeVisible ? 'block' : 'none',
								color: '#05887B',
								borderRadius: '100px',
								borderColor: '#05887B',
								marginBottom: `${isPasswordChangeVisible && '101px'}`,
								marginTop: '15px',
							}}
						>
							Сменить пароль
						</Button> */}
					</div>
					{/* {!isPasswordChangeVisible && (
						<div>
							<TextField
								type="password"
								variant="outlined"
								disabled={true}
								sx={{
									marginTop: 2,
									'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
										height: '48px',
									},
								}}
								placeholder="Текущий пароль"
								fullWidth
							/>
							<TextField
								type="password"
								variant="outlined"
								disabled={true}
								sx={{
									marginTop: 2,
									'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
										height: '48px',
									},
								}}
								InputProps={{
								placeholder="Новый пароль"
								fullWidth
							/>
							<TextField
								type="password"
								variant="outlined"
								disabled={true}
								sx={{
									backgroundColor: '#FDFAF2',
									marginTop: 2,
									'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
										height: '48px',
									},
								}}
								placeholder="Новый пароль повторно"
								fullWidth
							/>
						</div>
					)} */}
					{message ? (
						<Typography
							fontFamily="Ubuntu"
							fontSize="20px"
							fontWeight="500"
							lineHeight="26px"
							letterSpacing="0.2px"
							color="#006C60"
							textAlign="center"
							mt="135px"
						>
							{message}
						</Typography>
					) : (
						<Button
							type="submit"
							variant="contained"
							sx={{
								textTransform: 'none',
								backgroundColor: '#05887B',
								borderRadius: '8px',
								width: '100%',
								height: '40px',
								mt: 17,
								mb: 3,
								padding: '10px 24px 10px 16px',
							}}
							disabled={!isDirty || !isValid}
						>
							<Typography
								fontFamily="Roboto"
								fontSize="14px"
								fontWeight="500"
								lineHeight="20px"
								letterSpacing="0.1px"
							>
								Сохранить изменения
							</Typography>
						</Button>
					)}
				</Box>
			</Container>
			<Footer />
		</>
	);
};

export default Profile;
