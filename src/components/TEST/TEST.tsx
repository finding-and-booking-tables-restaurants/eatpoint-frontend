import { useState, useEffect, useRef } from 'react';
import './TEST.css';

interface FileInputProps {
	label?: string;
	onChange: (file: string | null | File | undefined) => void;
	file?: string | null | File | undefined;
}

const FileInput = ({ label, onChange, file = null }: FileInputProps) => {
	const [currentFile, setCurrentFile] = useState<String | File | null>(null);
	const fileInput = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (file !== currentFile) {
			setCurrentFile(file);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	const getBase64 = (file: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			if (typeof reader.result === 'string') {
				setCurrentFile(reader.result);
				onChange(reader.result);
			} else {
				console.log('Error: reader.result is not a string');
			}
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};
	};

	return (
		<div className="container">
			<label className="label">{label}</label>
			<input
				className="fileInput"
				type="file"
				ref={fileInput}
				onChange={(e: any) => {
					const file = e.target.files[0];
					getBase64(file);
				}}
			/>
			<div
				onClick={() => {
					if (fileInput.current) {
						fileInput.current?.click();
					}
				}}
				className="button"
			>
				Выбрать файл
			</div>
			{/* {currentFile && (
				<div
					className="image"
					style={{
						backgroundImage: `url(${currentFile})`,
					}}
				/>
			)} */}
		</div>
	);
};

export default FileInput;
