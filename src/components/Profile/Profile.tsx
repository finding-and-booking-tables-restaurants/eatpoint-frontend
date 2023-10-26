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

	const [isVisible, setIsVisible] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<IUserFormData>({
		mode: 'onChange',
		defaultValues: {
			firstName: userData.first_name,
			lastName: userData.last_name,
			telephone: userData.telephone,
			email: userData.email,
		},
	});

	const onSubmit: SubmitHandler<IUserFormData> = async (formData, e) => {
		e?.preventDefault();
		onUpdateUserInfo(formData);
	};

	const handleChangePassword = (): void => setIsVisible(!isVisible);

	useEffect(() => {
		if (isSuccessUpdateUser) {
			const timer = setTimeout(() => {
				setIsSuccessUpdateUser(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [isSuccessUpdateUser, setIsSuccessUpdateUser]);

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
									value: 150,
									message: 'Максимальная длина - 150 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042f]{2,150}$/,
									message: 'Введите корректное имя',
								},
							})}
							placeholder="Введите имя"
							variant="outlined"
							error={!!errors.firstName}
							helperText={errors.firstName?.message || ''}
							sx={{
								backgroundColor: '#FDFAF2',
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							fullWidth
						/>
						<TextField
							{...register('lastName', {
								required: 'Поле обязательно для заполнения',
								minLength: {
									value: 2,
									message: 'Минимальная длина - 2 символа',
								},
								maxLength: {
									value: 150,
									message: 'Максимальная длина - 150 символов',
								},
								pattern: {
									value: /^[a-zA-Z\u0430-\u044f\u0410-\u042f]{2,30}$/,
									message: 'Введите корректную фамилию',
								},
							})}
							placeholder="Введите фамилию"
							variant="outlined"
							error={!!errors.lastName}
							helperText={errors.lastName?.message || ''}
							sx={{
								backgroundColor: '#FDFAF2',
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							fullWidth
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
									value: 7,
									message: 'Минимальная длина - 7 символов',
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
								backgroundColor: '#FDFAF2',
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
								},
							}}
							fullWidth
						/>
						<TextField
							{...register('email', {
								required: 'Обязательное поле',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
									message: 'Введите корректный адрес электронной почты',
								},
							})}
							placeholder="Введите email"
							type="email"
							name="email"
							variant="outlined"
							error={!!errors.email}
							helperText={errors.email?.message || ''}
							sx={{
								backgroundColor: '#FDFAF2',
								marginTop: 2,
								'.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
									height: '48px',
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
								display: isVisible ? 'block' : 'none',
								color: '#05887B',
								borderRadius: '100px',
								borderColor: '#05887B',
								marginBottom: `${isVisible && '101px'}`,
								marginTop: '15px',
							}}
						>
							Сменить пароль
						</Button>
					</div>
					{!isVisible && (
						<div>
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
								placeholder="Текущий пароль"
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
							disabled={!isDirty || !isValid || isSuccessUpdateUser}
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
