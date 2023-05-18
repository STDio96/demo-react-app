import type React from 'react';
import type { RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import useAuthentication from "../../hooks/useAuthentication";

type ProtectedRouteProps = RouteProps & {
  component: React.ComponentType<any>;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { username, isInitialCheckComplete } = useAuthentication();

  if (!isInitialCheckComplete) {
    return <div>Loading...</div>;
  }

  if (username) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
