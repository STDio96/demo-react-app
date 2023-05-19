import type React from 'react';

import styles from './Loader.module.css';

export const Loader: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
  </div>
);

export default Loader;
