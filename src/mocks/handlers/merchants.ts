import { http, HttpResponse } from 'msw';

export const merchantsHandlers = [
  http.get('/api/merchants', async ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('query') ?? '';
    const sort = url.searchParams.get('sort') ?? 'name';

    let merchantList = [
      {
        id: 1,
        name: 'Coffee House',
        category: 'Cafe',
        distanceKm: 4.45,
        rating: 4.0,
        logoUrl: '',
      },
      {
        id: 2,
        name: 'Tech Store',
        category: 'Electronics',
        distanceKm: 1100,
        rating: 4.0,
        logoUrl: '',
      },
      {
        id: 3,
        name: 'Supermarket',
        category: 'Groceries',
        distanceKm: 2300,
        rating: 4.0,
        logoUrl: '',
      },
      {
        id: 4,
        name: 'Tasty Restaurant',
        category: 'Restaurant',
        distanceKm: 600,
        rating: 4.0,
        logoUrl: '',
      },
      {
        id: 5,
        name: 'Book Shop',
        category: 'Books',
        distanceKm: 1900,
        rating: 4.0,
        logoUrl: '',
      },
    ];

    if (query) {
      merchantList = merchantList.filter(merchant =>
        merchant.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return HttpResponse.json(merchantList);
  }),
];
