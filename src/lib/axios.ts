import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useAuthStore } from '@/store/auth';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const handleAuthInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
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
};

export const handleResponseSuccess = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

export const handleResponseError = (error: AxiosError | unknown) => {
  if ((error as AxiosError)?.response?.status === 401) {
    console.error('Unauthorized.');
    return [];
  }
  return Promise.reject(error);
};

api.interceptors.request.use(handleAuthInterceptor);
api.interceptors.response.use(handleResponseSuccess, handleResponseError);
