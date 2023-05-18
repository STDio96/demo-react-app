import type React from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { username, login } = useAuthentication();

  // if user logged in => redirect to main page
  if (username) {
      navigate('/');
  }

  const handleLogin = useCallback((): void => {
    login(inputValue);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Login page</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
