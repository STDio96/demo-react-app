import type React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../AuthContext';
import useAuthentication from '../../hooks/useAuthentication';

import styles from './Settings.module.css';

const Settings: React.FC = () => {
  const { isAuthenticated, userName, userId } = useContext(AuthContext);
  const { logout } = useAuthentication();
  const handleLogout = (): void => {
    logout();
  };

  return (
    <div className={styles.wrapper}>
      {isAuthenticated && (
        <>
          <div>
            Welcome: {userName} [{userId}]
          </div>
          <button
            className={styles.button}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Settings;
