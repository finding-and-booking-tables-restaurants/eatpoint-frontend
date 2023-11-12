import './DeleteCardConfirm.css';
import React from 'react';

interface DeleteCardConfirmProps {
	isOpen: boolean;
	isClose: (_: boolean) => void;
	title: string;
}

function DeleteCardConfirm({ isOpen, isClose, title }: DeleteCardConfirmProps) {
	function handleCloseBtn() {
		isClose(false);
	}
	return (
		<div
			className={`delete-card-confirm ${
				isOpen ? 'delete-card-confirm_active' : ''
			}`}
		>
			<div className="delete-card-confirm__container">
				<h3 className="delete-card-confirm__title">{title}</h3>
				<p className="delete-card-confirm__description">
					Ресторан, все события и все брони, относящиеся к нему удаляться
					безвозвратно.
				</p>
				<div className="delete-card-confirm__box-btns">
					<button
						className="delete-card-confirm__cancel"
						onClick={handleCloseBtn}
					>
						Отменить
					</button>
					<button className="delete-card-confirm__delete">Удалить</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteCardConfirm;
