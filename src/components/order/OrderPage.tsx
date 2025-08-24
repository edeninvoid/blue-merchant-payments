'use client';

import OrderPending from '@/components/order/OrderPending';
import OrderSuccess from '@/components/order/OrderSuccess';
import OrderFail from '@/components/order/OrderFail';
import { ComponentType } from 'react';

interface Props {
  locale: string;
  status: string;
  searchParams: { [key: string]: string | string[] | undefined };
}

const COMPONENT_BY_STATUS: Record<
  string,
  ComponentType<{ searchParams: Props['searchParams'] }>
> = {
  pending: OrderPending,
  declined: OrderFail,
  paid: OrderSuccess,
};

export default function OrderPage({ locale, status, searchParams }: Props) {
  const Component = COMPONENT_BY_STATUS[status];

  return (
    // <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
    <Component searchParams={searchParams} />
    // </LocaleContext>
  );
}
