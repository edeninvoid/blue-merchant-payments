import { authHandlers } from '@/mocks/handlers/auth';
import { merchantsHandlers } from '@/mocks/handlers/merchants';

export const handlers = [
  ...authHandlers,
  ...merchantsHandlers,
  // ...ordersHandlers, // scenarios.ts 를 통해 분기되어 주석 처리
];
