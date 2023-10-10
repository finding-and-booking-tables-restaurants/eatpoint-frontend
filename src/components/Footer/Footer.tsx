import React from 'react';
import './Footer.css';
import logoFooter from '../../images/logo-footer.svg';
import arrow from '../../images/arrow-icon.svg';
import FooterLinkProps from '../../models/propsInterfaces/FooterLinkProps';
import { Link } from 'react-router-dom';

const FooterLink: React.FC<FooterLinkProps> = ({ text, link }) => (
	<Link to={link} className="footer__nav-links">
		<img className="footer__nav-img" src={arrow} alt="стрелочка" />
		<p className="footer__nav-text">{text}</p>
	</Link>
);

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<img className="footer__logo" src={logoFooter} alt="лого" />
			<nav className="footer__nav-container">
				<FooterLink text="Помощь" link="/help" />
				<FooterLink text="Сообщить о проблеме" link="/support" />
			</nav>
		</footer>
	);
};

export default Footer;
