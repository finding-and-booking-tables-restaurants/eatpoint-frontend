import React from 'react';
import { Navigate } from 'react-router-dom';

interface RouteElementProps {
	isLoggedIn: boolean;
	element: React.ReactNode;
}

const ProtectedClientRouteElement = ({
	isLoggedIn,
	element,
}: RouteElementProps) => {
	return isLoggedIn ? <>{element}</> : <Navigate to="/" replace={true} />;
};

export default ProtectedClientRouteElement;
