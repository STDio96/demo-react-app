import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOCALSTORAGE_AUTH_KEY } from '../constants';

interface AuthenticationState {
  username: string | null;
  isInitialCheckComplete: boolean;
}

interface AuthenticationActions {
  login: (username: string) => void;
  logout: () => void;
}

type AuthenticationHook = AuthenticationState & AuthenticationActions;

const useAuthentication = (): AuthenticationHook => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>(null);
  const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);

  useEffect(() => {
    const userName = localStorage.getItem(LOCALSTORAGE_AUTH_KEY);
    setUsername(userName);
    setIsInitialCheckComplete(true);
  }, []);

  const login = (loggedUserName: string): void => {
    if (loggedUserName.length < 3) {
      alert('Username should has more than 3 characters!'); // TODO: make custom popup
    } else {
      localStorage.setItem(LOCALSTORAGE_AUTH_KEY, loggedUserName);
      setUsername(loggedUserName);
      navigate('/');
    }
  };

  const logout = (): void => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    setUsername(null);
    navigate('/login');
  };

  return {
    username,
    login,
    logout,
    isInitialCheckComplete,
  };
};

export default useAuthentication;
