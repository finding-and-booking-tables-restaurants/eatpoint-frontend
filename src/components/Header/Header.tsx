import React, { useContext, useState } from 'react';
import logo from '../../images/logo.svg';
import place from '../../images/place.svg';
import './Header.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import cities from '../../fakeData/cities';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Header = ({
	handleRestart,
}: {
	handleRestart?: (value: boolean) => void;
}) => {
	const navigate = useNavigate();

	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;
	const role = useContext(CurrentUserContext).currentRole;
	const handleLogOut = useContext(CurrentUserContext).handleLogOut;

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
			{!isLoggedIn ? (
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
					<MenuItem id="/business" onClick={handleNavClose}>
						<KeyboardArrowRightIcon /> Для ресторанов
					</MenuItem>
				</Menu>
			) : role === 'client' ? (
				<Menu
					id="basic-menu"
					anchorEl={anchorElNav}
					open={openNav}
					onClose={handleNavClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem id="/user-profile" onClick={handleNavClose}>
						<KeyboardArrowRightIcon /> Профиль
					</MenuItem>
					<MenuItem id="/user-bookings" onClick={handleNavClose}>
						<KeyboardArrowRightIcon /> Мои брони
					</MenuItem>
					<MenuItem id="signout" onClick={handleLogOut}>
						<KeyboardArrowRightIcon /> Выход
					</MenuItem>
				</Menu>
			) : (
				<Menu
					id="basic-menu"
					anchorEl={anchorElNav}
					open={openNav}
					onClose={handleNavClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem id="/business-profile" onClick={handleNavClose}>
						<KeyboardArrowRightIcon /> Личный кабинет
					</MenuItem>
					<MenuItem id="signout" onClick={handleLogOut}>
						<KeyboardArrowRightIcon /> Выход
					</MenuItem>
				</Menu>
			)}
		</header>
	);
};

export default Header;
