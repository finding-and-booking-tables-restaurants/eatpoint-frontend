import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import place from '../../images/place.svg';
import './Header.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import cities from '../../fakeData/cities';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const Header = ({
	handleRestart,
}: {
	handleRestart?: (value: boolean) => void;
}) => {
	const navigate = useNavigate();

	const [city, setCity] = useState('Москва');
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElCity, setAnchorElCity] = React.useState<null | HTMLElement>(
		null
	);

	const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleSearchClick = () => {};

	const openCityMenu = Boolean(anchorElCity);
	const openNav = Boolean(anchorElNav);

	const handleLocationClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorElCity(event.currentTarget);
	};
	const handleCityMenuClose = (event: React.MouseEvent<HTMLLIElement>) => {
		const selectedCity = (event.currentTarget as HTMLLIElement).innerText;
		setCity(selectedCity || city);
		setAnchorElCity(null);
	};

	const handleNavClose = (event: React.MouseEvent<HTMLLIElement>) => {
		navigate(event.currentTarget.id);
		setAnchorElNav(null);
	};

	const hadleLogoClick = () => {
		navigate('/');
		handleRestart && handleRestart(true);
	};

	return (
		<header className="header">
			<img
				onClick={hadleLogoClick}
				className="header__logo"
				src={logo}
				alt="лого"
			/>
			<div onClick={handleLocationClick} className="header__location-btn">
				<img src={place} alt="" />
				<p className="header__location">{city}</p>
			</div>
			<Menu
				id="basic-menu"
				anchorEl={anchorElCity}
				open={openCityMenu}
				onClose={handleCityMenuClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{cities.map((city: string, index: number) => (
					<MenuItem
						style={{ backgroundColor: '#FCF7E4' }}
						key={index}
						onClick={handleCityMenuClose}
					>
						{city}
					</MenuItem>
				))}
			</Menu>

			<button onClick={handleSearchClick} className="header__srch-btn"></button>
			<button onClick={handleNavClick} className="header__nav-btn"></button>
			<Menu
				id="basic-menu"
				anchorEl={anchorElNav}
				open={openNav}
				onClose={handleNavClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem id="/signin" onClick={handleNavClose}>
					<KeyboardArrowRightIcon /> Вход
				</MenuItem>
				<MenuItem id="/user-signup" onClick={handleNavClose}>
					<KeyboardArrowRightIcon /> Регистрация
				</MenuItem>
				<MenuItem id="/business-signup" onClick={handleNavClose}>
					<KeyboardArrowRightIcon /> Для ресторанов
				</MenuItem>
			</Menu>
		</header>
	);
};

export default Header;
