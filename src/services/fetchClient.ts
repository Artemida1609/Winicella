/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../types/User';
const BASE_URL = 'https://winicella.onrender.com';

type Options = 'GET' | 'POST' | 'PATCH';

function request<T>(
  url: string,
  method: Options,
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(`${BASE_URL}${url}`, options).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, data: User) => request<T>(url, 'POST', data),
};
