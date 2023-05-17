import type React from 'react';

const Settings: React.FC = () => {
  const isUserLoggedIn = true;

  return (
    <div>
      <h1>Settings page</h1>
      {isUserLoggedIn && (
        <button
          type="button"
          onClick={() => {
            console.log('__logout');
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Settings;
