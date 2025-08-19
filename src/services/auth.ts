import { api } from '@/lib/axios';
import { PostTokenRequestParams } from '@/types/auth';

const postAuthTokenApi = async (
  params: PostTokenRequestParams,
): Promise<{ token: string; expiresIn: number }> => {
  return await api.post('/auth/token', {
    deviceId: params.deviceId,
  });
};

export { postAuthTokenApi };
