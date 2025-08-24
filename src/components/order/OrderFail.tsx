import XMark from '@/components/_icons/XMark';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function OrderFail({ searchParams }: Props) {
  const locale = useLocale();
  const urlParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => v && urlParams.append(key, v));
    } else if (value) {
      urlParams.append(key, value);
    }
  });

  return (
    <section
      role="status"
      aria-live="polite"
      aria-labelledby="order-fail"
      className="mt-40 flex flex-col items-center gap-4"
    >
      <div
        className="grid size-20 place-items-center rounded-full bg-red-400 p-4 text-white"
        aria-label="Payment Fail Icon"
        aria-hidden="true"
      >
        <XMark />
      </div>
      <h2 id="order-fail" className="text-2xl font-semibold">
        Payment Failed.
      </h2>
      <Link
        href={`/order/pending?${urlParams.toString()}`}
        locale={locale}
        className="hover:underline"
      >
        Try Again
      </Link>
    </section>
  );
}
