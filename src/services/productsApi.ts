import { User } from '../types/User';
import { Wine } from '../types/Wine';
import { client } from './fetchClient';

export const getAllWines = (): Promise<Wine[]> => {
  return client.get('/wines_wine');
};

export const getAllRegisteredUsers = (): Promise<User[]> => {
  return client.get('/api/user/all');
};

export const registerUser = (newUser: User): Promise<User> => {
  return client.post('/api/user/register', newUser);
};
