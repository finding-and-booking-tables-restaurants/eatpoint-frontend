import React from 'react';
import { Navigate } from 'react-router-dom';

interface RouteElementProps {
	isLoggedIn: boolean;
	element: React.ReactNode;
	role: string;
}

const ProptectedBusinessRouteElement = ({
	isLoggedIn,
	element,
	role,
}: RouteElementProps) => {
	return isLoggedIn && role === 'restorateur' ? (
		<>{element}</>
	) : (
		<Navigate to="/" replace={true} />
	);
};

export default ProptectedBusinessRouteElement;
