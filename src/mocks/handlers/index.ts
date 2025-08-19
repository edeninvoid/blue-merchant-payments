import { authHandlers } from '@/mocks/handlers/auth';
import { merchantsHandlers } from '@/mocks/handlers/merchants';

export const handlers = [...authHandlers, ...merchantsHandlers];
