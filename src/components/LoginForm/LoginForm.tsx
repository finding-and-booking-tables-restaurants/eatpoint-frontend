import {
	Container,
	Typography,
	Box,
	TextField,
	Stack,
	Button,
	FormControlLabel,
	Checkbox,
	checkboxClasses,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginFormData, ILoginFormProps } from '../../types/commonTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const LoginForm: React.FC<ILoginFormProps> = ({
	onLogin,
	requestErrorMessage,
}) => {
	const navigate = useNavigate();

	const [rememberMe, setRememberMe] = useState(false);

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm<ILoginFormData>({
		mode: 'onChange',
	});

	const handleLogin: SubmitHandler<ILoginFormData> = async (formData, e) => {
		e?.preventDefault();
		const data = {
			email: formData.email.trim(),
			password: formData.password.trim(),
		};

		onLogin(data, rememberMe);
	};

	const handleBlur = () => {
		const emailValue = watch('email').trim();
		setValue('email', emailValue, { shouldDirty: true });
	};

	const handleGoBackBtn = () => {
		navigate(-1);
	};

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
					onSubmit={handleSubmit(handleLogin)}
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
						{...register('email', {
							required: 'Поле обязательно для заполнения',
							pattern: {
								value:
									/^(?!.*(__|-{2}))[A-Z0-9._%+-]+\S@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'Электронная почта введена не корректно',
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message || ''}
						onBlur={handleBlur}
						margin="dense"
						variant="outlined"
						placeholder="Эл. почта"
						name="email"
						type="text"
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
						{...register('password', {
							required: 'Поле обязательно для заполнения',
						})}
						error={!!errors.password}
						helperText={errors.password?.message || ''}
						onBlur={handleBlur}
						margin="dense"
						variant="outlined"
						placeholder="Пароль"
						type="password"
						required
						fullWidth
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
					/>
					<span
						style={{
							display: 'block',
							minHeight: '15px',
							color: 'red',
							fontSize: '12px',
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
							disabled={!isDirty || !isValid}
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
				{/* <Button
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
				</Button> */}
			</Container>
			<Footer />
		</>
	);
};

export default LoginForm;
