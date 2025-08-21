import { http, HttpResponse } from 'msw';

export const ordersHandlers = [
  http.post('/api/orders', async ({ request }) => {
    const body = await request.json();
    console.log(body);

    return HttpResponse.json({
      orderId: 'p_10000001',
      status: 'PENDING',
    });
  }),
];
