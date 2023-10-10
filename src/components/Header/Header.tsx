import React from 'react';
import logo from '../../images/logo.svg';
import place from '../../images/place.svg';
import './Header.css';

const Header = () => {
	const handleNavClick = () => {};
	const handleSearchClick = () => {};
	const handleLocationClick = () => {};

	return (
		<header className="header">
			<img className="header__logo" src={logo} alt="лого" />
			<div onClick={handleLocationClick} className="header__location-btn">
				<img src={place} alt="" />
				<p className="header__location">{'Москва'}</p>
			</div>
			<button onClick={handleSearchClick} className="header__srch-btn"></button>
			<button onClick={handleNavClick} className="header__nav-btn"></button>
		</header>
	);
};

export default Header;
