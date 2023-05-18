import { useCallback, useContext, useState } from 'react';

import { POSTS_PER_PAGE, USERS_POSTS_ENDPOINT_URL } from '../constants';
import { AuthContext } from '../AuthContext';

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
  posts: Post[];
}

const usePosts = (): PostsState => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { userId } = useContext(AuthContext);

  const fetchPosts = useCallback(async (): Promise<any> => {
    setIsLoading(true);
    const skip: number = posts?.length ?? 0;

    try {
      const response = await fetch(
        `${USERS_POSTS_ENDPOINT_URL.replace(
          '%userId%',
          String(userId)
        )}?limit=${POSTS_PER_PAGE}&skip=${skip}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.posts.length < 10) {
          setHasMore(false);
        }

        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
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
  }, [userId, posts?.length]);

  return {
    isLoading,
    isError,
    hasMore,
    posts,
    fetchPosts,
  };
};

export default usePosts;
