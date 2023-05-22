import { useInfiniteQuery } from '@tanstack/react-query';

import { POSTS_PER_PAGE } from '../constants';
import { PostService } from '../services/post.service';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
}

interface Response {
  posts: Post[];
  skip: number;
  total: number;
}

const useInfinitePosts = (userId: string): any => {
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['posts', 'infinite'],
    async ({ pageParam = 0 }): Promise<Response> =>
      await PostService.getInfiniteByCurrentUser(userId, pageParam),
    {
      getNextPageParam: (response: Response) =>
        response
          ? response.total !== response.skip && response.skip + POSTS_PER_PAGE
          : undefined,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  return {
    isLoading,
    isError,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

export default useInfinitePosts;
