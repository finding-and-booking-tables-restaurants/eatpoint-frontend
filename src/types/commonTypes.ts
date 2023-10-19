interface IRegisterFormData {
	telephone: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
	is_agreement: boolean;
	role: string;
	confirm_code_send_method: string;
}

interface IRegisterFormUserProps {
	onRegistration: (data: IRegisterFormData) => void;
	requestErrorMessage: string;
}

export type { IRegisterFormData, IRegisterFormUserProps };
