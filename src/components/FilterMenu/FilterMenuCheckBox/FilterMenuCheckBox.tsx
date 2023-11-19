// import Ruble from '../../../images/filter-menu__RUBLb.svg';
import './FilterMenuCheckBox.css';

interface FilterMenuCheckBoxProps {
	text: string;
	isChecked: boolean;
	onChange: () => void;
}

function FilterMenuCheckBox({
	text,
	isChecked,
	onChange,
}: FilterMenuCheckBoxProps) {
	return (
		<li className="checkbox-item">
			<div className="checkbox-item__box">
				{/* <img className="checkbox-item__image" src={Ruble} alt="На рубль" /> */}
				{/* <p>{text}</p> */}
				<input
					type="checkbox"
					className="checkbox-item__input"
					name="example"
					value={text}
					onChange={onChange}
					checked={isChecked}
				/>
			</div>
			<p className="checkbox-item__name">{text}</p>
		</li>
	);
}

export default FilterMenuCheckBox;
