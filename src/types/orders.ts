export interface PostOrderRequestParams {
  merchantId: string;
  currency: string;
  amount: string;
}

export interface PostOrderResponse {
  orderId: string;
  status: 'PAID' | 'DECLINED' | 'PENDING';
}
