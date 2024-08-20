import axios from 'axios';

export const refresh = async (baseURL: string) => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const res = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    );
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
