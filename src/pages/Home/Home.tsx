import type React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './Home.module.css';
import { AuthContext } from '../../AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Kind of a Twitter App</h1>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      {isAuthenticated && (
        <footer className={styles.footer}>
          <div className={styles.footerLinksWrapper}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(styles.footerLink, {
                  [styles.active]: isActive,
                })
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                classNames(styles.footerLink, {
                  [styles.active]: isActive,
                })
              }
            >
              Settings
            </NavLink>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Home;
