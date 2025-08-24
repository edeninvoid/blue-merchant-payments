'use client';

import Loading from '@/components/_ui/loading';
import { lazy, Suspense } from 'react';

const MerchantInfo = lazy(
  () => import('@/components/merchants/view/MerchantInfo'),
);
const MerchantInfoProducts = lazy(
  () => import('@/components/merchants/view/MerchantInfoProducts'),
);

interface Props {
  merchantId: string;
}

export default function MerchantInfoPage({ merchantId }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <MerchantInfo merchantId={merchantId} />
      <MerchantInfoProducts merchantId={merchantId} />
    </Suspense>
  );
}
