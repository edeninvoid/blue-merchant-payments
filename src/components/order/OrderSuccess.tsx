'use client';

import SuccessCheck from '@/components/_icons/SuccessCheck';
import Link from 'next/link';
import { useLocaleContext } from '@/lib/contexts/LocaleContext';

interface Props {
  orderId: string;
}

export default function OrderSuccess({ orderId }: Props) {
  const locale = useLocaleContext();
  // orderId를 통해 추가적인 주문 상세 정보를 표시할 수 있습니다.
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
        Continue Shopping..
      </Link>
    </section>
  );
}
