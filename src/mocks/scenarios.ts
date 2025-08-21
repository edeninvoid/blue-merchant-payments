import { http, HttpResponse } from 'msw';

export const scenarios = {
  success: [
    http.post('/api/orders', async ({ request }) => {
      const body = await request.json();
      // console.log(body);

      return HttpResponse.json({
        orderId: 'p_10000001',
        status: 'PAID',
      });
    }),
  ],
  pending: [
    http.post('/api/orders', async ({ request }) => {
      const body = await request.json();
      // console.log(body);

      return HttpResponse.json({
        orderId: 'p_10000001',
        status: 'PENDING',
      });
    }),
  ],
  error: [
    http.post('/api/orders', async ({ request }) => {
      const body = await request.json();
      // console.log(body);

      return HttpResponse.json({
        orderId: 'p_10000001',
        status: 'DECLINED',
      });
    }),
  ],
};
