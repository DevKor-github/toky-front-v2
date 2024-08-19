export const setTokenFromCookie = () => {
  let accessToken = null,
    refreshToken = null;

  document.cookie.split(';').forEach((c) => {
    if (c.trim().startsWith('access-token=')) accessToken = c.split('=')[1];
    if (c.trim().startsWith('refresh-token=')) refreshToken = c.split('=')[1];
  });
  if (!accessToken || !refreshToken) {
    localStorage.removeItem('refreshToken');
    return false;
  }

  document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return true;
};
