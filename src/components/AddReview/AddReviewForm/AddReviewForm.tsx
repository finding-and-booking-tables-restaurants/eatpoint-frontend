import { ReactNode } from 'react';
import './AddReviewForm.css';

interface AddReviewFormProps {
	children: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
	children,
	onSubmit,
}) => {
	function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
		evt.preventDefault();
		if (onSubmit) {
			onSubmit(evt);
		}
	}
	return (
		<form onSubmit={handleSubmit} id="sendReview" className="add-review-form">
			{children}
		</form>
	);
};

export default AddReviewForm;
