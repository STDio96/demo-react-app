import axios from 'axios';
import {
  POST_DETAILS_ENDPOINT_URL,
  POSTS_ENDPOINT_URL,
  POSTS_PER_PAGE,
  USERS_POSTS_ENDPOINT_URL,
} from '../constants';

export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions?: number;
  userId: number;
}

export interface IResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}

export const PostService = {
  async getAll() {
    const { data } = await axios.get<IResponse>(POSTS_ENDPOINT_URL);

    return data;
  },
  async getInfinite(skip: number) {
    const { data } = await axios.get<IResponse>(
      `${POSTS_ENDPOINT_URL}?limit=${POSTS_PER_PAGE}&skip=${skip}`
    );

    return data;
  },
  async getInfiniteByCurrentUser(userId: string, skip: number) {
    const { data } = await axios.get<IResponse>(
      `${USERS_POSTS_ENDPOINT_URL.replace(
        '%userId%',
        userId
      )}?limit=${POSTS_PER_PAGE}&skip=${skip}`
    );

    return data;
  },
  async getById(id: string) {
    return await axios.get<IPost>(`${POST_DETAILS_ENDPOINT_URL}${id}`);
  },
};
