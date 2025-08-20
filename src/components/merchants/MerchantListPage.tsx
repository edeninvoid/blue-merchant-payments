'use client';

import { useSetHeaderTitle } from '@/lib/hooks/useHeader';
import { Suspense, useState } from 'react';
import {
  MerchantList,
  MerchantSkeletonList,
} from '@/components/merchants/MerchantList';
import MerchantListSearchBar from '@/components/merchants/MerchantListSearchBar';
import { MerchantListRequestParams } from '@/types/merchant';
import { LocaleContext } from '@/lib/contexts/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';

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
        <Suspense fallback={<MerchantSkeletonList />}>
          <MerchantList params={params} />
        </Suspense>
      </section>
    </LocaleContext>
  );
}
