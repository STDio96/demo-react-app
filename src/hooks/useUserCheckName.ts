import { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { AuthContext } from '../AuthContext';
import { UserService } from '../services/user.service';

interface IHookReturn {
  isInitialLoading: boolean;
  login: (name: string) => void;
}

const useUsernameCheck = (): IHookReturn => {
  const [username, setUsername] = useState('');
  const { contextLogin } = useContext(AuthContext);

  const { data, isInitialLoading } = useQuery(
    ['users', username],
    async () => await UserService.findByUsername(username),
    {
      enabled: username.length >= 3,
    }
  );

  useEffect(() => {
    if (!!data && !isInitialLoading) {
      if (data?.limit === 0) {
        alert(`User ${username} not found`);
        return;
      }

      contextLogin({ userid: String(data.users[0].id), username });
    }
  }, [data, isInitialLoading, contextLogin, username]);

  const login = (username2: string): void => {
    if (username2.length < 3) {
      alert('Username should have more than 3 characters!');
      return;
    }
    setUsername(username2);
  };

  return {
    isInitialLoading,
    login,
  };
};

export default useUsernameCheck;
