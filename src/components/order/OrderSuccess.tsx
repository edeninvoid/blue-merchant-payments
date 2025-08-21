'use client';

import SuccessCheck from '@/components/_icons/SuccessCheck';
import Link from 'next/link';
import { useLocaleContext } from '@/lib/contexts/LocaleContext';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function OrderSuccess({ searchParams }: Props) {
  const locale = useLocaleContext();
  const orderId = searchParams.orderId as string;

  // orderId를 통해 추가적인 주문 상세 정보를 표시할 수 있습니다. ex) getOrdersDetailApi
  if (!orderId) {
    console.error('Wrong Access.');
    return null;
  }

  return (
    <section
      role="status"
      aria-live="polite"
      aria-labelledby="order-success"
      className="mt-40 flex flex-col items-center gap-4"
    >
      <div
        className="grid size-20 place-items-center rounded-full bg-green-200 p-4 text-green-700"
        aria-label="Payment Success Icon"
        aria-hidden="true"
      >
        <SuccessCheck />
      </div>
      <h2 id="order-success" className="text-2xl font-semibold">
        Payment Successful!
      </h2>
      <Link href={`/${locale}`} className="hover:underline">
        Continue Shopping :)
      </Link>
    </section>
  );
}
