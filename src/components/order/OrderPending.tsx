'use client';

import Loading from '@/components/_ui/loading';
import { useOrderStatusQuery } from '@/lib/hooks/useOrders';
import { PostOrderRequestParams } from '@/types/orders';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocaleContext } from '@/lib/contexts/LocaleContext';
import { getPushUrl } from '@/lib/utils';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function OrderPending({ searchParams }: Props) {
  const orderId = searchParams.orderId as string;

  const postOrderParams = {
    merchantId: searchParams.merchantId,
    currency: searchParams.currency,
    amount: searchParams.amount,
  } as PostOrderRequestParams;

  const locale = useLocaleContext();
  const { push } = useRouter();
  const { data: postOrderResponse } = useOrderStatusQuery(
    postOrderParams,
    orderId,
  );

  useEffect(() => {
    if (postOrderResponse) {
      // 실제 API의 응답에 의한 분기 처리 필요하지만, 여기서는 성공으로 처리하도록 하겠습니다.
      // if (postOrderResponse.status === '...') {
      // }
      setTimeout(() => {
        push(
          getPushUrl(locale, postOrderParams, {
            status: 'PAID',
            orderId: postOrderResponse.orderId,
          }),
        );
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postOrderResponse]);

  return (
    <section role="status" aria-live="polite" className="flex flex-col">
      <Loading message="Payment Pending.." />
    </section>
  );
}
