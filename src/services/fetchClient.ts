/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'http://localhost:3000';

function request<T>(url: string, method: 'GET', data: any = null): Promise<T> {
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
};
