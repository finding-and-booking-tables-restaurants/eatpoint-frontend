import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import DatePickerValue from '../DatePickerValue/DatePickerValue';
import TimePickerValue from '../TimePickerValue/TimePickerValue';
import NumberOfPerson from '../NumberOfPerson/NumberOfPerson';
import SearchBtn from '../SearchFormBtn/SearchBtn';
import Recomended from '../Recomended/Recomended';

function Main() {
	return (
		<>
			<Header />
			<section className="main">
				<SearchForm>
					<div className="main__flex-box">
						<DatePickerValue />
						<TimePickerValue />
					</div>
					<NumberOfPerson />
					<input
						className="main__search-input"
						placeholder="По названию, типу заведения "
					></input>
					<SearchBtn />
				</SearchForm>
				<Recomended nearest={false} link="Все" title="Рекомендации" />
				<Recomended nearest link="На карте" title="Ближайшие" />
			</section>
			<Footer />
		</>
	);
}

export default Main;
