import React from 'react';
import { Button } from '@mui/material';
import './SuccessRegister.css';

const SuccessRegister = ({ userEmail }: { userEmail: string }) => {
	return (
		<div className="success-register">
			<h2 className="success-register__title">Вы успешно зарегестрированы!</h2>
			<p className="success-register__message">
				Сообщение с данными регистрации было отправлено Вам на почту
			</p>
			<p className="success-register__user-email">{userEmail}</p>
			<Button></Button>
		</div>
	);
};

export default SuccessRegister;
