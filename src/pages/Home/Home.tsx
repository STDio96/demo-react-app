import type React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

import styles from './Home.module.css';

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Kind of a Twitter App</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.contentInner}>
          <Outlet />
        </div>
      </div>

      {isAuthenticated && (
        <footer className={styles.footer}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles.footerButton, {
                [styles.active]: isActive,
              })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-posts"
            className={({ isActive }) =>
              classNames(styles.footerButton, {
                [styles.active]: isActive,
              })
            }
          >
            All Posts
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              classNames(styles.footerButton, {
                [styles.active]: isActive,
              })
            }
          >
            Settings
          </NavLink>
        </footer>
      )}
    </div>
  );
};

export default Home;
