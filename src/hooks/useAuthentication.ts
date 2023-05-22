import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

interface AuthenticationActions {
  logout: () => void;
}

const useAuthentication = (): AuthenticationActions => {
  const { contextLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = (): void => {
    contextLogout();
    navigate('/login');
  };

  return {
    logout,
  };
};

export default useAuthentication;
