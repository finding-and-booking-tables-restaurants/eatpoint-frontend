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
	requestErrorMessage?: string;
	isSuccessRegister: boolean;
}

interface ILoginFormData {
	email: string;
	password: string;
}

interface ILoginFormProps {
	onLogin: (data: ILoginFormData) => void;
	requestErrorMessage?: string;
}

export type {
	IRegisterFormData,
	IRegisterFormUserProps,
	ILoginFormData,
	ILoginFormProps,
};
