'use client';

import { useSetHeaderTitle } from '@/lib/hooks/useHeader';
import { Suspense, useState } from 'react';
import {
  MerchantList,
  MerchantSkeletonList,
} from '@/components/merchants/MerchantList';
import MerchantListSearchBar from '@/components/merchants/MerchantListSearchBar';
import { MerchantListRequestParams } from '@/types/merchant';

export default function MerchantListPage() {
  const [params, setParams] = useState<MerchantListRequestParams>();
  useSetHeaderTitle('Merchants');

  return (
    <section aria-label="Merchants Section" className="flex flex-col gap-3">
      <h2 className="sr-only">Merchants</h2>
      <MerchantListSearchBar onSearch={setParams} />
      <Suspense fallback={<MerchantSkeletonList />}>
        <MerchantList params={params} />
      </Suspense>
    </section>
  );
}
