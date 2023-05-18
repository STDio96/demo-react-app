import type React from 'react';
import { createContext, useMemo, useState } from 'react';
import {
  LOCALSTORAGE_AUTH_USERID_KEY,
  LOCALSTORAGE_AUTH_USERNAME_KEY,
} from './constants';

interface LoginArgs {
  userid: number;
  username: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: number;
  userName: string;
  contextLogin: ({ userid, username }: LoginArgs) => void;
  contextLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  userId: -1,
  userName: '',
  contextLogin: (): void => {},
  contextLogout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState('');

  const contextLogin = ({ userid, username }: LoginArgs): void => {
    localStorage.setItem(LOCALSTORAGE_AUTH_USERNAME_KEY, username);
    localStorage.setItem(LOCALSTORAGE_AUTH_USERID_KEY, userid.toString());
    setUserName(username);
    setUserId(userid);
    setIsAuthenticated(true);
  };

  const contextLogout = (): void => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_USERNAME_KEY);
    localStorage.removeItem(LOCALSTORAGE_AUTH_USERID_KEY);
    setUserName('');
    setUserId(0);
    setIsAuthenticated(false);
  };

  const authContextValue: AuthContextProps = useMemo(
    () => ({
      isAuthenticated,
      userId,
      userName,
      contextLogin,
      contextLogout,
    }),
    [isAuthenticated, userId, userName, contextLogin, contextLogout]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
