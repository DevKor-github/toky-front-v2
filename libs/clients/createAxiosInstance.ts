import type { AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import axios from 'axios';
import { refresh } from './refresh';

export function createAxiosInstance(baseURL: string, headers?: RawAxiosRequestHeaders): AxiosInstance {
  headers = headers ?? {
    'Content-Type': 'application/json',
  };

  const instance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.request.use((request) => {
    //TODO 로깅 달기
    const token = localStorage.getItem('accessToken');
    if (token && request.headers) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      //TODO 로깅 달기
      return response;
    },
    async (error) => {
      //TODO 로깅 달기
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken');
        const refreshSuccess = await refresh(baseURL);
        if (refreshSuccess) {
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
          return instance.request(originalRequest);
        }
      }
      return error.response;
    },
  );

  return instance;
}
