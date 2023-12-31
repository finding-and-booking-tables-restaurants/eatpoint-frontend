import './InputsZone.css';
import { useState } from 'react';
import { Zone } from '../../../types/addRestaurantTypes';

interface InputsZoneProps {
	onRemove: (i: number) => void;
	index: number;
	onAddZone: (value: string, index: number) => void;
	onAddSeats: (value: number, index: number) => void;
	formData?: Zone[] | undefined;
	// register?: UseFormRegister<RestaurantData> | undefined;

	// formData?: [{ zone: string; seats: number }];
}

function InputsZone({
	onRemove,
	index,
	onAddZone,
	onAddSeats,
	formData = [],
}: InputsZoneProps) {
	// console.log(formData[index]?.zone);
	// console.log(formData[index]?.seats);

	return (
		<div className="input-zone__flex-box">
			<input
				className="input-zone__place"
				type="text"
				placeholder="Зал"
				maxLength={30}
				name="zones"
				value={formData[index]?.zone || ''}
				required
				// value={formData && formData[index] ? formData[index].zone : ''}
				// onChange={(evt) => onAddZone(evt.target?.value, index)}
				onChange={(evt) => {
					onAddZone(evt.target.value, index);
				}}
			/>
			<input
				className="input-zone__num"
				type="number"
				placeholder="Мест"
				maxLength={4}
				max={100}
				name="seats"
				value={formData[index]?.seats || ''}
				required
				// value={formData && formData[index] ? formData[index].seats : ''}
				// onChange={(evt) => onAddSeats(parseInt(evt.target.value), index)}
				onChange={(evt) => {
					const value = parseInt(evt.target.value, 10);
					const newValue: number = isNaN(value) ? 0 : Math.min(value, 100);
					onAddSeats(newValue, index);
				}}
			/>

			{index !== 0 && (
				<button
					type="button"
					className="input-zone__close-btn"
					onClick={() => onRemove(index)}
				></button>
			)}
		</div>
	);
}

export default InputsZone;
