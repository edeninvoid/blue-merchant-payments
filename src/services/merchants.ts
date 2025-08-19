import { api } from '@/lib/axios';

const getMerchantList = async (): Promise<{ id: number; name: string }> => {
  return await api.get('/merchants', {
    params: {
      // query: '',
      // sort: '',
    },
  });
};

export { getMerchantList };
