import type React from 'react';

import PostCard from '../PostCard';
import usePosts from '../../hooks/usePosts';

import styles from './PostsList.module.css';

const PostsList: React.FC = () => {
  const { isLoading, isError, posts, hasMore, fetchPosts } = usePosts();

  if (isError) {
    return <div>Something went wrong loading posts!</div>;
  }

  console.log('__posts', posts);

  return (
    <div className={styles.wrapper}>
      {posts?.map((data) => (
        <PostCard data={data} />
      ))}
      {isLoading && <p>Loading posts...</p>}
      {!isLoading && hasMore && (
        <button
          type="button"
          onClick={() => {
            fetchPosts();
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostsList;
