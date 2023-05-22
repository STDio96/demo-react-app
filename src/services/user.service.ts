import axios from 'axios';
import { USERS_LIST_ENDPOINT_URL } from '../constants';

export interface IUser {
  id: number,
  address: string,
  email: string,
  username: string
}

export interface IResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}

export const UserService = {
  async findByUsername(username: string) {
    const { data } = await axios.get<IResponse>(
      `${USERS_LIST_ENDPOINT_URL}?q=${username}`
    );

    return data;
  },
};
