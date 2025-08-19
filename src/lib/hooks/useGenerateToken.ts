import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';
import { postAuthTokenApi } from '@/services/auth';

export const useGenerateToken = (deviceId: string) => {
  const token = useAuthStore(state => state.token);
  const setToken = useAuthStore(state => state.setToken);

  useEffect(() => {
    if (!token) {
      const fetchToken = async () => {
        try {
          const data = await postAuthTokenApi({ deviceId });
          console.log(data);
          setToken(data.token);
          //TODO: expierIn에 따른 토큰 삭제 로직 추가
        } catch (error) {
          console.error(error);
        }
      };

      fetchToken();
    }
  }, [token, setToken, deviceId]);
};
