import React from 'react';

import './BusinessLanding.css';

import geo from '../../images/BusinessLanding/Location.svg';
import arrow from '../../images/BusinessLanding/arrow.svg';

const BusinessLanding: React.FC = () => {
	const handleStart = () => {};
	const handleRegister = () => {};

	return (
		<main className="business">
			<section className="promo">
				<div className="promo__container">
					<h2 className="promo__title">
						Откройте лучшее решение для бронирования столиков
					</h2>
					<button className="promo__button" onClick={handleStart}>
						Начать сейчас
					</button>
				</div>
			</section>
			<section className="advantages">
				<h2 className="business__title">
					Почему мы
					<img className="business__title-image" src={geo} alt="geo" />
				</h2>
				<ul className="advantages__list">
					<li className="advantages__item">
						<div className="advantages__text-container">
							<h3 className="advantages__item-title">
								<span className="business__text-accent">Простая</span> форма
								регистрации
							</h3>
							<p className="advantages__text">
								Простая и удобная форма регистрации ресторана позволит быстро
								добавить информацию о вашем заведении
							</p>
						</div>
					</li>
					<li className="advantages__item">
						<div className="advantages__text-container">
							<h3 className="advantages__item-title">
								Расширение клиентской базы
							</h3>
							<p className="advantages__text">
								Ваш ресторан будет{' '}
								<span className="business__text-accent">
									виден в приложении
								</span>
								,&nbsp;что повысит видимость перед пользователями
							</p>
						</div>
					</li>
					<li className="advantages__item">
						<div className="advantages__text-container">
							<h3 className="advantages__item-title">
								Доступность в режиме{' '}
								<span className="business__text-accent">реального времени</span>
							</h3>
							<p className="advantages__text">
								Простое бронирование столиков Улучшите впечатления ваших
								клиентов от посещения ресторана
							</p>
						</div>
					</li>
					<li className="advantages__item">
						<div className="advantages__text-container">
							<h3 className="advantages__item-title">Аналитика</h3>
							<p className="advantages__text">
								Анализ данных о бронировании{' '}
								<span className="business__text-accent">Оптимизация</span>{' '}
								работы ресторана Просмотр отзывов клиентов
							</p>
						</div>
					</li>
					<li className="advantages__item">
						<div className="advantages__text-container">
							<h3 className="advantages__item-title">
								Удобство в использовании
							</h3>
							<p className="advantages__text">
								Доступ с любого устройства{' '}
								<span className="business__text-accent">Управляйте</span>
								&nbsp;бронированием{' '}
								<span className="business__text-accent">на ходу</span>
							</p>
						</div>
					</li>
				</ul>
			</section>
			<section className="support">
				<h2 className="support__title">
					Мы <span className="business__text-accent">поддерживаем</span>{' '}
					вас на каждом шаге
				</h2>
				<div className="support__image" />
			</section>
			<section className="faq">
				<h2 className="business__title">
					Как работает Eatpoint
					<img className="business__title-image" src={geo} alt="geo" />
				</h2>
				<ul className="faq__list">
					<li className="faq__item">
						<p className="faq__text">
							<img src={arrow} alt="" className="faq__item-image" />
							Вы регистрируетесь в приложении
						</p>
					</li>
					<li className="faq__item">
						<p className="faq__text">
							<img src={arrow} alt="" className="faq__item-image" />
							Добавляете своё заведение
						</p>
					</li>
					<li className="faq__item">
						<p className="faq__text">
							<img src={arrow} alt="" className="faq__item-image" />
							Получаете информацию о бронировании и подтверждаете бронь
						</p>
					</li>
					<li className="faq__item">
						<p className="faq__text">
							<img src={arrow} alt="" className="faq__item-image" />
							Получаете обратную связь от посетителей
						</p>
					</li>
					<li className="faq__item">
						<p className="faq__text">
							<img src={arrow} alt="" className="faq__item-image" />
							Смотрите статистику и отчёты по посещению ресторана
						</p>
					</li>
				</ul>
			</section>
			<section className="register">
				<h2 className="register__title">
					Сделайте первый шаг -
					<span className="business__text-accent">зарегистрируйтесь</span>{' '}
					сегодня
				</h2>
				<button className="register__button" onClick={handleRegister}>
					Зарегистрироваться
				</button>
			</section>
		</main>
	);
};

export default BusinessLanding;
