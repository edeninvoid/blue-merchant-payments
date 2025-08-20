import { useAuthStore } from '@/store/auth';
import { useEffect, useState } from 'react';
import { postAuthTokenApi } from '@/services/auth';
import { usePathname } from 'next/navigation';

const useGenerateToken = (deviceId: string) => {
  const { token, setToken } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) {
      const fetchToken = async () => {
        try {
          const data = await postAuthTokenApi({ deviceId });
          console.log(data);
          setToken({
            token: data.token,
            expireDate: new Date(Date.now() + data.expiresIn * 1000),
          });
          setTimeout(() => {
            setReady(true);
          }, 500);
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

const useAuthExpiration = () => {
  const pathname = usePathname();
  const { token, clearToken } = useAuthStore();

  useEffect(() => {
    if (!token?.expireDate) return;

    if (new Date() > new Date(token.expireDate)) {
      clearToken();
    }
  }, [clearToken, pathname, token]);
};

export { useGenerateToken, useAuthExpiration };
