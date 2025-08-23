import { http, HttpResponse } from 'msw';

export const scenarios = {
  success: [
    http.post('/api/orders', async () => {
      // { request } 에 따른 body 확인 및 분기 처리 데이터 but 필요한 데이터가 아니기에 주석처리
      // const body = await request.json();

      return HttpResponse.json({
        orderId: 'p_10000001',
        status: 'PAID',
      });
    }),
  ],
  pending: [
    http.post('/api/orders', async () => {
      // { request } 에 따른 body 확인 및 분기 처리 데이터 but 필요한 데이터가 아니기에 주석처리
      // const body = await request.json();

      return HttpResponse.json({
        orderId: 'p_10000001',
        status: 'PENDING',
      });
    }),
  ],
  error: [
    http.post('/api/orders', async () => {
      // { request } 에 따른 body 확인 및 분기 처리 데이터 but 필요한 데이터가 아니기에 주석처리
      // const body = await request.json();

      return HttpResponse.json({
        orderId: 'p_10000001',
        status: 'DECLINED',
      });
    }),
  ],
};
