import { TextField, Button, Typography, Box, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserFormData, IUserFormProps } from '../../types/commonTypes';

const Profile: React.FC<IUserFormProps> = ({
	onUpdateUserInfo,
	isSuccessUpdateUser,
	setIsSuccessUpdateUser,
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
	};

	const handleBlur = () => {
		const emailValue = watch('email').trim();
		const firstNameValue = watch('firstName').trim();
		const lastNameValue = watch('lastName').trim();
		setValue('email', emailValue, { shouldDirty: true });
		setValue('firstName', firstNameValue, { shouldDirty: true });
		setValue('lastName', lastNameValue, { shouldDirty: true });
	};

	const handleChangePassword = (): void =>
		setIsPasswordChangeVisible(!isPasswordChangeVisible);

	useEffect(() => {
		if (isSuccessUpdateUser) {
			const timer = setTimeout(() => {
				setIsSuccessUpdateUser(false);
			}, 3000);

			reset({
				firstName: userData?.first_name,
				lastName: userData?.last_name,
				telephone: userData?.telephone,
				email: userData?.email,
			});

			return () => clearTimeout(timer);
		}
	}, [isSuccessUpdateUser, setIsSuccessUpdateUser, reset, userData]);

	useEffect(() => {
		handleChangePassword();
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
						marginTop: 2.5,
						mb: 2,
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
							placeholder="Введите имя"
							variant="outlined"
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
									message: 'Введите корректное имя',
								},
							})}
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
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
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
									message:
										'Введите корректный номер телефона в международном формате',
								},
								minLength: {
									value: 12,
									message: 'Минимальная длина - 12 символов',
								},
								maxLength: {
									value: 14,
									message: 'Максимальная длина - 14 символов',
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
								required: 'Обязательное поле',
								pattern: {
									value:
										/^(?!.*(__|-{2}))[A-Z0-9._%+-]+\S@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Введите корректный адрес электронной почты',
								},

								maxLength: {
									value: 50,
									message: 'Максимальная длина - 50 символов',
								},
							})}
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
							InputProps={{
								sx: {
									backgroundColor: '#FDFAF2',
								},
							}}
							fullWidth
						/>
						<Button
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
						</Button>
					</div>
					{!isPasswordChangeVisible && (
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
								InputProps={{
									sx: {
										backgroundColor: '#FDFAF2',
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
									sx: {
										backgroundColor: '#FDFAF2',
									},
								}}
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
					)}
					{isSuccessUpdateUser ? (
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
							{`Изменения успешно внесены`}
						</Typography>
					) : (
						<Button
							type="submit"
							startIcon={<CheckIcon />}
							variant="contained"
							sx={{
								textTransform: 'none',
								backgroundColor: '#05887B',
								borderRadius: '100px',
								width: '100%',
								height: '40px',
								mt: 1,
								mb: 3,
								padding: '10px 24px 10px 16px',
							}}
							disabled={!isDirty || !isValid}
						>
							Сохранить изменения
						</Button>
					)}
				</Box>
			</Container>
			<Footer />
		</>
	);
};

export default Profile;
