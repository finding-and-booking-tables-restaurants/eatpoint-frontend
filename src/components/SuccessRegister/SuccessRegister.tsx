import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './SuccessRegister.css';
import usersApi from '../../utils/UsersApi';

const SuccessRegister = ({ userEmail }: { userEmail: string }) => {
	const [isVerified, setIsVerified] = useState(false);
	const [codeIsValid, setCodeIsValid] = useState(true);
	const [code, setCode] = useState('');
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (code.length > 6) {
			setCodeIsValid(false);
		}
		if (code.length != 6) return;
		usersApi
			.confirmRegister(userEmail, code)
			.then((res) => {
				if (!res) return;
				setIsVerified(true);
			})
			.catch((err) => {
				setCodeIsValid(false);
				console.log(err);
			});
	}, [code]);

	return (
		<div className="success-register">
			{!isVerified ? (
				<>
					<h2 className="success-register__message">
						Мы отправиль код на почту
						<span className="success-register__user-email"> {userEmail}</span>,
						для подтверждения регистрации, пожалуйста, введите полученный код в
						окошко ниже:
					</h2>
					<TextField
						placeholder="Код"
						error={!codeIsValid}
						helperText={codeIsValid ? '' : 'Вы ввели неверный код'}
						type="password"
						onChange={(event) => {
							setCodeIsValid(true);
							setCode(event.target.value);
						}}
						sx={{
							mt: '16px',
							width: '100%',
							'& .Mui-error': {
								color: '#EC006C',
							},
							'& .MuiOutlinedInput-root': {
								'&.Mui-error .MuiOutlinedInput-notchedOutline': {
									borderColor: '#EC006C',
								},
							},
						}}
					></TextField>
				</>
			) : (
				<>
					<h2 className="success-register__title">
						Вы успешно зарегистрированы!
					</h2>
					<p className="success-register__message">
						Сообщение с данными регистрации было отправлено Вам на почту:
						<span className="success-register__user-email"> {userEmail}</span>
					</p>

					<Button
						variant="contained"
						sx={{
							minWidth: '328px',
							height: '48px',
							borderRadius: '8px',
							backgroundColor: '#05887B',
							textTransform: 'none',
							fontSize: '16px',
							fontWeight: '500',
							lineHeight: '20px',
							letterSpacing: '0.1px',
							mt: '16px',
						}}
						onClick={handleGoBack}
					>
						Назад
					</Button>
				</>
			)}
		</div>
	);
};

export default SuccessRegister;
