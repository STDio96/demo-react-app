import type React from 'react';
import classNames from 'classnames';
import { Link, NavLink, Outlet } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';

import styles from './Home.module.css';

const Home: React.FC = () => {
  const { username } = useAuthentication();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Kind of a Twitter App</h1>
        {!username && <Link to="/login">Login</Link>}
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
      {!!username && (
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
