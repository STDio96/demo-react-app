// This component and all the stuff related to it
// is duplicated just to show the way infinite scroll works
// within the app. Users from the dummy server don't have
// enough posts to show this infinite scroll logic
import type React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';

import useInfinitePosts from '../../hooks/useInfinitePosts';

import PostCard from '../../components/PostCard';
import Loader from '../../components/Loader';

import styles from '../../components/PostsList/PostsList.module.css';

const AllUsersPosts: React.FC = () => {
  const {
    isLoading,
    isError,
    fetchNextPage,
    data,
    isFetchingNextPage,
    hasNextPage,
  } = useInfinitePosts();

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

export default AllUsersPosts;
