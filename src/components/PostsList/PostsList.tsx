import type React from 'react';
import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

import { AuthContext } from '../../AuthContext';
import useInfinitePosts from '../../hooks/useInfinitePosts';

import PostCard from '../PostCard';
import Loader from '../Loader';

import styles from './PostsList.module.css';

const PostsList: React.FC = () => {
  const { userId } = useContext(AuthContext);
  const {
    isLoading,
    isError,
    fetchNextPage,
    data,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinitePosts(userId);

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (isLoading) {
    return <div>Initial loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong loading posts!</div>;
  }

  const noPosts = !isLoading && !data?.pages?.[0]?.posts?.length;

  return (
    <div className={styles.wrapper}>
      {noPosts
        ? 'No posts found for this user!'
        : data?.pages.map((page: any) => (
            <div>
              {page?.posts.map((post: any) => (
                <PostCard key={post.id} data={post} />
              ))}
            </div>
          ))}
      <div
        ref={!isFetchingNextPage && hasNextPage ? ref : null}
        className={classNames({
          [styles.loaderShow]: isFetchingNextPage,
          [styles.loaderHide]: !isFetchingNextPage,
        })}
      >
        <Loader />
      </div>
    </div>
  );
};

export default PostsList;
