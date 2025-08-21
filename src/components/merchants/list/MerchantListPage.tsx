'use client';

import { useSetHeaderTitle } from '@/lib/hooks/useHeader';
import { lazy, Suspense, useState } from 'react';
import MerchantListSearchBar from '@/components/merchants/list/MerchantListSearchBar';
import { MerchantListRequestParams } from '@/types/merchant';
import { LocaleContext } from '@/lib/contexts/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import MerchantListSkeleton from '@/components/merchants/list/MerchantListSkeleton';

const MerchantList = lazy(
  () => import('@/components/merchants/list/MerchantList'),
);

interface Props {
  locale: string;
}

export default function MerchantListPage({ locale }: Props) {
  const [params, setParams] = useState<MerchantListRequestParams>();
  useSetHeaderTitle('Merchants');

  return (
    <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
      <section aria-label="Merchants Section" className="flex flex-col gap-3">
        <h2 className="sr-only">Merchants</h2>
        <MerchantListSearchBar onSearch={setParams} />
        <Suspense fallback={<MerchantListSkeleton />}>
          <MerchantList params={params} />
        </Suspense>
      </section>
    </LocaleContext>
  );
}
