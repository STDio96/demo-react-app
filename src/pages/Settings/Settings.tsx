import type React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../AuthContext';
import useAuthentication from '../../hooks/useAuthentication';

const Settings: React.FC = () => {
  const { isAuthenticated, userName, userId } = useContext(AuthContext);
  const { logout } = useAuthentication();
  const handleLogout = (): void => {
    logout();
  };

  return (
    <div>
      <h1>Settings page</h1>
      {isAuthenticated && (
        <>
          <div>
            Welcome: {userName} [{userId}]
          </div>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Settings;
