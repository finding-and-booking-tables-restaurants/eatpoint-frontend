import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/logo.svg';
import place from '../../images/place.svg';
import './Header.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchCity from '../SearchSity/SearchSity';
import cities from '../../fakeData/cities';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { handlePageReload } from '../../utils/pageReloader';
import { getCityNameByLocation } from '../../utils/getCityByLocation';
import { Link } from '@mui/material';

const Header = ({
	handleRestart,
}: {
	handleRestart?: (value: boolean) => void;
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;

	const chechLocation = (path: string) => {
		return location.pathname === path ? true : false;
	};

	let role = useContext(CurrentUserContext).currentRole;
	if (!role) role = 'client';
	const handleLogOut = useContext(CurrentUserContext).handleLogOut;

	const savedCity = localStorage.getItem('city');

	const [city, setCity] = useState(savedCity || 'Москва');
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

	const handleNavClose = (event: React.MouseEvent<HTMLLIElement>) => {
		setAnchorElNav(null);
		const clickPath = event.currentTarget.id;
		if (clickPath === 'basic-menu') return;
		if (clickPath === location.pathname) handlePageReload();
		navigate(clickPath);
	};

	// const hadleLogoClick = () => {
	// 	navigate('/');
	// 	handleRestart && handleRestart(true);
	// };

	useEffect(() => {
		if (localStorage.getItem('city')) return;
		getCityNameByLocation()
			.then((city) => {
				if (!city) return;
				localStorage.setItem('city', city);
				setCity(city);
			})
			.catch((err) => console.log(err));
		localStorage.setItem('city', 'Москва');
	}, [savedCity]);

	return (
		<header className="header">
			<Link href="/">
				<img className="header__logo" src={logo} alt="лого" />
			</Link>
			<div onClick={handleLocationClick} className="header__location-btn">
				<img src={place} alt="" />
				<p className="header__location">{city}</p>
			</div>
			{openCityMenu && (
				<SearchCity onClose={() => setAnchorElCity(null)} setSity={setCity} />
			)}

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
					<MenuItem
						id={`${
							chechLocation('/business') || chechLocation('/business-signup')
								? '/business-signup'
								: '/user-signup'
						}`}
						onClick={handleNavClose}
					>
						<KeyboardArrowRightIcon /> Регистрация
					</MenuItem>
					{!chechLocation('/business') && (
						<MenuItem id="/business" onClick={handleNavClose}>
							<KeyboardArrowRightIcon /> Для ресторанов
						</MenuItem>
					)}
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
