import type React from 'react';

import PostCard from "../PostCard";
import usePosts from '../../hooks/usePosts';

import styles from './PostsList.module.css';

const PostsList: React.FC = () => {
  const { isLoading, isError, posts } = usePosts();

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Something went wrong loading posts!</div>;
  }

  console.log('__posts', posts);

  return (
    <div className={styles.wrapper}>
      {posts?.map((data) => (
        <PostCard data={data} />
      ))}
    </div>
  );
};

export default PostsList;
