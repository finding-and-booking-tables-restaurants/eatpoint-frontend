import './FilterMenu.css';
import FilterMenuProps from '../../models/propsInterfaces/FilterMenuProps';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';
import FilterMenuCheckBox from './FilterMenuCheckBox/FilterMenuCheckBox';

function FilterMenu({
	isOpen,
	setIsOpen,
	handleFilterKitchenClick,
	handleTypeFilterClick,
	handleCheckFilterClick,
	handleServiceFilterClick,
	selectedKitchenFilters,
	selectedTypeFilters,
	selectedCheckFilters,
	selectedServiceFilters,
}: FilterMenuProps) {
	function handleCloseBtn() {
		setIsOpen(false);
	}

	return (
		<div className={`filter-menu ${isOpen ? 'filter-menu_open' : ''}`}>
			<div className="filter-menu__container">
				<button
					className="filter-menu__close-btn"
					onClick={handleCloseBtn}
				></button>
				<h2 className="filter-menu__title">Фильтры</h2>
				<h3 className="filter-menu__category">Кухня</h3>
				<ul className="filter-menu__list">
					{availableKitchen.map((filter, i) => (
						<li key={i}>
							<button
								className={`filter-menu__filter-btn ${
									selectedKitchenFilters?.includes(filter)
										? 'filter-menu__filter-btn_active'
										: ''
								} `}
								onClick={() => {
									handleFilterKitchenClick(filter);
								}}
							>
								{filter}
							</button>
						</li>
					))}
				</ul>
				<h3 className="filter-menu__category">Средний чек</h3>
				<ul className="filter-menu__radio-list">
					<FilterMenuCheckBox
						text={'до 1000'}
						isChecked={selectedCheckFilters === 'до 1000'}
						onChange={() => handleCheckFilterClick('до 1000')}
					></FilterMenuCheckBox>
					<FilterMenuCheckBox
						text={'1000 - 2000'}
						isChecked={selectedCheckFilters === '1000 - 2000'}
						onChange={() => handleCheckFilterClick('1000 - 2000')}
					/>
					<FilterMenuCheckBox
						text={'2000 - 3000'}
						isChecked={selectedCheckFilters === '2000 - 3000'}
						onChange={() => handleCheckFilterClick('2000 - 3000')}
					/>
					<FilterMenuCheckBox
						text={'от 3000'}
						isChecked={selectedCheckFilters === 'от 3000'}
						onChange={() => handleCheckFilterClick('от 3000')}
					/>
				</ul>
				<h3 className="filter-menu__category">Тип заведения</h3>
				<ul className="filter-menu__list">
					{availableType.map((filter, i) => (
						<li key={i}>
							<button
								className={`filter-menu__filter-btn ${
									selectedTypeFilters?.includes(filter)
										? 'filter-menu__filter-btn_active'
										: ''
								} `}
								onClick={() => {
									handleTypeFilterClick(filter);
								}}
							>
								{filter}
							</button>
						</li>
					))}
				</ul>
				<h3 className="filter-menu__category">Особенности заведения</h3>
				<ul className="filter-menu__list">
					{availableService.map((filter, i) => (
						<li key={i}>
							<button
								className={`filter-menu__filter-btn ${
									selectedServiceFilters?.includes(filter)
										? 'filter-menu__filter-btn_active'
										: ''
								} `}
								onClick={() => {
									handleServiceFilterClick(filter);
								}}
							>
								{filter}
							</button>
						</li>
					))}
				</ul>
				<div className="filter-menu__pt-box">
					<a className="filter-menu__link" href="#search-results">
						<button className="filter-menu__link-btn" onClick={handleCloseBtn}>
							Применить фильтры
						</button>
					</a>
				</div>
			</div>
		</div>
	);
}

export default FilterMenu;
