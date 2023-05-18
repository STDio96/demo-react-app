import type React from 'react';
import { Link } from 'react-router-dom';

import useAuthentication from '../../hooks/useAuthentication';
import PostsList from '../../components/PostsList';

import styles from './Home.module.css';

const Home: React.FC = () => {
  const { username } = useAuthentication();

  return (
    <div className={styles.wrapper}>
      <h1>Home</h1>
      {!username && <Link to="/login">Login</Link>}

      {!!username && (
        <>
          <PostsList />
          <div className={styles.footer}>
            <Link to="/">Home</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
