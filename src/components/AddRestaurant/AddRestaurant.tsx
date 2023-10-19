import './AddRestaurant.css';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';
import FilterMenuCheckBox from '../FilterMenu/FilterMenuCheckBox/FilterMenuCheckBox';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SelectWorkTime from './SelectWorkTime/SelectWorkTime';

function AddRestaurant() {
	return (
		<>
			<Header />
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
					<h3 className="add-restaurant__category">Тип заведения</h3>
					<ul className="add-restaurant__list">
						{availableType.map((item, i) => (
							<li key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name=""
								></input>
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
					<div className="add-restaurant__flex-box">
						<input
							className="add-restaurant__input-place"
							placeholder="Основной зал"
						></input>
						<input
							className="add-restaurant__input-place_num"
							placeholder="Мест"
						/>
					</div>
					<button className="add-restaurant__moreBtn">Еще</button>
					<h3 className="add-restaurant__category">Режим работы (от, до)</h3>
					<SelectWorkTime text={'Пн'} />
					<SelectWorkTime text={'Вт'} />
					<SelectWorkTime text={'Ср'} />
					<SelectWorkTime text={'Чт'} />
					<SelectWorkTime text={'Пт'} />
					<SelectWorkTime text={'Сб'} />
					<SelectWorkTime text={'Вс'} />
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
					<h3 className="add-restaurant__category_padding-bot">Описание</h3>
					<textarea className="add-restaurant__text-area"></textarea>
					<h3 className="add-restaurant__category_padding-bot">Фотографии</h3>
					<input
						className="add-restaurant__input"
						placeholder="Ссылка на фотографию"
					></input>
					<button className="add-restaurant__submit-btn">
						Добавить заведение
					</button>
				</form>
			</section>
			<Footer />
		</>
	);
}

export default AddRestaurant;
