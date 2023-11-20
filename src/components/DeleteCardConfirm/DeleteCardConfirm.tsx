import { Establishment } from '../../types/getMyRestaurantTypes';
import './DeleteCardConfirm.css';

interface DeleteCardConfirmProps {
	handleCloseDeleteModal?: () => void;
	isDeleteModalOpen?: boolean | undefined;
	deleteEstablishment?: (id: number | undefined | null) => void;
	selectedEstablishment?: Establishment | null;
}

function DeleteCardConfirm({
	handleCloseDeleteModal,
	isDeleteModalOpen,
	deleteEstablishment,
	selectedEstablishment,
}: DeleteCardConfirmProps) {
	return (
		<div
			className={`delete-card-confirm ${
				isDeleteModalOpen ? 'delete-card-confirm_active' : ''
			}`}
		>
			<div className="delete-card-confirm__container">
				<p className="delete-card-confirm__title">
					Удалить ресторан {selectedEstablishment?.name}?
				</p>
				<p className="delete-card-confirm__description">
					Ресторан, все события и все брони, относящиеся к нему удаляться
					безвозвратно.
				</p>
				<div className="delete-card-confirm__box-btns">
					<button
						className="delete-card-confirm__cancel"
						onClick={handleCloseDeleteModal}
					>
						Отменить
					</button>
					<button
						className="delete-card-confirm__delete"
						type="submit"
						onClick={() =>
							deleteEstablishment &&
							deleteEstablishment(selectedEstablishment?.id)
						}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteCardConfirm;
