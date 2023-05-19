import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthContext';
import {
  LOCALSTORAGE_AUTH_USERID_KEY,
  LOCALSTORAGE_AUTH_USERNAME_KEY,
  USERS_LIST_ENDPOINT_URL,
} from '../constants';

interface AuthenticationState {
  isLoading: boolean;
}
interface AuthenticationActions {
  login: (username: string) => Promise<any>;
  logout: () => void;
}

type AuthenticationHook = AuthenticationState & AuthenticationActions;

const useAuthentication = (): AuthenticationHook => {
  const { contextLogin, contextLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const checkUserExistence = async (
    usernameToCheck: string
  ): Promise<number> => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }

    return -1;
  };

  useEffect(() => {
    const userName = localStorage.getItem(LOCALSTORAGE_AUTH_USERNAME_KEY);
    const signedUserId =
      localStorage.getItem(LOCALSTORAGE_AUTH_USERID_KEY) ?? -1;
    if (userName?.length) {
      contextLogin({ username: userName, userid: signedUserId as number });
    }
  }, [contextLogin]);

  const login = async (loggedUserName: string): Promise<any> => {
    if (loggedUserName.length < 3) {
      alert('Username should has more than 3 characters!'); // TODO: make custom popup
    } else {
      const loggedUserId = await checkUserExistence(loggedUserName);

      if (loggedUserId > 0) {
        contextLogin({ userid: loggedUserId, username: loggedUserName });
        navigate('/');
      } else {
        alert(`User ${loggedUserName} not found!`);
      }
    }
  };

  const logout = (): void => {
    contextLogout();
    navigate('/login');
  };

  return {
    isLoading,
    login,
    logout,
  };
};

export default useAuthentication;
