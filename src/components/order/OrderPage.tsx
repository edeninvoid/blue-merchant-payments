'use client';

import OrderPending from '@/components/order/OrderPending';
import { LocaleContext } from '@/lib/contexts/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import OrderSuccess from '@/components/order/OrderSuccess';
import OrderFail from '@/components/order/OrderFail';

interface Props {
  locale: string;
  status: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function OrderPage({ locale, status, searchParams }: Props) {
  const orderId = searchParams.orderId as string;
  return (
    <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
      {status === 'declined' && <OrderFail searchParams={searchParams} />}
      {status === 'pending' && <OrderPending searchParams={searchParams} />}
      {status === 'paid' && <OrderSuccess orderId={orderId} />}
    </LocaleContext>
  );
}
