import type React from 'react';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';
import useUsernameCheck from '../../hooks/useUserCheckName';

import styles from './Login.module.css';

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { isInitialLoading, login } = useUsernameCheck();

  // if user logged in => redirect to main page
  if (isAuthenticated) {
    navigate('/');
  }

  const handleLogin = useCallback((): void => {
    login(inputValue);
  }, [login, inputValue]);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter' && !isInitialLoading) {
      event.preventDefault();
      handleLogin();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Login page</div>
      <div>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            handleLogin();
          }}
          disabled={isInitialLoading}
        >
          {isInitialLoading ? 'Logging in' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
