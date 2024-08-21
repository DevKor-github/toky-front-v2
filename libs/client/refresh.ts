import { useAuthStore } from '@/libs/store/useAuthStore';
import axios from 'axios';

export const useRefresh = () => {
  const { refreshToken, setTokens, clearTokens } = useAuthStore();

  const refresh = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } },
      );
      if (res.data.accessToken && res.data.refreshToken) {
        setTokens(res.data.accessToken, res.data.refreshToken);
        return res.data.accessToken as string;
      }
    } catch (err) {
      console.log(err);
    }
    clearTokens();

    return null;
  };

  return { refresh };
};
