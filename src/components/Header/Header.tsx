import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/logo.svg';
import place from '../../images/place.svg';
import './Header.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchCity from '../SearchSity/SearchSity';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { handlePageReload } from '../../utils/pageReloader';
import { getCityNameByLocation } from '../../utils/getCityByLocation';
import { Button, InputAdornment, Link, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import { maxWidthBoxConfig, minWidthBoxConfig } from '../../utils/constants';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLoggedIn = useContext(CurrentUserContext).isLoggedIn;
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
	const [isSearchingRestorants, setIsSearchingRestorants] =
		React.useState(false);

	const handleNavClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleSearchClick = () => {
		setIsSearchingRestorants(!isSearchingRestorants);
	};

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

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [savedCity]);

	const [inputValue, setInputValue] = useState('');
	const history = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};
	const redirectToSearchPage = () => {
		if (inputValue) {
			history(`/?q=${inputValue}`);
		}
	};

	return (
		<>
			<Box
				component="header"
				display="flex"
				m="0 auto"
				gap="11px"
				alignItems="center"
				justifyContent="space-between"
				// minWidth={maxWidthBoxConfig}
				// maxWidth={minWidthBoxConfig}
				mr={{ xs: 2, sm: 5, md: 5, lg: 6 }}
				ml={{ xs: 2, sm: 5, md: 5, lg: 6 }}
				p="14px 0"
			>
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

				{location.pathname !== '/' && windowWidth < 700 && (
					<button
						onClick={handleSearchClick}
						className="header__srch-btn"
					></button>
				)}
				{windowWidth > 700 && (
					<TextField
						placeholder="Адрес, кухня, название"
						type="text"
						onKeyUp={(e) => {
							if (e.key === 'Enter' && inputValue) redirectToSearchPage();
						}}
						sx={{
							minWidth: '300px',
							maxWidth: '346px',
							height: '48px',
							backgroundColor: '#FDFAF2',
							borderRadius: '3px',
							'& .MuiInputBase-root': {
								borderRadius: '3px',
								height: '48px',
							},
							'& .MuiOutlinedInput-notchedOutline': {
								border: 'none',
							},
						}}
						autoComplete="off"
						value={inputValue}
						onChange={handleInputChange}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<button
										className="header__button-search"
										onClick={redirectToSearchPage}
									>
										<SearchIcon />
									</button>
								</InputAdornment>
							),
						}}
					/>
				)}
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
			</Box>
			<>
				{isSearchingRestorants && (
					<div className="header__search-input">
						<TextField
							label="Поиск"
							placeholder="Адрес, кухня, название"
							type="text"
							onKeyUp={(e) => {
								if (e.key === 'Enter' && inputValue) redirectToSearchPage();
							}}
							sx={{
								maxWidth: {
									xs: '100%',
									sm: '450px',
									md: '665px',
									lg: '665px',
								},
								minWidth: {
									xs: '100%',
									sm: '450px',
									md: '665px',
									lg: '665px',
								},
								backgroundColor: 'white',
								borderRadius: '8px',
								'& .MuiInputBase-root': {
									borderRadius: '8px',
								},
							}}
							autoComplete="off"
							value={inputValue}
							onChange={handleInputChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
						<Button
							onClick={redirectToSearchPage}
							variant="contained"
							type="submit"
							sx={{
								backgroundColor: '#05887B',
								textTransform: 'none',
								borderRadius: '8px',
								minHeight: '40px',
								minWidth: { xs: '100%', sm: '225px', md: '355px' },
							}}
						>
							Искать заведение
						</Button>
					</div>
				)}
			</>
		</>
	);
};

export default Header;
