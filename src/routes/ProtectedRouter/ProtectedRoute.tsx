import type React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = RouteProps & {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  // TODO: rework
  if (isAuthenticated) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
