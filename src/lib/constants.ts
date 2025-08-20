import { MerchantListRequestParams } from '@/types/merchant';

export const SUPPORTED_LANGUAGES = {
  ko: '한국어',
  en: 'English',
};

export const QUERY_KEYS = {
  MERCHANT_LIST: (params?: MerchantListRequestParams) => [
    'MERCHANT_LIST',
    params,
  ],
  MERCHANT_INFO: (id: string) => ['MERCHANT_INFO', id],
  MERCHANT_PRODUCT_LIST: (id: string) => ['MERCHANT_PRODUCT_LIST', id],
};
