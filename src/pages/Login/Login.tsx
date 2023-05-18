import type React from 'react';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';
import { AuthContext } from '../../AuthContext';

import styles from './Login.module.css';

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthentication();
  const { isAuthenticated } = useContext(AuthContext);

  // if user logged in => redirect to main page
  if (isAuthenticated) {
    navigate('/');
  }

  const handleLogin = useCallback((): void => {
    void login(inputValue);
  }, [login, inputValue]);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Login page</h1>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button className={styles.button} type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
