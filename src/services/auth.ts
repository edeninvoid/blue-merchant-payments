import { api } from '@/lib/axios';
import { AuthTokenRequestParams, AuthTokenResponse } from '@/types/auth';

const postAuthTokenApi = async (
  params: AuthTokenRequestParams,
): Promise<AuthTokenResponse> => {
  return await api.post('/auth/token', {
    deviceId: params.deviceId,
  });
};

export { postAuthTokenApi };
