import './NotFoundPage.css';
import coffeeImg from '../../images/coffee.png';
import { Button, Typography, Stack } from '@mui/material';
import Header from '../Header/Header';

export default function NotFoundPage() {
	return (
		<>
			<Header />
			<main className="not-found-page__container">
				<div className="not-found-page__title-container">
					<h2 className="not-found-page__title">4</h2>
					<img src={coffeeImg} alt="кофе" />
					<h2 className="not-found-page__title">4</h2>
				</div>
				<p className="not-found-page__subtitle">{`Страница не найдена :(`}</p>
				<p className="not-found-page__text">
					К сожалению, такой страницы не существует.
				</p>
				<div className="not-found-page__buttons-container">
					<Button
						href="/"
						variant="outlined"
						style={{
							color: '#05887B',
							borderColor: '#05887B',
							borderRadius: '50px',
							textTransform: 'none',
						}}
					>
						Вернуться на Главную
					</Button>
				</div>
			</main>
		</>
	);
}
