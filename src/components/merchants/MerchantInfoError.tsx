import Exclamation from '@/components/_icons/Exclamation';

export default function MerchantInfoError() {
  return (
    <section
      className="flex items-start gap-4 rounded-lg bg-gray-200 p-4"
      role="alert"
      aria-live="polite"
    >
      <Exclamation />
      <dl className="flex flex-col gap-2">
        <dt className="font-semibold">Network error</dt>
        <dd>Please try again later.</dd>
      </dl>
    </section>
  );
}
