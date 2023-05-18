import { useEffect, useState } from 'react';

import { POSTS_ENDPOINT_URL } from '../constants';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  isLoading: boolean;
  isError: boolean;
  posts: Post[] | null;
}

const usePosts = (): PostsState => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(POSTS_ENDPOINT_URL);
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts);
          setIsError(false);
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

    fetchPosts();
  }, []);

  return {
    isLoading,
    isError,
    posts,
  };
};

export default usePosts;
