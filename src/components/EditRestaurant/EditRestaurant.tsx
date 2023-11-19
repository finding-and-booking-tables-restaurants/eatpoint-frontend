import { useState, useEffect, ChangeEvent } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FilterMenuCheckBox from '../FilterMenu/FilterMenuCheckBox/FilterMenuCheckBox';
import SelectWorkTime from '../AddRestaurant/SelectWorkTime/SelectWorkTime';
import {
	availableKitchen,
	availableType,
	availableService,
} from '../../utils/constants';
import { RestaurantData } from '../../types/addRestaurantTypes';
import { mainApi } from '../../utils/mainApi';
import { daysOfWeek } from '../../utils/constants';
import InputsZone from '../AddRestaurant/InputsZone/InputsZone';
import { InputsZoneData } from '../../types/InputsZoneData';

interface ImageFile {
	file: File;
	preview: string;
}

function EditRestaurant() {
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		mainApi.getMyEstablishmentById(id).then((res) => {
			setFormData(res);
			setSelectedCheckFilters(res.average_check);
			setInputsZone(res.zones);
		});
	}, [id]);

	const [formData, setFormData] = useState<RestaurantData>({
		name: '',
		types: [],
		cities: '',
		address: '',
		kitchens: [],
		services: [],
		zones: [],
		average_check: '',
		poster: '',
		email: '',
		telephone: '',
		description: '',
		worked: [],
		images: [],
	});

	console.log(formData);

	const [loading, setLoading] = useState(true);
	const [selectedCheckFilters, setSelectedCheckFilters] = useState<string>(
		formData.average_check || ''
	);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
		[key: string]: boolean;
	}>({});

	const [inputsZone, setInputsZone] = useState<InputsZoneData[]>([]);
	const [selectedImageFile, setSelectedImageFiles] = useState<ImageFile[]>([]);

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const addInputsZoneComponent = () => {
		setInputsZone([...inputsZone, { zone: '', seats: 0 }]);
	};

	const removeInputsZoneComponent = (index: number) => {
		const newComponents = [...inputsZone];
		newComponents.splice(index, 1);
		setInputsZone(newComponents);
	};

	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		const checkboxName = name;

		if (availableType.includes(checkboxName)) {
			setFormData((prevData) => ({
				...prevData,
				types: checked
					? [...prevData.types, checkboxName]
					: prevData.types.filter((type) => type !== checkboxName),
			}));
		} else if (availableKitchen.includes(checkboxName)) {
			setFormData((prevData) => ({
				...prevData,
				kitchens: checked
					? [...prevData.kitchens, checkboxName]
					: prevData.kitchens.filter((kitchen) => kitchen !== checkboxName),
			}));
		} else if (availableService.includes(checkboxName)) {
			setFormData((prevData) => ({
				...prevData,
				services: checked
					? [...prevData.services, checkboxName]
					: prevData.services.filter((service) => service !== checkboxName),
			}));
		}

		setSelectedCheckboxes((prevSelectedTypes) => ({
			...prevSelectedTypes,
			[name]: checked,
		}));
	};

	const handleCheckFilterClick = (filter: string) => {
		setSelectedCheckFilters(filter);
		setFormData((prevData) => ({
			...prevData,
			average_check: filter,
		}));
	};

	const handleTimeChange = (day: string, start: string, end: string) => {
		setFormData((prevData) => {
			const updatedWorked = prevData.worked.map((workedDay) => {
				if (workedDay.day === day) {
					return {
						...workedDay,
						start,
						end,
					};
				} else {
					return workedDay;
				}
			});

			return {
				...prevData,
				worked: updatedWorked,
			};
		});
	};

	const handleAddZone = (value: string, index: number) => {
		setFormData((prevData) => {
			const updatedZones = [...prevData.zones];
			updatedZones[index] = { ...updatedZones[index], zone: value };
			return {
				...prevData,
				zones: updatedZones,
			};
		});
	};

	const handleAddSeats = (value: number, index: number) => {
		setFormData((prevData) => {
			const updatedZones = [...prevData.zones];
			updatedZones[index] = { ...updatedZones[index], seats: value };
			return {
				...prevData,
				zones: updatedZones,
			};
		});
	};

	function handlePosterFileInputChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = function (e: ProgressEvent<FileReader>) {
				const base64String = e.target?.result as string;

				setFormData({
					...formData,
					poster: base64String,
				});
				// console.log('Base64-строка изображения:', base64String);
			};
			reader.readAsDataURL(file);
		} else {
			setFormData({ ...formData, poster: undefined });
		}
	}

	const handleImagesFileInputChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		let newFiles: ImageFile[] = [];

		if (files) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				const reader = new FileReader();

				reader.onloadend = () => {
					newFiles.push({
						file: file,
						preview: reader.result as string,
					});

					if (newFiles.length === files.length) {
						setSelectedImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
					}
				};

				reader.readAsDataURL(file);
			}
		}
	};

	const handleDeleteImageFile = (index: number) => {
		setSelectedImageFiles((prevFiles) => {
			const newFiles = [...prevFiles];
			newFiles.splice(index, 1);
			return newFiles;
		});
	};

	async function handleSubmit(evt: React.FormEvent) {
		evt.preventDefault();

		const formDataSend = {
			name: formData.name,
			types: formData.types,
			cities: formData.cities,
			address: formData.address,
			kitchens: formData.kitchens,
			services: formData.services,
			zones: formData.zones,
			average_check: formData.average_check,
			poster: formData.poster,
			email: formData.email,
			telephone: formData.telephone,
			description: formData.description,
			worked: formData.worked,
		};

		mainApi
			.editMyEstablishment(formDataSend, id)
			.then((res) => {
				setFormData(res);
				navigate('/business-profile');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		mainApi.getMyEstablishmentById(id).then((res) => {
			setFormData(res);
			setLoading(false);
		});
	}, [id]);

	if (loading) {
		return <p>Loading...</p>;
	}

	// console.log(formData.images
	// 		return item.name;
	// 	})
	// );

	return (
		<>
			<Header />
			<section className="add-restaurant">
				<div className="add-restaurant__box">
					<Link to="/business-profile" className="add-restautant__backBtn" />
					<h2 className="add-restaurant__title">Редактировать заведение</h2>
				</div>
				<form className="add-restaurant__form" onSubmit={handleSubmit}>
					<input
						className="add-restaurant__input"
						placeholder="Название"
						type="text"
						maxLength={30}
						name="name"
						value={formData.name || ''}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Город"
						type="text"
						maxLength={30}
						name="cities"
						value={formData.cities || ''}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Адрес"
						type="text"
						maxLength={30}
						name="address"
						value={formData.address || ''}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Телефон (+7 *** ***-**-**)"
						type="text"
						name="telephone"
						minLength={11}
						maxLength={12}
						value={formData.telephone || ''}
						onChange={handleInputChange}
						required
					/>
					<input
						className="add-restaurant__input"
						placeholder="Email заведения"
						type="email"
						name="email"
						value={formData.email || ''}
						onChange={handleInputChange}
						required
					/>
					<h3 className="add-restaurant__category">Тип заведения</h3>
					<ul className="add-restaurant__list">
						{availableType.map((item, i) => (
							<li className="add-restaurant__item" key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name={item}
									id={item}
									defaultChecked={formData.types.includes(item)}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category">Кухня</h3>
					<ul className="add-restaurant__list">
						{availableKitchen.map((item, i) => (
							<li className="add-restaurant__item" key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name={item}
									id={item}
									defaultChecked={formData.kitchens.includes(item)}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category">
						Типы столов и количество мест
					</h3>
					<p className="add-restaurant__description">
						Можно добавить любые типы столов и их доступное количество мест,
						например, «на терассе — 16».
					</p>
					{inputsZone.map((_, index) => (
						<InputsZone
							key={index}
							index={index}
							onRemove={removeInputsZoneComponent}
							onAddZone={handleAddZone}
							onAddSeats={handleAddSeats}
							formData={formData.zones}
						/>
					))}

					<button
						className="add-restaurant__moreBtn"
						type="button"
						onClick={addInputsZoneComponent}
					>
						Добавить еще
					</button>
					<h3 className="add-restaurant__category">Режим работы (от, до)</h3>
					<div>
						{daysOfWeek.map((day, index) => {
							const dayData = formData?.worked[index];
							return (
								<SelectWorkTime
									key={day}
									text={day}
									onTimeChange={handleTimeChange}
									selectedTimeStart={dayData ? dayData.start : ''}
									selectedTimeEnd={dayData ? dayData.end : ''}
								/>
							);
						})}
					</div>
					<h3 className="add-restaurant__category">Средний чек</h3>
					<ul className="add-restaurant__radio-list">
						<FilterMenuCheckBox
							text={'до 1000'}
							isChecked={selectedCheckFilters === 'до 1000'}
							onChange={() => handleCheckFilterClick('до 1000')}
						/>
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
					<h3 className="add-restaurant__category">Услуги</h3>
					<ul className="add-restaurant__list">
						{availableService.map((item, i) => (
							<li className="add-restaurant__item" key={i}>
								<input
									className="add-restaurant__option-btn"
									type="checkbox"
									name={item}
									id={item}
									defaultChecked={formData.services.includes(item)}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor={item} className="add-restaurant__label">
									{item}
								</label>
							</li>
						))}
					</ul>
					<h3 className="add-restaurant__category_padding-bot">Описание</h3>
					<textarea
						className="add-restaurant__text-area"
						name="description"
						maxLength={500}
						value={formData.description || ''}
						onChange={handleInputChange}
					></textarea>
					<h3 className="add-restaurant__category_padding-bot">Фотография</h3>
					<div className="add-restaurant__flex-box-file">
						{formData.poster ? (
							<img
								className="add-restaurant__poster"
								src={
									typeof formData.poster === 'string'
										? formData.poster
										: undefined
								}
								alt="Poster"
							/>
						) : null}
						<div className="input__wrapper">
							<input
								className="input__file"
								name="filePoster"
								type="file"
								accept="image/*"
								id="filePoster"
								onChange={handlePosterFileInputChange}
							/>
							<label htmlFor="filePoster" className="input__file-button">
								<span className="input__file-button-text">Добавить фото</span>
							</label>
						</div>
					</div>
					<h3 className="add-restaurant__category_padding-bot">Фотографии</h3>
					<div className="add-restaurant__box-images">
						{formData.images
							? formData?.images.map((file, index: number) => (
									<div className="input-file__background" key={index}>
										<img
											src={file.image}
											alt={`Preview ${index}`}
											className="input-file__image"
										/>
										<button
											type="button"
											className="input-file__delete-image"
											// onClick={() => handleDeleteImageFile(index)}
										></button>
									</div>
							  ))
							: null}
						{selectedImageFile.map((file, index) => (
							<div className="input-file__background" key={index}>
								<img
									src={file.preview}
									alt={`Preview ${index}`}
									className="input-file__image"
								/>
								<button
									type="button"
									className="input-file__delete-image"
									onClick={() => handleDeleteImageFile(index)}
								></button>
							</div>
						))}
					</div>
					<div className="add-restaurant__flex-box-file">
						<div className="input__wrapper">
							<input
								className="input__file"
								name="file"
								type="file"
								accept="image/*"
								id="input__file"
								multiple
								onChange={handleImagesFileInputChange}
							/>
							<label htmlFor="input__file" className="input__file-button">
								<span className="input__file-button-text">Добавить фото</span>
							</label>
						</div>
					</div>
					<button className="add-restaurant__submit-btn" type="submit">
						Сохранить
					</button>
				</form>
				<Link to="/business-profile" className="add-restaurant__back-btn">
					Назад
				</Link>
			</section>
			<Footer />
		</>
	);
}

export default EditRestaurant;
