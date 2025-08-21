'use client';

import { LocaleContext } from '@/lib/contexts/LocaleContext';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';
import Loading from '@/components/_ui/loading';
import { lazy, Suspense } from 'react';

const MerchantInfo = lazy(
  () => import('@/components/merchants/view/MerchantInfo'),
);
const MerchantInfoProducts = lazy(
  () => import('@/components/merchants/view/MerchantInfoProducts'),
);

interface Props {
  locale: string;
  merchantId: string;
}

export default function MerchantInfoPage({ locale, merchantId }: Props) {
  return (
    <LocaleContext value={locale as keyof typeof SUPPORTED_LANGUAGES}>
      <Suspense fallback={<Loading />}>
        <MerchantInfo merchantId={merchantId} />
        <MerchantInfoProducts merchantId={merchantId} />
      </Suspense>
    </LocaleContext>
  );
}
