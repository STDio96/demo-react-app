import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LOCALSTORAGE_AUTH_USERID_KEY,
  LOCALSTORAGE_AUTH_USERNAME_KEY,
  USERS_LIST_ENDPOINT_URL,
} from '../constants';

interface AuthenticationState {
  username: string | null;
  userId: number;
  isInitialCheckComplete: boolean;
}

interface AuthenticationActions {
  login: (username: string) => Promise<any>;
  logout: () => void;
}

type AuthenticationHook = AuthenticationState & AuthenticationActions;

const useAuthentication = (): AuthenticationHook => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState(-1);
  const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);

  const checkUserExistence = async (
    usernameToCheck: string
  ): Promise<number> => {
    try {
      const response = await fetch(
        `${USERS_LIST_ENDPOINT_URL}?q=${usernameToCheck}`
      );
      if (response.ok) {
        const data = await response.json();
        return data?.users?.[0]?.id ?? -1;
      }
    } catch (error) {
      console.error(error);
      return -1;
    }

    return -1;
  };

  useEffect(() => {
    const userName = localStorage.getItem(LOCALSTORAGE_AUTH_USERNAME_KEY);
    const signedUserId =
      localStorage.getItem(LOCALSTORAGE_AUTH_USERID_KEY) ?? -1;
    setUsername(userName);
    setUserId(signedUserId as number);
    setIsInitialCheckComplete(true);
  }, []);

  const login = async (loggedUserName: string): Promise<any> => {
    if (loggedUserName.length < 3) {
      alert('Username should has more than 3 characters!'); // TODO: make custom popup
    } else {
      const loggedUserId = await checkUserExistence(loggedUserName);

      if (loggedUserId > 0) {
        localStorage.setItem(LOCALSTORAGE_AUTH_USERNAME_KEY, loggedUserName);
        localStorage.setItem(
          LOCALSTORAGE_AUTH_USERID_KEY,
          loggedUserId.toString()
        );
        setUsername(loggedUserName);
        setUserId(loggedUserId);
        navigate('/');
      } else {
        alert(`User ${loggedUserName} not found!`);
      }
    }
  };

  const logout = (): void => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_USERNAME_KEY);
    localStorage.removeItem(LOCALSTORAGE_AUTH_USERID_KEY);
    setUsername(null);
    setUserId(-1);
    navigate('/login');
  };

  return {
    username,
    userId,
    login,
    logout,
    isInitialCheckComplete,
  };
};

export default useAuthentication;
