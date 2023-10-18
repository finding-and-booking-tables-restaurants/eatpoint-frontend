import './AddRestaurant.css';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';
import FilterMenuCheckBox from '../FilterMenu/FilterMenuCheckBox/FilterMenuCheckBox';

function AddRestaurant() {
	return (
		<section className="add-restaurant">
			<div className="add-restaurant__box">
				<button className="add-restautant__backBtn"></button>
				<h2 className="add-restaurant__title">Новое заведение</h2>
			</div>
			<form className="add-restaurant__form">
				<input className="add-restaurant__input" placeholder="Название" />
				<input className="add-restaurant__input" placeholder="Город" />
				<input className="add-restaurant__input" placeholder="Адрес" />
				<input
					className="add-restaurant__input"
					placeholder="Телефон (+7 *** ***-**-**)"
				/>
			</form>
			<h3 className="add-restaurant__category">Тип заведения</h3>
			<ul className="add-restaurant__list">
				{availableType.map((item, i) => (
					<li key={i}>
						<button className="add-restaurant__option-btn">{item}</button>
					</li>
				))}
			</ul>
			<h3 className="add-restaurant__category">Кухня</h3>
			<ul className="add-restaurant__list">
				{availableKitchen.map((item, i) => (
					<li key={i}>
						<button className="add-restaurant__option-btn">{item}</button>
					</li>
				))}
			</ul>
			<h3 className="add-restaurant__category">
				Типы столов и количество мест
			</h3>
			<p className="add-restaurant__description">
				Можно добавить любые типы столов и их доступное количество мест,
				например, «на терассе — 16».
			</p>
			<form className="add-restaurant__add-form">
				<div className="add-restaurant__flex-box">
					<input
						className="add-restaurant__input-place"
						placeholder="Основной зал"
					></input>
					<input
						className="add-restaurant__input-place_num"
						placeholder="Мест"
					></input>
				</div>
				<button className="add-restaurant__moreBtn">Еще</button>
			</form>
			<h3 className="add-restaurant__category">Средний чек</h3>
			<ul className="add-restaurant__radio-list">
				<FilterMenuCheckBox text={'до 1000'} />
				<FilterMenuCheckBox text={'1000 - 2000'} />
				<FilterMenuCheckBox text={'2000 - 3000'} />
				<FilterMenuCheckBox text={'от 3000'} />
			</ul>
			<h3 className="add-restaurant__category">Услуги</h3>
			<ul className="add-restaurant__list">
				{availableService.map((item, i) => (
					<li key={i}>
						<button className="add-restaurant__option-btn">{item}</button>
					</li>
				))}
			</ul>
			<h3 className="Описание"></h3>
			<input className="add-restaurant__text-area" type="text-area"></input>
		</section>
	);
}

export default AddRestaurant;
