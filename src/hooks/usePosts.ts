import { useQuery } from '@tanstack/react-query';

import { PostService } from '../services/post.service';
import type { IPost } from '../services/post.service';

export interface IHookReturn {
  data?: IPost[];
  isLoading: boolean;
  isError: boolean;
}

const usePosts = (): IHookReturn => {
  const { data, isError, isLoading } = useQuery(
    ['posts'],
    async () => await PostService.getAll(),
    {
      keepPreviousData: true,
      retry: 2,
      select: ({ posts }) => posts,
    }
  );

  return {
    isLoading,
    isError,
    data,
  };
};

export default usePosts;
