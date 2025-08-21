import { api } from '@/lib/axios';
import {
  PostAuthTokenRequestParams,
  PostAuthTokenResponse,
} from '@/types/auth';

const postAuthTokenApi = async (
  params: PostAuthTokenRequestParams,
): Promise<PostAuthTokenResponse> => {
  return await api.post('/auth/token', {
    deviceId: params.deviceId,
  });
};

export { postAuthTokenApi };
