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
	role: string;
}

interface ILoginFormData {
	email: string;
	password: string;
}

interface ILoginFormProps {
	onLogin: (data: ILoginFormData, rememberMe: boolean) => void;
	requestErrorMessage?: string;
}

interface IUserFormData {
	telephone: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
}

interface IUserFormProps {
	onUpdateUserInfo: (formData: IUserFormData) => void;
	requestStatus: {
		message: string;
		isSuccess: boolean;
	};
	resetRequestMessage: () => void;
}

export type {
	IRegisterFormData,
	IRegisterFormUserProps,
	ILoginFormData,
	ILoginFormProps,
	IUserFormData,
	IUserFormProps,
};
