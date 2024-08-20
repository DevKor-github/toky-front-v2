import type { AxiosInstance } from 'axios';

export const refresh = async (instance: AxiosInstance) => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const res = await instance.post(`/auth/refresh`, {}, { headers: { Authorization: `Bearer ${refreshToken}` } });
    if (res.data.accessToken && res.data.refreshToken) {
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');

  return false;
};
