import { api } from '@/lib/axios';
import { PostOrderResponse, PostOrderRequestParams } from '@/types/orders';

const postOrderApi = async (
  params: PostOrderRequestParams,
): Promise<PostOrderResponse> => {
  return await api.post(`/orders`, params);
};

export { postOrderApi };
