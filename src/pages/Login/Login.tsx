import type React from 'react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [login, setLogin] = useState('');

  return (
    <div>
      <h1>Login page</h1>
      <input
        type="text"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          console.log('__login', login);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
