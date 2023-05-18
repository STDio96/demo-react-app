import { useEffect } from 'react';
import type React from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

import usePosts from '../../hooks/usePosts';
import PostCard from '../PostCard';

import styles from './PostsList.module.css';

const PostsList: React.FC = () => {
  const { isLoading, isError, posts, hasMore, fetchPosts } = usePosts();
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && !isLoading) {
      void fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isError) {
    return <div>Something went wrong loading posts!</div>;
  }

  return (
    <div className={styles.wrapper}>
      {!isLoading && posts.length === 0
        ? 'No posts found for this user!'
        : posts?.map((data) => <PostCard data={data} />)}
      <div
        ref={!isLoading && hasMore ? ref : null}
        className={classNames({
          [styles.loaderShow]: isLoading,
          [styles.loaderHide]: !isLoading,
        })}
      >
        Loading posts...
      </div>
    </div>
  );
};

export default PostsList;
