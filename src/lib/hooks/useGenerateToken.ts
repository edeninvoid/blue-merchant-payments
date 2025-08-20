import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { postAuthTokenApi } from '@/services/auth';

export const useGenerateToken = (deviceId: string) => {
  const { token, setToken } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) {
      const fetchToken = async () => {
        try {
          const data = await postAuthTokenApi({ deviceId });
          console.log(data);
          setToken(data.token);
          setTimeout(() => {
            setReady(true);
          }, 500);
          //TODO: expiresIn에 따른 토큰 삭제 로직 추가
        } catch (error) {
          console.error(error);
        }
      };

      fetchToken();
    } else {
      setReady(true);
    }
  }, [token, setToken, deviceId]);

  return { isLoading: !ready };
};
