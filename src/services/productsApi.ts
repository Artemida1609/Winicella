import { Wine } from '../types/Wine';
import { client } from './fetchClient';

export const getAllWines = (): Promise<Wine[]> => {
  return client.get('/wines_wine');
};
