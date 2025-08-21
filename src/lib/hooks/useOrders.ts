import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostOrderRequestParams, PostOrderResponse } from '@/types/orders';
import { postOrderApi } from '@/services/orders';
import { QUERY_KEYS } from '@/lib/constants';

export const usePostOrders = () => {
  const queryClient = useQueryClient();

  return useMutation<PostOrderResponse, Error, PostOrderRequestParams>({
    mutationFn: postOrderApi,
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEYS.ORDER_STATUS(data.orderId), data);
    },
  });
};

export const useOrderStatusQuery = (
  params: PostOrderRequestParams,
  orderId: PostOrderResponse['orderId'],
) => {
  return useQuery<PostOrderResponse, Error>({
    queryKey: QUERY_KEYS.ORDER_STATUS(orderId),
    queryFn: () => postOrderApi(params),
    retry: 3,
    /**
     * API 응답에 따른 재시도 및 예외 처리가 들어갈 수 있습니다.
     * ex) success: false => PENDING
     **/
  });
};
