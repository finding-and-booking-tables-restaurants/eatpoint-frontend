import { Link } from 'react-router-dom';

import './Help.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { helpInfoLinks, helpLinkList } from '../../utils/constants';

export default function Help() {
	return (
		<>
			<Header />
			<main className="help-page">
				<h1 className="help-page__title">Помощь</h1>
				<nav className="help-page__nav">
					<ol className="help-page__nav-list">
						{helpLinkList.map((el, i) => {
							return (
								<li key={i} className="help-page__nav-el">
									<a className="help-page__nav-link" href={`#link-${i + 1}`}>
										{i + 1}. {el}
									</a>
								</li>
							);
						})}
					</ol>
				</nav>
				<ul className="help-page__info">
					{helpInfoLinks.map((el, i) => {
						return (
							<>
								<p key={i} className="help-page__subtitle" id={`link-${i + 1}`}>
									{el.title}
								</p>
								<ul className="help-page__info-list">
									{el.child?.map((link) => (
										<li className="help-page__info-el">
											<Link to={link.url} className="help-page__nav-link">
												{link.text}
											</Link>
										</li>
									))}
								</ul>
							</>
						);
					})}
				</ul>
			</main>
			<Footer />
		</>
	);
}
