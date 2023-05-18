import { useEffect, useState } from 'react';

import { POSTS_ENDPOINT_URL, POSTS_PER_PAGE } from '../constants';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchPosts: () => Promise<any>;
  posts: Post[] | null;
}

const usePosts = (): PostsState => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (): Promise<any> => {
    setIsLoading(true);
    const skip: number = posts?.length ?? 0;

    try {
      const response = await fetch(
        `${POSTS_ENDPOINT_URL}?limit=${POSTS_PER_PAGE}&skip=${skip}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.posts.length < 10) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) =>
            prevPosts ? [...prevPosts, ...data.posts] : data.posts
          );
        }
      } else {
        setIsError(true);
        throw new Error('Error fetching posts');
      }
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;
    console.log('__isCurrent', isCurrent);
    fetchPosts();

    return () => {
      isCurrent = false;
    };
  }, []);

  return {
    isLoading,
    isError,
    hasMore,
    posts,
    fetchPosts,
  };
};

export default usePosts;
