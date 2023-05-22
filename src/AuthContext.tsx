import type React from 'react';
import {
  createContext, useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  LOCALSTORAGE_AUTH_USERID_KEY,
  LOCALSTORAGE_AUTH_USERNAME_KEY,
} from './constants';

interface LoginArgs {
  userid: string;
  username: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isDone: boolean;
  userId: string;
  userName: string;
  contextLogin: ({ userid, username }: LoginArgs) => void;
  contextLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isDone: false,
  userId: '',
  userName: '',
  contextLogin: (): void => {},
  contextLogout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userNameFromLocalStorage = localStorage.getItem(LOCALSTORAGE_AUTH_USERNAME_KEY) ?? '';
    const userIdFromLocalStorage = localStorage.getItem(LOCALSTORAGE_AUTH_USERID_KEY) ?? '';
    setUserName(userNameFromLocalStorage);
    setUserId(userIdFromLocalStorage);
    if (userNameFromLocalStorage?.length) {
      setIsAuthenticated(true);
    }
    setIsDone(true);
  }, []);

  const contextLogin = useCallback(({ userid, username }: LoginArgs): void => {
    localStorage.setItem(LOCALSTORAGE_AUTH_USERNAME_KEY, username);
    localStorage.setItem(LOCALSTORAGE_AUTH_USERID_KEY, userid);
    setUserName(username);
    setUserId(userid);
    setIsAuthenticated(true);
  }, []);

  const contextLogout = useCallback((): void => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_USERNAME_KEY);
    localStorage.removeItem(LOCALSTORAGE_AUTH_USERID_KEY);
    setUserName('');
    setUserId('');
    setIsAuthenticated(false);
  }, []);

  const authContextValue: AuthContextProps = useMemo(
    () => ({
      isAuthenticated,
      isDone,
      userId,
      userName,
      contextLogin,
      contextLogout,
    }),
    [isAuthenticated, isDone, userId, userName, contextLogin, contextLogout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
