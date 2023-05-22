import type React from 'react';
import { useContext } from 'react';
import type { RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';

type ProtectedRouteProps = RouteProps & {
  component: React.ComponentType<any>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, isDone } = useContext(AuthContext);

  if (!isDone) {
    return null;
  }

  if (isAuthenticated) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
