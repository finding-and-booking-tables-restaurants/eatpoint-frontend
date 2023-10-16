import './AddRestaurant.css';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';

function AddRestaurant() {
	return (
		<section className="add-restaurant">
			<div>
				<button></button>
				<h2 className="add-restaurant__title">Новое заведение</h2>
			</div>
			<form>
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
		</section>
	);
}

export default AddRestaurant;
