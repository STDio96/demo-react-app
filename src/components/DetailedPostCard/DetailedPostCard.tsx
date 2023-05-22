import type React from 'react';

import usePostById from '../../hooks/usePostById';
import Loader from '../Loader';

import styles from './DetailedPostCard.module.css';

const DetailedPostCard: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, isError } = usePostById(id);

  if (isError) {
    return <div>Something went wrong while loading post data!</div>;
  }

  return (
    <div className={styles.post}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.cardHeader}>
            <h2>{data?.title}</h2>
          </div>
          <div className={styles.cardBody}>
            <p>{data?.body}</p>
            <div className={styles.tags}>
              {data?.tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.reactions}>{data?.reactions} reactions</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedPostCard;
