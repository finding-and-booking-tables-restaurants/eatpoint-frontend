import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './SuccessRegister.css';

const SuccessRegister = ({ userEmail }: { userEmail: string }) => {
	const navigate = useNavigate();

	const handleGoHomeBtnClick = () => {
		navigate('/');
	};

	return (
		<div className="success-register">
			<h2 className="success-register__title">Вы успешно зарегистрированы!</h2>
			<p className="success-register__message">
				Сообщение с данными регистрации было отправлено Вам на почту
			</p>
			<p className="success-register__user-email">{userEmail}</p>
			<Button
				variant="contained"
				sx={{
					width: '100%',
					height: '48px',
					borderRadius: '50px',
					backgroundColor: '#05887B',
					textTransform: 'none',
					fontSize: '16px',
					fontWeight: '500',
					lineHeight: '20px',
					letterSpacing: '0.1px',
				}}
				onClick={handleGoHomeBtnClick}
			>
				Вернуться на главную
			</Button>
		</div>
	);
};

export default SuccessRegister;
