import React from 'react';
import { Navigate } from 'react-router-dom';
import RouteElementProps from '../../models/RouteElementProps';

const ProtectedRouteElement = ({ isLoggedIn, element }: RouteElementProps) => {
    return isLoggedIn ? <>{element}</> : <Navigate to="/signin" replace={true} />;
};

export default ProtectedRouteElement;