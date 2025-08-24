import { MerchantListRequestParams } from '@/types/merchant';

// export const SUPPORTED_LANGUAGES = {
//   ko: '한국어',
//   en: 'English',
// };

export const CURRENCY: Record<string, string> = {
  ko: 'KRW',
  en: 'USD',
};

// TODO: API 등으로 실제 환율 받아서 처리
export const EXCHANGE_RATES: Record<
  string,
  { currency: string; rate: number }
> = {
  ko: { currency: 'KRW', rate: 1400 },
  en: { currency: 'USD', rate: 1 },
};

export const QUERY_KEYS = {
  MERCHANT_LIST: (params?: MerchantListRequestParams) => [
    'MERCHANT_LIST',
    params,
  ],
  MERCHANT_INFO: (id: string) => ['MERCHANT_INFO', id],
  MERCHANT_PRODUCT_LIST: (id: string) => ['MERCHANT_PRODUCT_LIST', id],
  ORDER_STATUS: (orderId: string) => ['ORDER_STATUS', orderId],
};
