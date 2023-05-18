import type React from 'react';

import useAuthentication from '../../hooks/useAuthentication';

const Settings: React.FC = () => {
  const { username, logout } = useAuthentication();
  const handleLogout = (): void => {
    logout();
  };

  return (
    <div>
      <h1>Settings page</h1>
      {username && (
        <>
          <div>Welcome: {username}</div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Settings;
