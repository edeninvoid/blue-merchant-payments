'use client';

import { useSetHeaderTitle } from '@/lib/hooks/useHeader';
import { lazy, Suspense, useState } from 'react';
import MerchantListSearchBar from '@/components/merchants/list/MerchantListSearchBar';
import { MerchantListRequestParams } from '@/types/merchant';
import MerchantListSkeleton from '@/components/merchants/list/MerchantListSkeleton';
import { useTranslations } from 'next-intl';

const MerchantList = lazy(
  () => import('@/components/merchants/list/MerchantList'),
);

export default function MerchantListPage() {
  const t = useTranslations('MerchantListPage');
  const [params, setParams] = useState<MerchantListRequestParams>();
  useSetHeaderTitle(t('title'));

  return (
    // <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
    <section aria-label="Merchants Section" className="flex flex-col gap-3">
      <h2 className="sr-only">{t('title')}</h2>
      <MerchantListSearchBar onSearch={setParams} />
      <Suspense fallback={<MerchantListSkeleton />}>
        <MerchantList params={params} />
      </Suspense>
    </section>
    // </LocaleContext>
  );
}
