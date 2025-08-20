import { http, HttpResponse } from 'msw';
import {
  MERCHANT_INFO,
  MERCHANT_LIST,
  MERCHANT_PRODUCT_LIST,
} from '@/mocks/data/merchants';
import {
  MerchantInfo,
  MerchantListItemInfo,
  MerchantProductItemInfo,
} from '@/types/merchant';

export const merchantsHandlers = [
  http.get('/api/merchants', async ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('query') ?? '';
    const sort = url.searchParams.get('sort') ?? 'name';

    const result: MerchantListItemInfo[] = MERCHANT_LIST.filter(merchant =>
      query ? merchant.name.toLowerCase().includes(query.toLowerCase()) : true,
    );

    switch (sort) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'category':
        result.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'distanceKm':
        result.sort((a, b) => a.distanceKm - b.distanceKm);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return HttpResponse.json(result);
  }),

  http.get('/api/merchants/:id', async () => {
    const result: MerchantInfo = MERCHANT_INFO;

    return HttpResponse.json(result);
  }),

  http.get('/api/merchants/:id/items', async () => {
    const result: MerchantProductItemInfo[] = MERCHANT_PRODUCT_LIST;

    return HttpResponse.json(result);
  }),
];
