'use client';

import { useEffect } from 'react';
import { getMerchantList } from '@/services/merchants';

export default function MerchantListPage() {
  useEffect(() => {
    const fetchList = async () => {
      const data = await getMerchantList();
      console.log(data);
    };

    fetchList();
  }, []);

  return <>MerchantListPage</>;
}
