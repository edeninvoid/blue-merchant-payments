import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  getMerchantInfo,
  getMerchantList,
  getMerchantProductList,
} from '@/services/merchants';
import { QUERY_KEYS } from '@/lib/constants';
import {
  MerchantListRequestParams,
  MerchantProductItem,
} from '@/types/merchant';
import { delay } from '@/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocaleContext } from '@/lib/contexts/LocaleContext';
import { useRouter } from 'next/navigation';

const useMerchantListQuery = (params?: MerchantListRequestParams) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MERCHANT_LIST(params),
    queryFn: async () => {
      await delay(1000); // Suspense 노출을 위한 지연 로딩
      return getMerchantList(params);
    },
  });
};

const useMerchantInfoQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MERCHANT_INFO(id),
    queryFn: async () => {
      await delay(1000); // Suspense 노출을 위한 지연 로딩
      return getMerchantInfo(id);
    },
  });
};

const useMerchantProductListQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.MERCHANT_PRODUCT_LIST(id),
    queryFn: async () => getMerchantProductList(id),
  });
};

const useMerchantsProducts = (id: string) => {
  const { data: productListData } = useMerchantProductListQuery(id);
  const [productList, setProductList] = useState<MerchantProductItem[]>([]);

  const handleCheckChange = (id: number, checked: boolean) => {
    setProductList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isChecked: checked } : item,
      ),
    );
  };

  const totalPrice = useMemo(
    () =>
      productList
        .filter(item => item.isChecked)
        .reduce((sum, item) => sum + item.price, 0),
    [productList],
  );

  useEffect(() => {
    if (!productListData) return;

    setProductList(
      productListData.map(item => ({
        ...item,
        isChecked: true,
      })),
    );
  }, [productListData]);

  return { productList, handleCheckChange, totalPrice };
};

export {
  useMerchantListQuery,
  useMerchantInfoQuery,
  useMerchantProductListQuery,
  useMerchantsProducts,
};
