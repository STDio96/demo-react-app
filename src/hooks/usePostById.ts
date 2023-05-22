import { useQuery } from '@tanstack/react-query';

import { PostService } from '../services/post.service';
import type { IPost } from '../services/post.service';

/* interface IResponse {
  posts: IPost[];
  skip: number;
  total: number;
} */

interface IHookReturn {
  data?: IPost;
  isLoading: boolean;
  isError: boolean;
}

const usePostById = (id: string): IHookReturn => {
  const { data, isError, isLoading } = useQuery(
    ['posts', id],
    async () => await PostService.getById(id),
    {
      enabled: !!id,
      retry: 2,
      select: ({ data: response }) => response,
    }
  );

  return {
    isLoading,
    isError,
    data,
  };
};

export default usePostById;
