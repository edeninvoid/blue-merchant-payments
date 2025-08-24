import { useTranslations } from 'next-intl';

export default function MerchantListNoItem() {
  const t = useTranslations('MerchantListNoItem');
  return (
    <section
      className="flex items-center rounded-lg bg-gray-100 p-4"
      role="status"
      aria-live="polite"
    >
      <p>{t('text')}</p>
    </section>
  );
}
