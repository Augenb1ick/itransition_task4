import { Navigate } from 'react-router-dom';
import RouteElementProps from '../../models/RouteElementProps';

const UnprotectedRouteElement = ({ isLoggedIn, element }: RouteElementProps) => {
    return !isLoggedIn ? <>{element}</> : <Navigate to='/' replace={true} />;
};

export default UnprotectedRouteElement;