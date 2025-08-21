import axios, { AxiosRequestHeaders } from 'axios';
import { useAuthStore } from '@/store/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  if (config.url?.includes('/auth/token')) {
    return config;
  }

  const auth = useAuthStore.getState().token;

  if (!auth) {
    return Promise.reject({
      response: {
        status: 401,
        data: { message: 'Unauthorized.' },
      },
    });
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${auth.token}`,
  } as AxiosRequestHeaders;

  return config;
});

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized.');
      return [];
    }
    return Promise.reject(error);
  },
);
