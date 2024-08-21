import { useRefresh } from '@/libs/client/refresh';
import { useAuthStore } from '@/libs/store/useAuthStore';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore();
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    if (response?.status === 401) {
      const { refresh } = useRefresh();
      const newAccessToken = await refresh();

      if (newAccessToken !== null) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client.request(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default client;
