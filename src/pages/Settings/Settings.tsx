import type React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../AuthContext';
import useAuthentication from '../../hooks/useAuthentication';

import styles from './Settings.module.css';

const Settings: React.FC = () => {
  const { userName, userId } = useContext(AuthContext);
  const { logout } = useAuthentication();
  const handleLogout = (): void => {
    logout();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.salutation}>
        Hello, {userName} [{userId}]!
      </div>
      <button
        type="button"
        className={styles.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
