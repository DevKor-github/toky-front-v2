import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

import client from '@/libs/client/client';
import mem from 'mem';

const REFRESH_URL = '/auth/refresh';

export const refresh = mem(
  async () => {
    try {
      const { data } = await client.post(REFRESH_URL);
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data.accessToken as string;
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    return null;
  },
  { maxAge: 1000 },
);

const errorHandler = async (error: any) => {
  const { config, response } = error;

  if (response?.status === 401 && config.url !== REFRESH_URL && !config.sent) {
    config.sent = true;
    const newAccessToken = await refresh();

    if (newAccessToken) {
      console.log(`New Access Token :: ${newAccessToken}`);
      config.headers.Authorization = `Bearer ${newAccessToken}`;
      return client(config);
    } else {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};

const requestHandler = (config: InternalAxiosRequestConfig) => {
  let token: string | null = null;

  if (config.url === REFRESH_URL) {
    token = localStorage.getItem('refreshToken');
  } else {
    token = localStorage.getItem('accessToken');
  }

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export function createAxiosInstance(baseURL: string, headers?: RawAxiosRequestHeaders): AxiosInstance {
  headers = headers ?? {
    'Content-Type': 'application/json',
  };

  const instance = axios.create({
    baseURL,
    headers,
    withCredentials: true,
  });

  instance.interceptors.request.use(requestHandler, (error) => Promise.reject(error));
  instance.interceptors.response.use((response) => response, errorHandler);

  return instance;
}
