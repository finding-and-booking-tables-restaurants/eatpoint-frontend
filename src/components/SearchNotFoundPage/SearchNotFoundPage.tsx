import './SearchNotFoundPage.css';
import saucer from '../../images/saucer.png';
import Header from '../Header/Header';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SearchNotFoundPage() {
	return (
		<>
			<Header />
			<main className="search-not-found-page__main">
				<img
					className="search-not-found-page__image"
					src={saucer}
					alt="разбитое блюдце"
				/>
				<h3 className="search-not-found-page__subtitle">
					По вашему запросу ничего не найдено :(
				</h3>
				<p className="search-not-found-page__text">
					К сожалению, по вашему запросу ничего не найдено, попробуйте изменить
					параметры поиска
				</p>
				<div className="not-found-page__buttons-container">
					<Stack direction="column" spacing={2.3}>
						<Button
							href="/"
							variant="contained"
							style={{ backgroundColor: '#00645A' }}
						>
							Новый Поиск
						</Button>
						<Button
							href="/"
							variant="outlined"
							style={{ color: '#00645A', borderColor: '#00645A' }}
						>
							Вернуться на Главную
						</Button>
					</Stack>
				</div>
			</main>
		</>
	);
}
